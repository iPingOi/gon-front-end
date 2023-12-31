import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { AuthContextProvider } from './hooks/useAuth'
import { Routes } from './routes'

import '@/global/globals.css'

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={Routes} />
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
