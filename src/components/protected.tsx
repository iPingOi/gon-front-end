import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

interface IChildren {
  children: ReactNode
}

export default function ProtectedRoute ({ children }: IChildren): JSX.Element {
  const { user } = useAuth()

  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />
  }
  return <>{children}</>
}
