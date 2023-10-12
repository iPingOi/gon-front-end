import { createBrowserRouter } from 'react-router-dom'

import { SignIn } from '@/pages/authentication/signin'
import { SignUp } from '@/pages/authentication/signup'
import { Dashboard } from '@/pages/dashboard'

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: 'signup',
    element: <SignUp />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  }
])
