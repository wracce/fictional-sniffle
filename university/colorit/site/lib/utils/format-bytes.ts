'use client';

export function formatBytes(bytes: number, decimals = 1): string {
    if (!bytes || bytes === 0) return '0 байт'
  
    const k = 1024
    const sizes = ['байт', 'КБ', 'МБ', 'ГБ', 'ТБ']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    const value = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))
  
    return `${value} ${sizes[i]}`
  }
  