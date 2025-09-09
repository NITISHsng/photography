'use client'

import React from 'react'
import { useAppContext } from '@/contexts/AppContext'
import { Moon, Sun, Monitor } from 'lucide-react'

interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
  theme?: 'light' | 'dark' | 'system'
  setTheme?: (theme: 'light' | 'dark' | 'system') => void
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '',
  showLabel = false,
  theme: propTheme,
  setTheme: propSetTheme
}) => {
  // Try to use props first, then fall back to context
  let theme: 'light' | 'dark' | 'system' = 'system';
  let setTheme: (theme: 'light' | 'dark' | 'system') => void = () => {};
  
  try {
    const context = useAppContext();
    theme = propTheme || context.theme;
    setTheme = propSetTheme || context.setTheme;
  } catch (error) {
    // If context is not available, use props or defaults
    theme = propTheme || 'system';
    setTheme = propSetTheme || (() => {});
  }

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showLabel && (
        <span className="text-sm font-medium mr-2 text-gray-700 dark:text-gray-300">
          Theme:
        </span>
      )}
      <div className="relative inline-flex gap-2 p-1 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-inner">
        <button
          onClick={() => handleThemeChange('light')}
          className={`p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${theme === 'light' ? 'bg-white text-yellow-500 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          aria-label="Light mode"
          aria-pressed={theme === 'light'}
        >
          <Sun className="h-4 w-4" />
        </button>
        <button
          onClick={() => handleThemeChange('dark')}
          className={`p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${theme === 'dark' ? 'bg-gray-700 text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          aria-label="Dark mode"
          aria-pressed={theme === 'dark'}
        >
          <Moon className="h-4 w-4" />
        </button>
        <button
          onClick={() => handleThemeChange('system')}
          className={`p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${theme === 'system' ? 'bg-white dark:bg-gray-700 text-purple-500 dark:text-purple-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          aria-label="System preference"
          aria-pressed={theme === 'system'}
        >
          <Monitor className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default ThemeToggle