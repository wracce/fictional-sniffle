'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Palette, User, Menu } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/auth-store';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { accessToken } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 h-16">
        <div className="w-full px-4">
          <div className="max-w-7xl mx-auto h-full" />
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="w-full px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-12 h-16 items-center gap-2">
          {/* Логотип */}
          <div className="col-span-6 sm:col-span-4 md:col-span-3 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Palette className="h-6 w-6" />
              <span className="font-bold">Colorize</span>
            </Link>
          </div>

          {/* Меню десктоп */}
          <div className="hidden md:col-span-6 md:flex md:justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                {accessToken && (
                  <NavigationMenuItem>
                    <Link href="/colorize" legacyBehavior passHref>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        Раскрасить
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )}
                <NavigationMenuItem>
                  <Link href="/gallery" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      Галерея
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Правый блок */}
          <div className="col-span-6 sm:col-span-8 md:col-span-3 flex justify-end items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Переключить тему</span>
            </Button>

            {accessToken ? (
              <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Профиль</span>
                </Button>
              </Link>
            ) : (
              pathname !== '/login' && (
                <Link href="/login">
                  <Button>Войти</Button>
                </Link>
              )
            )}

            {/* Бургер для мобилки */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Меню</span>
            </Button>
          </div>
        </div>

        {/* Мобильное меню */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-1 px-2 pb-4">
            {accessToken && (
              <Link href="/colorize" className="block px-4 py-2 rounded-md hover:bg-accent">
                Раскрасить
              </Link>
            )}
            <Link href="/gallery" className="block px-4 py-2 rounded-md hover:bg-accent">
              Галерея
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
