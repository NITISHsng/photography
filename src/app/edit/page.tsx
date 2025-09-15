import React from 'react'
import { AppProvider } from "@/contexts/AppContext";

const  page = () => {
  return (
      <AppProvider>

        <div>Edit page</div>
      </AppProvider>
  )
}

export default  page