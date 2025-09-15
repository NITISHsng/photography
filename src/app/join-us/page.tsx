'use client'


import JoinUsPage from '@/mainComponents/JoinUsPage'
import { AppProvider } from "@/contexts/AppContext";

export default function JoinUs() {
  return (
      <AppProvider>

        <JoinUsPage />
      </AppProvider>

  )
}