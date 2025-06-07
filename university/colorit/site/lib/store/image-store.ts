import { create } from 'zustand';
import api from '@/lib/api';
import axios from 'axios';

interface ImageState {
  uploadImage: (file: File) => Promise<string>; // возвращает image URL
  getImageUrl: (id: string) => string;
}

export const useImageStore = create<ImageState>(() => ({
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post('/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const imageId = res.data.id;
    return `/images/${imageId}`;
  },

  getImageUrl: (id) => `/images/${id}`,
}));
