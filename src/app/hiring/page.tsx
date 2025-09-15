'use client'

import HiringPage from '@/mainComponents/HiringPage'
import { AppProvider } from "@/contexts/AppContext";

export default function Hiring() {
  return (
      <AppProvider>

        <HiringPage />
      </AppProvider>
  )
}
