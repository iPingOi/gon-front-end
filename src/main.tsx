import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { Routes } from './routes'

import '@/global/globals.css'

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={Routes} />
    </ThemeProvider>
  </React.StrictMode>
)
