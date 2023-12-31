import { supabase } from '@/services/supabase'
import { type Session, type User } from '@supabase/supabase-js'
import { createContext, useState, useContext, type ReactNode, useEffect } from 'react'

interface IChildren {
  children: ReactNode
}

const AuthContext = createContext<{ session: Session | null | undefined, user: User | null | undefined, signOut: () => void }>({ session: null, user: null, signOut: () => {} })

export function AuthContextProvider ({ children }: IChildren): JSX.Element {
  const [user, setUser] = useState<User>()
  const [session, setSession] = useState<Session | null>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const setData = async (): Promise<void> => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      setSession(session)
      setUser(session?.user)
      setLoading(false)
    }

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user)
      setLoading(false)
    })

    void setData()

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  const value = {
    session,
    user,
    signOut: async () => await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): {
  session: Session | null | undefined
  user: User | null | undefined
  signOut: () => void
} => {
  return useContext(AuthContext)
}
