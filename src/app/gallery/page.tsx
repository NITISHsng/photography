'use client'
import { AppProvider } from "@/contexts/AppContext";


import Gallery from '@/mainComponents/GalleryPage'

export default function Hiring() {
  return (
  <AppProvider>
    
    <Gallery />
  </AppProvider>

  )
}