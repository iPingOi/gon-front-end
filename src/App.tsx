import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from './components/mode-toggle'
import { RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './hooks/useAuth'
import { Routes } from './routes'

function App (): JSX.Element {
  return (
    <AuthContextProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={Routes} />
        <ModeToggle />
      </ThemeProvider>
    </AuthContextProvider>
  )
}

export default App
