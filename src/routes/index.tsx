import { createBrowserRouter } from 'react-router-dom'

import { SignIn } from '@/pages/authentication/signin'

export const Routes = createBrowserRouter([
  {
    path: '/signin',
    element: <SignIn />
  }
])
