import { createBrowserRouter } from 'react-router-dom'
import { Dashboard } from '@/pages/dashboard'

export const Routes = createBrowserRouter([
  {
    path: '*',
    element: <Dashboard />
  }
])
