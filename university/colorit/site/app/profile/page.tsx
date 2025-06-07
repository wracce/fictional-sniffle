'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Camera,
  Settings,
  Image as ImageIcon,
  Star,
  Calendar,
  Clock,
  Phone,
  Globe,
  Briefcase,
  AtSign,
  LogOut,
} from 'lucide-react'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/lib/store/auth-store'
import { useUIStore } from '@/lib/store/ui-store'
import { useRouter } from 'next/navigation'
import { useGalleryStore } from '@/lib/store/gallery-store'

export default function ProfilePage() {
  const router = useRouter()
  const { user, accessToken, fetchProfile, updateProfile, logout, changeAvatar } = useAuthStore()
  const { stats, fetchMyStats } = useGalleryStore()
  const { showLoader, hideLoader } = useUIStore()

  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState(user)

  useEffect(() => {
    if (!accessToken) {
      router.push('/login')
    } else {
      showLoader()
      fetchProfile()
      fetchMyStats()
      hideLoader()
    }
  }, [accessToken])

  useEffect(() => {
    setUserData(user)
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (userData) {
      showLoader()
      await updateProfile(userData)
      hideLoader()
      setIsEditing(false)
    }
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      showLoader()
      await changeAvatar(file)
    } catch (err) {
      console.error('Ошибка загрузки аватара:', err)
    } finally {
      hideLoader()
    }
  }

  const formattedDate = stats?.memberSince
    ? new Date(stats.memberSince).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
    : '—'

  const statsList = [
    { label: 'Фото раскрашено', value: stats?.totalColorized ?? '—', icon: ImageIcon },
    { label: 'Среднее время', value: stats?.averageProcessingTime != null ? stats.averageProcessingTime.toFixed(1) + 'с' : '—', icon: Clock },
  ]

  if (!userData) return null

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div className="flex justify-end mb-4">
        <Button variant="destructive" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Выйти
        </Button>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Профиль</CardTitle>
            <CardDescription>Управляйте своей персональной информацией</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-12 gap-6">
              {/* Левая колонка */}
              <div className="col-span-12 md:col-span-4 flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={userData.avatarUrl || ''} alt={userData.fullName} />
                    <AvatarFallback>{userData?.fullName?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                  <label htmlFor="avatar" className="absolute bottom-0 right-0">
                    <input
                      type="file"
                      id="avatar"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <div className="bg-background border border-border text-foreground rounded-full p-2 cursor-pointer hover:scale-105 transition shadow">
                      <Camera className="h-4 w-4" />
                    </div>
                  </label>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">{userData.location}</p>
                  <p className="text-sm font-medium">{userData.jobTitle}</p>
                  <p className="text-sm text-muted-foreground">{userData.company}</p>
                </div>
              </div>

              {/* Правая колонка */}
              <div className="col-span-12 md:col-span-8">
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField label="Имя" value={userData.fullName} onChange={(val) => setUserData({ ...userData, fullName: val })} />
                    <InputField label="Email" value={userData.email} type="email" onChange={(val) => setUserData({ ...userData, email: val })} />
                    <InputField label="Телефон" value={userData.phone} type="tel" onChange={(val) => setUserData({ ...userData, phone: val })} />
                    <InputField label="Сайт" value={userData.website} type="url" onChange={(val) => setUserData({ ...userData, website: val })} />
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12 md:col-span-6">
                        <InputField label="Компания" value={userData.company} onChange={(val) => setUserData({ ...userData, company: val })} />
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        <InputField label="Должность" value={userData.jobTitle} onChange={(val) => setUserData({ ...userData, jobTitle: val })} />
                      </div>
                    </div>
                    <InputField label="Город" value={userData.location} onChange={(val) => setUserData({ ...userData, location: val })} />
                    <div className="space-y-2">
                      <Label>О себе</Label>
                      <Textarea
                        value={userData.bio}
                        onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit">Сохранить</Button>
                      <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                        Отмена
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <DisplayField label="Имя" value={userData.fullName} />
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-12 md:col-span-6">
                        <DisplayIconField label="Email" icon={AtSign} value={userData.email} />
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        <DisplayIconField label="Телефон" icon={Phone} value={userData.phone} />
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        <DisplayIconField label="Сайт" icon={Globe} value={userData.website} />
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        <DisplayIconField label="Работа" icon={Briefcase} value={`${userData.jobTitle || ''} ${userData.company || ''}`} />
                      </div>
                    </div>
                    <DisplayField label="О себе" value={userData.bio} />
                    <Button onClick={() => setIsEditing(true)} variant="outline">
                      <Settings className="mr-2 h-4 w-4" />
                      Редактировать
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Статистика */}
        <div className="grid grid-cols-12 gap-4">
          {statsList.map((stat) => (
            <Card key={stat.label} className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// Вспомогательные компоненты
const InputField = ({ label, value, onChange, type = 'text' }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Input value={value || ''} onChange={(e) => onChange(e.target.value)} type={type} />
  </div>
)

const DisplayField = ({ label, value }) => (
  <div>
    <Label className="text-muted-foreground">{label}</Label>
    <p className="text-base">{value}</p>
  </div>
)

const DisplayIconField = ({ label, value, icon: Icon }) => (
  <div>
    <Label className="text-muted-foreground">{label}</Label>
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <p className="text-sm">{value}</p>
    </div>
  </div>
)
