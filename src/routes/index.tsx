import { createBrowserRouter } from 'react-router-dom'

import { SignIn } from '@/pages/authentication/signin'
import { SignUp } from '@/pages/authentication/signup'

export const Routes = createBrowserRouter([
  {
    path: 'auth/signin',
    element: <SignIn />
  },
  {
    path: 'auth/signup',
    element: <SignUp />
  }
])
