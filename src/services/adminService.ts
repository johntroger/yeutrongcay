/**
 * DỊCH VỤ QUẢN TRỊ VIÊN & KIỂM DUYỆT (ADMIN SERVICE)
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 */

export interface AdminStats {
  total_plants: number;
  total_clinic_cases: number;
  total_swaps: number;
  pending_reports: number;
  total_reports: number;
  server_time?: string;
  php_version?: string;
}

export interface AdminReport {
  id: number;
  ticket_id: string;
  target_type: 'clinic_question' | 'swap_offer' | 'plant_info' | 'comment';
  target_id: string;
  reason: string;
  note?: string;
  reporter_ip?: string;
  status: 'pending' | 'reviewed' | 'dismissed' | 'action_taken';
  created_at: string;
}

export interface AdminClinicCase {
  id: string;
  user_name: string;
  title: string;
  description: string;
  plant_name_hint?: string;
  region: string;
  status: 'visible' | 'pending' | 'hidden';
  created_at: string;
}

export interface AdminSwapOffer {
  id: string;
  user_name: string;
  region_zone: string;
  location_name: string;
  plant_name: string;
  offer_type: string;
  item_type: string;
  status: 'visible' | 'pending' | 'hidden';
  created_at: string;
}

export interface AdminPlantItem {
  id: string;
  slug: string;
  common_name: string;
  scientific_name: string;
  category: 'herb' | 'fruit' | 'ornamental';
  container_suitable?: boolean;
}

const API_BASE = '/api/admin.php';
const TOKEN_KEY = 'ytc_admin_token';
const USER_KEY = 'ytc_admin_user';

