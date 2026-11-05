/**
 * DỊCH VỤ THÔNG BÁO NHẮC LỊCH CHĂM SÓC CÂY TRỒNG (PLANT CARE NOTIFICATION SERVICE)
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 * 
 * Hỗ trợ Web Notifications API chuẩn W3C:
 * - Xin cấp quyền hiển thị thông báo trình duyệt
 * - Nhắc nhở danh sách cây cần tưới nước / bón phân hôm nay
 * - Tự động đồng bộ cấu hình vào localStorage
 */

import { GardenPlant } from '../types/index.ts';

const STORAGE_REMINDER_KEY = 'ytc_care_reminders_enabled';
const STORAGE_LAST_NOTIFIED_KEY = 'ytc_last_care_notified_date';

/**
 * Kiểm tra xem trình duyệt có hỗ trợ Notification API không
 */
export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

/**
 * Lấy trạng thái cấp quyền hiện tại
 */
export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!isNotificationSupported()) return 'unsupported';
  return Notification.permission;
}

/**
 * Xin quyền thông báo từ người dùng
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNotificationSupported()) return false;

  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (err) {
    console.warn('Error requesting notification permission:', err);
    return false;
  }
}

/**
 * Kiểm tra xem người dùng đã bật công tắc nhắc nhở chưa
 */
export function isCareReminderEnabled(): boolean {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return false;
  }
  return localStorage.getItem(STORAGE_REMINDER_KEY) === 'true';
}

/**
 * Lưu trạng thái bật/tắt nhắc nhở
 */
export function setCareReminderEnabled(enabled: boolean): void {
  localStorage.setItem(STORAGE_REMINDER_KEY, enabled ? 'true' : 'false');
}

/**
 * Gửi một thông báo tức thì lên màn hình
 */
export function sendBotanicalNotification(
  title: string,
  options?: {
    body?: string;
    icon?: string;
    tag?: string;
    onClickUrl?: string;
  }
): boolean {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return false;
  }

  try {
    const notif = new Notification(title, {
      body: options?.body || '',
      icon: options?.icon || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=192&q=80',
      tag: options?.tag || 'ytc-care-reminder',
    });

    notif.onclick = () => {
      window.focus();
      if (options?.onClickUrl) {
        window.location.href = options.onClickUrl;
      }
      notif.close();
    };

    return true;
  } catch (err) {
    console.warn('Failed to dispatch notification:', err);
    return false;
  }
}

/**
 * Quét danh sách cây trong vườn và gửi thông báo nhắc lịch nếu có cây khát nước
 */
export function checkAndNotifyCareTasks(
  plants: GardenPlant[],
  isEn: boolean = false
): void {
  if (!isCareReminderEnabled()) return;

  const todayStr = new Date().toISOString().split('T')[0];
  const lastNotified = localStorage.getItem(STORAGE_LAST_NOTIFIED_KEY);

  // Mỗi ngày chỉ gửi 1 thông báo tổng hợp để tránh làm phiền người dùng
  if (lastNotified === todayStr) {
    return;
  }

  const thirstyPlants: GardenPlant[] = [];
  const now = new Date().getTime();

  for (const plant of plants) {
    const lastWater = plant.last_watered_at || plant.planted_date;
    const interval = plant.watering_interval_days || 1;
    const daysSince = Math.floor((now - new Date(lastWater).getTime()) / (1000 * 60 * 60 * 24));

    if (daysSince >= interval) {
      thirstyPlants.push(plant);
    }
  }

  if (thirstyPlants.length > 0) {
    const count = thirstyPlants.length;
    const plantNames = thirstyPlants.slice(0, 2).map((p) => p.custom_name).join(', ');
    const moreSuffix = count > 2 ? ` và ${count - 2} chậu khác` : '';
    const moreSuffixEn = count > 2 ? ` and ${count - 2} other plants` : '';

    const title = isEn
      ? `🌱 Yêu Trồng Cây: ${count} plants need water today!`
      : `🌱 Yêu Trồng Cây: Hôm nay có ${count} chậu cây cần tưới nước!`;

    const body = isEn
      ? `Give some love to ${plantNames}${moreSuffixEn}. Tap to open your digital garden.`
      : `Đến lịch cấp ẩm cho ${plantNames}${moreSuffix}. Bấm vào đây để mở vườn số và xác nhận tưới cây nhé.`;

    const sent = sendBotanicalNotification(title, {
      body,
      tag: 'daily-water-reminder',
      onClickUrl: '/vuon-cua-toi',
    });

    if (sent) {
      localStorage.setItem(STORAGE_LAST_NOTIFIED_KEY, todayStr);
    }
  }
}
