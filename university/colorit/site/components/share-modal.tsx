"use client"

import { FacebookIcon } from "@/components/icon/facebook-icon"
import { InstagramIcon } from "@/components/icon/instagram-icon"
import { TelegramIcon } from "@/components/icon/telegram-icom"
import { VkIcon } from "@/components/icon/vk-icon"
import { WhatsappIcon } from "@/components/icon/whatsapp-icon"
import { XIcon } from "@/components/icon/x-icon"
import { Copy } from "lucide-react"

interface ShareModalProps {
  shareUrl: string
}

export const ShareModal = ({ shareUrl }: ShareModalProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
  }

  return (
    <div className="space-y-5 text-center">
      <h2 className="text-xl font-semibold">Поделиться</h2>
      <p className="text-sm text-muted-foreground">Скопируйте ссылку или выберите соцсеть</p>

      <div className="flex items-center justify-between bg-muted rounded-lg px-4 py-2">
        <span className="text-sm break-all text-left">{shareUrl}</span>
        <button
          onClick={copyToClipboard}
          className="ml-2 text-muted-foreground hover:text-primary transition"
        >
          <Copy className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4">
        <a href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
          <TelegramIcon className="w-6 h-6 text-blue-500" />
        </a>
        <a href={`https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
          <VkIcon className="w-6 h-6 text-sky-700" />
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
          <FacebookIcon className="w-6 h-6 text-blue-600" />
        </a>
        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
          <XIcon className="w-6 h-6 text-sky-400" />
        </a>
        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
          <WhatsappIcon className="w-6 h-6 text-green-500" />
        </a>
        <a href={`https://www.instagram.com/direct/new/?text=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
          <InstagramIcon className="w-6 h-6 text-pink-500" />
        </a>
      </div>
    </div>
  )
}
