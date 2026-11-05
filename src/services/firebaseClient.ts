import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  Auth
} from 'firebase/auth';
import { UserProfile } from '../types/index.ts';

export interface FirebaseCustomConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
  measurementId?: string;
}

const STORAGE_KEY = 'ytc_firebase_config';

export function getSavedFirebaseConfig(): FirebaseCustomConfig | null {
  // 1. Kiểm tra Vite Environment variables trước
  const envApiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const envProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

  if (envApiKey && envProjectId) {
    return {
      apiKey: envApiKey,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || `${envProjectId}.firebaseapp.com`,
      projectId: envProjectId,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || `${envProjectId}.appspot.com`,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
    };
  }

  // 2. Kiểm tra localStorage do người dùng dán vào
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading saved Firebase config:', e);
  }

  return null;
}

export function saveFirebaseConfig(config: FirebaseCustomConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function clearFirebaseConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// Khởi tạo Firebase App an toàn
let app: FirebaseApp | null = null;
let auth: Auth | null = null;

export function initFirebase(): { app: FirebaseApp | null; auth: Auth | null } {
  if (auth) return { app, auth };

  const config = getSavedFirebaseConfig();
  if (!config || !config.apiKey) {
    return { app: null, auth: null };
  }

  try {
    if (getApps().length === 0) {
      app = initializeApp(config);
    } else {
      app = getApp();
    }
    auth = getAuth(app);
    return { app, auth };
  } catch (err) {
    console.error('Lỗi khởi tạo Firebase:', err);
    return { app: null, auth: null };
  }
}

// Chuyển đổi Firebase User sang UserProfile của Yêu Trồng Cây
export function mapFirebaseUserToProfile(fbUser: FirebaseUser): UserProfile {
  return {
    id: fbUser.uid,
    name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Chủ Vườn Số',
    email: fbUser.email || '',
    avatar_url: fbUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    badge: 'Nhà Vườn Tiên Phong',
    karma_points: 100,
    joined_date: new Date().toLocaleDateString('vi-VN'),
  };
}

// Đăng nhập bằng Google Popup
export async function loginWithGoogle(): Promise<UserProfile> {
  const { auth: currentAuth } = initFirebase();
  if (!currentAuth) {
    throw new Error('Chưa cấu hình Firebase API Key. Vui lòng thêm config Firebase.');
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const result = await signInWithPopup(currentAuth, provider);
  return mapFirebaseUserToProfile(result.user);
}

// Đăng nhập Email & Mật khẩu
export async function loginWithEmail(email: string, pass: string): Promise<UserProfile> {
  const { auth: currentAuth } = initFirebase();
  if (!currentAuth) {
    throw new Error('Chưa cấu hình Firebase API Key.');
  }

  const result = await signInWithEmailAndPassword(currentAuth, email, pass);
  return mapFirebaseUserToProfile(result.user);
}

// Đăng ký Email & Mật khẩu mới
export async function registerWithEmail(email: string, pass: string): Promise<UserProfile> {
  const { auth: currentAuth } = initFirebase();
  if (!currentAuth) {
    throw new Error('Chưa cấu hình Firebase API Key.');
  }

  const result = await createUserWithEmailAndPassword(currentAuth, email, pass);
  return mapFirebaseUserToProfile(result.user);
}

// Đăng xuất
export async function logoutFirebase(): Promise<void> {
  const { auth: currentAuth } = initFirebase();
  if (currentAuth) {
    await signOut(currentAuth);
  }
}

// Lắng nghe trạng thái đăng nhập
export function subscribeToAuthState(callback: (user: UserProfile | null) => void): () => void {
  const { auth: currentAuth } = initFirebase();
  if (!currentAuth) {
    return () => {};
  }

  return onAuthStateChanged(currentAuth, (fbUser) => {
    if (fbUser) {
      callback(mapFirebaseUserToProfile(fbUser));
    } else {
      callback(null);
    }
  });
}
