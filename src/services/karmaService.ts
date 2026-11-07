/**
 * Dịch Vụ Quản Lý & Tích Điểm Karma Uy Tín Nhà Vườn (Web3 Testnet Learn-to-Earn)
 * Tích hợp thưởng điểm khi người dùng thực hiện giao dịch thử nghiệm 0đ trên Testnet.
 */

export interface KarmaBadge {
  title: string;
  tier: number;
  icon: string;
  color: string;
}

export interface KarmaEvent {
  id: string;
  timestamp: string;
  points: number;
  reason_vi: string;
  reason_en: string;
  is_testnet: boolean;
  tx_hash?: string;
}

export interface KarmaState {
  total_karma: number;
  badge: KarmaBadge;
  events: KarmaEvent[];
}

export function calculateKarmaBadge(points: number, isEn = false): KarmaBadge {
  if (points >= 300) {
    return {
      title: isEn ? 'Master Forest Heart' : 'Trái Tim Đại Ngàn',
      tier: 4,
      icon: '❤️',
      color: 'rose'
    };
  }
  if (points >= 150) {
    return {
      title: isEn ? 'Green Heart Guardian' : 'Trái Tim Xanh Bản Địa',
      tier: 3,
      icon: '💚',
      color: 'emerald'
    };
  }
  if (points >= 50) {
    return {
      title: isEn ? 'Caring Garden Heart' : 'Trái Tim Yêu Vườn',
      tier: 2,
      icon: '🌿',
      color: 'teal'
    };
  }
  return {
    title: isEn ? 'Seed of Love' : 'Mầm Non Yêu Cây',
    tier: 1,
    icon: '🌱',
    color: 'gray'
  };
}

export type HeartBadge = KarmaBadge;
export type HeartEvent = KarmaEvent;
export type HeartState = KarmaState;
export const getHeartState = getKarmaState;
export const awardHeartPoints = awardKarmaPoints;

const STORAGE_KEY_KARMA = 'ytc_user_karma';
const STORAGE_KEY_EVENTS = 'ytc_karma_events';

export function getKarmaState(isEn = false): KarmaState {
  let total = 50; // Điểm khởi đầu mặc định
  let events: KarmaEvent[] = [];

  try {
    const savedTotal = localStorage.getItem(STORAGE_KEY_KARMA);
    if (savedTotal !== null) {
      const parsed = parseInt(savedTotal, 10);
      if (!isNaN(parsed)) total = parsed;
    } else {
      // Kiểm tra trong hồ sơ người dùng nếu có
      const rawUser = localStorage.getItem('ytc_user');
      if (rawUser) {
        const u = JSON.parse(rawUser);
        if (typeof u.karma_points === 'number') total = u.karma_points;
      }
    }

    const savedEvents = localStorage.getItem(STORAGE_KEY_EVENTS);
    if (savedEvents) {
      events = JSON.parse(savedEvents);
    }
  } catch (err) {
    console.warn('Error reading karma state:', err);
  }

  return {
    total_karma: total,
    badge: calculateKarmaBadge(total, isEn),
    events
  };
}

/**
 * Cộng điểm thưởng Karma và phát sự kiện đồng bộ toàn trang
 */
export function awardKarmaPoints(
  points: number,
  reasonVi: string,
  reasonEn: string,
  meta?: { isTestnet?: boolean; txHash?: string; isEn?: boolean }
): KarmaState {
  const currentState = getKarmaState(meta?.isEn);
  const newTotal = currentState.total_karma + points;

  const newEvent: KarmaEvent = {
    id: 'krm_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    timestamp: new Date().toISOString(),
    points,
    reason_vi: reasonVi,
    reason_en: reasonEn,
    is_testnet: meta?.isTestnet ?? true,
    tx_hash: meta?.txHash
  };

  const updatedEvents = [newEvent, ...currentState.events].slice(0, 50);

  try {
    localStorage.setItem(STORAGE_KEY_KARMA, newTotal.toString());
    localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(updatedEvents));

    // Cập nhật profile nếu có
    const rawUser = localStorage.getItem('ytc_user');
    if (rawUser) {
      const u = JSON.parse(rawUser);
      u.karma_points = newTotal;
      localStorage.setItem('ytc_user', JSON.stringify(u));
    }
  } catch (err) {
    console.warn('Error saving karma state:', err);
  }

  const newState: KarmaState = {
    total_karma: newTotal,
    badge: calculateKarmaBadge(newTotal, meta?.isEn),
    events: updatedEvents
  };

  // Phát tín hiệu toàn ứng dụng
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('ytc_karma_awarded', {
        detail: {
          points,
          reasonVi,
          reasonEn,
          newTotal,
          badge: newState.badge,
          isTestnet: meta?.isTestnet ?? true
        }
      })
    );
  }

  return newState;
}
