import { create } from 'zustand';
import api from '@/lib/api';
import { useImageStore } from './image-store';

interface User {
  email: string;
  fullName?: string;
  phone?: string;
  website?: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  avatarUrl?: string;
  bio?: string;
  social?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changeAvatar: (file: File) => Promise<void>;
}

function sanitizeUserData(data: any) {
  const { _id, email, __v, ...cleaned } = data;
  return cleaned;
}

const initialToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
const tokenCreatedAt = typeof window !== 'undefined' ? Number(localStorage.getItem('accessTokenCreatedAt')) : null;

export const useAuthStore = create<AuthState>((set, get) => {
  // Проверяем валидность токена по времени
  const now = Date.now();
  const halfDayMs = 12 * 60 * 60 * 1000; // 12 часов в миллисекундах

  if (initialToken && tokenCreatedAt && now - tokenCreatedAt < halfDayMs) {
    api.defaults.headers.common['Authorization'] = `Bearer ${initialToken}`;
    set({ accessToken: initialToken });
    // Профиль всё равно надо будет фетчить в useEffect
  } else {
    // если токен старый - чистим
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenCreatedAt');
  }

  return {
    accessToken: null,
    user: null,
    loading: false,
    error: null,

    login: async (email, password) => {
      set({ loading: true, error: null });
      try {
        const res = await api.post('/auth/login', { email, password });
        const token = res.data.access_token;
        const now = Date.now();
        localStorage.setItem('accessToken', token);
        localStorage.setItem('accessTokenCreatedAt', now.toString());
        set({ accessToken: token });
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await get().fetchProfile();
      } catch (err: any) {
        set({ error: err.response?.data?.message || 'Ошибка входа' });
      } finally {
        set({ loading: false });
      }
    },

    register: async (email, password) => {
      set({ loading: true, error: null });
      try {
        const res = await api.post('/auth/register', { email, password });
        const token = res.data.access_token;
        const now = Date.now();
        localStorage.setItem('accessToken', token);
        localStorage.setItem('accessTokenCreatedAt', now.toString());
        set({ accessToken: token });
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await get().fetchProfile();
      } catch (err: any) {
        set({ error: err.response?.data?.message || 'Ошибка регистрации' });
      } finally {
        set({ loading: false });
      }
    },

    fetchProfile: async () => {
      try {
        const res = await api.get('/users/me');
        set({ user: res.data });
      } catch (err: any) {
        set({ error: 'Не удалось загрузить профиль' });
      }
    },

    updateProfile: async (data) => {
      try {
        const res = await api.patch('/users/me', sanitizeUserData(data));
        set({ user: res.data });
      } catch (err: any) {
        set({ error: 'Ошибка обновления профиля' });
      }
    },

    logout: () => {
      set({ accessToken: null, user: null });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('accessTokenCreatedAt');
      delete api.defaults.headers.common['Authorization'];
    },

    changeAvatar: async (file) => {
      const { uploadImage } = useImageStore.getState();
      const avatarUrl = await uploadImage(file);
      await get().updateProfile({ avatarUrl });

      const currentUser = get().user;
      if (currentUser) {
        set({ user: { ...currentUser, avatarUrl } });
      }
    },
  };
});