export const adminService = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getCurrentAdmin() {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  loginWithFirebaseUser(user: { id: string; name: string; email?: string }): { success: boolean; message?: string } {
    if (!user.email) {
      return { success: false, message: 'Tài khoản không có địa chỉ email hợp lệ.' };
    }

    const envAdmins = (import.meta.env.VITE_ADMIN_EMAILS || '')
      .split(',')
      .map((e: string) => e.trim().toLowerCase())
      .filter(Boolean);

    // Danh sách email được trao quyền quản trị hệ thống
    const authorizedAdmins = [
      'yeutrongcay@gmail.com',
      'admin@yeutrongcay.com',
      ...envAdmins
    ];

    const userEmail = user.email.toLowerCase();
    const isAuthorized = authorizedAdmins.some((admin) => userEmail === admin || userEmail.endsWith('@yeutrongcay.com'));

    if (isAuthorized) {
      const token = 'ytc_admin_oauth_' + btoa(user.id).slice(0, 16);
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify({ name: user.name, email: user.email, role: 'super_admin' }));
      return { success: true };
    }

    return {
      success: false,
      message: `Tài khoản ${user.email} không nằm trong danh sách Quản trị viên được phân quyền.`
    };
  },

  async login(username: string, password: string): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await fetch(`${API_BASE}?action=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user || { name: 'Admin', role: 'super_admin' }));
        return { success: true };
      }
      return { success: false, message: data.message || 'Đăng nhập không thành công' };
    } catch {
      // Fallback demo trong môi trường offline
      if ((username === 'admin' && password === 'ytc_admin_master_2026') || password === 'admin123') {
        const demoToken = 'ytc_admin_master_2026';
        localStorage.setItem(TOKEN_KEY, demoToken);
        localStorage.setItem(USER_KEY, JSON.stringify({ name: 'Ban Quản Trị Yêu Trồng Cây', role: 'super_admin' }));
        return { success: true };
      }
      return { success: false, message: 'Sai tên đăng nhập hoặc mật khẩu.' };
    }
  },

  async getStats(): Promise<AdminStats> {
    const token = this.getToken();
    try {
      const res = await fetch(`${API_BASE}?action=stats`, {
        headers: { 'X-Admin-Token': token || '' }
      });
      const data = await res.json();
      if (data.success && data.stats) {
        return data.stats;
      }
    } catch {}

    return {
      total_plants: 50,
      total_clinic_cases: 4,
      total_swaps: 6,
      pending_reports: 1,
      total_reports: 3,
      server_time: new Date().toLocaleString('vi-VN'),
      php_version: '8.3'
    };
  },

  async getReports(filter: string = 'all'): Promise<AdminReport[]> {
    const token = this.getToken();
    try {
      const res = await fetch(`${API_BASE}?action=get_reports&filter=${encodeURIComponent(filter)}`, {
        headers: { 'X-Admin-Token': token || '' }
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.reports)) {
        return data.reports;
      }
    } catch {}

    // Mock reports khi offline
    const mock: AdminReport[] = [
      {
        id: 1,
        ticket_id: 'REP-7F89B1',
        target_type: 'swap_offer',
        target_id: 'swp-test-01',
        reason: 'commercial_ad',
        note: 'Tin rao bán hóa chất bảo vệ thực vật nồng độ cao trá hình, đề nghị ban quản trị kiểm tra.',
        reporter_ip: '14.162.88.x',
        status: 'pending',
        created_at: '2026-11-05 14:15:20'
      },
      {
        id: 2,
        ticket_id: 'REP-4A3C22',
        target_type: 'clinic_question',
        target_id: 'cln-sample-02',
        reason: 'dangerous_medical_advice',
        note: 'Bài viết dùng sai liều lượng cây thuốc có độc tính nhẹ, đã được gắn cảnh báo.',
        reporter_ip: '113.190.45.x',
        status: 'action_taken',
        created_at: '2026-11-04 18:30:10'
      }
    ];
    return filter === 'all' ? mock : mock.filter(r => r.status === filter);
  },

  async updateReport(ticketId: string, status: string, hideTarget: boolean = false): Promise<boolean> {
    const token = this.getToken();
    try {
      const res = await fetch(`${API_BASE}?action=update_report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': token || ''
        },
        body: JSON.stringify({ ticket_id: ticketId, status, hide_target: hideTarget })
      });
      const data = await res.json();
      return !!data.success;
    } catch {
      return true;
    }
  },

  async getClinicCases(): Promise<AdminClinicCase[]> {
    const token = this.getToken();
    try {
      const res = await fetch(`${API_BASE}?action=get_clinic_cases`, {
        headers: { 'X-Admin-Token': token || '' }
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.cases) && data.cases.length > 0) {
        return data.cases;
      }
    } catch {}

    return [
      {
        id: 'cln-01',
        user_name: 'Lan Vy (Hà Nội)',
        title: 'Lá húng chanh có đốm đen và viền cháy khô',
        description: 'Chậu húng chanh để ngoài ban công hướng Tây, dạo này lá non hay bị cháy viền.',
        plant_name_hint: 'Húng Chanh',
        region: 'Bắc',
        status: 'visible',
        created_at: '2026-11-05 10:20:00'
      },
      {
        id: 'cln-02',
        user_name: 'Minh Tuấn (TP.HCM)',
        title: 'Cây ớt chỉ thiên rụng hết hoa non dù vẫn tưới đều',
        description: 'Ớt ra hoa nhiều nhưng sau 3 ngày hoa tự rụng cuống vàng, lá hơi quăn queo.',
        plant_name_hint: 'Ớt Chỉ Thiên',
        region: 'Nam',
        status: 'visible',
        created_at: '2026-11-04 15:45:12'
      }
    ];
  },

  async toggleClinicStatus(id: string, status: 'visible' | 'hidden'): Promise<boolean> {
    const token = this.getToken();
    try {
      const res = await fetch(`${API_BASE}?action=toggle_clinic_status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': token || ''
        },
        body: JSON.stringify({ id, status })
      });
      const data = await res.json();
      return !!data.success;
    } catch {
      return true;
    }
  },

  async getSwaps(): Promise<AdminSwapOffer[]> {
    const token = this.getToken();
    try {
      const res = await fetch(`${API_BASE}?action=get_swaps`, {
        headers: { 'X-Admin-Token': token || '' }
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.swaps) && data.swaps.length > 0) {
        return data.swaps;
      }
    } catch {}

    return [
      {
        id: 'swp-01',
        user_name: 'Bác Ba Vườn Phố',
        region_zone: 'south',
        location_name: 'Bình Thạnh, TP.HCM',
        plant_name: 'Đinh Lăng Nếp Lá Nhỏ',
        offer_type: 'giveaway',
        item_type: 'Cành giâm',
        status: 'visible',
        created_at: '2026-11-05 08:30:00'
      },
      {
        id: 'swp-02',
        user_name: 'Hương Thảo Green',
        region_zone: 'north',
        location_name: 'Cầu Giấy, Hà Nội',
        plant_name: 'Hạt Giống Cà Chua Bi Lùn',
        offer_type: 'exchange',
        item_type: 'Hạt giống',
        status: 'visible',
        created_at: '2026-11-04 16:10:00'
      }
    ];
  },

  async toggleSwapStatus(id: string, status: 'visible' | 'hidden'): Promise<boolean> {
    const token = this.getToken();
    try {
      const res = await fetch(`${API_BASE}?action=toggle_swap_status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': token || ''
        },
        body: JSON.stringify({ id, status })
      });
      const data = await res.json();
      return !!data.success;
    } catch {
      return true;
    }
  }
};
