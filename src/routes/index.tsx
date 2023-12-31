import { createBrowserRouter } from 'react-router-dom'
import { Dashboard } from '@/pages/dashboard'
import { SignIn } from '@/pages/signin'
import ProtectedRoute from '@/components/protected'

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>
  }
])
