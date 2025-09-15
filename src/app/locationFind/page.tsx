'use client'
import { AppProvider } from "@/contexts/AppContext";

import PincodeLookup from '@/mainComponents/PinToLocation'
export default function JoinUs() {
  return (
      <AppProvider>

        <PincodeLookup />
      </AppProvider>
  )
}