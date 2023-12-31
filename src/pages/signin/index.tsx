'use client'

import { Github, Loader2, Slack } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { supabase } from '@/services/supabase'
import { useEffect, useState } from 'react'
import { type Session } from '@supabase/supabase-js'

export function SignIn (): JSX.Element {
  const [session, setSession] = useState<Session | null>()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const formSchema = z.object({
    email: z.string(),
    password: z.string()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit (values: z.infer<typeof formSchema>): Promise<void> {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      })
      if (error) throw error
      navigate('/')
    } catch (error) {
      navigate('/')
      throw error
    } finally {
      setLoading(false)
      navigate('/dashboard')
    }
  }

  useEffect(() => {
    void supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <>
      {
        !session
          ? <div className="flex justify-center items-center min-h-screen bg-background">
            <Card className="w-[400px] border-border">
              <CardHeader className="relative">
                <div className="absolute right-3 top-3">
                  <ModeToggle />
                </div>
                <CardTitle>Login</CardTitle>
                <CardDescription>Faça login e crie seu encarte!</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 xl:space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <Button variant="outline">
                        <Github className="mr-2 w-4 h-4" />
                        Github
                      </Button>
                      <Button variant="outline">
                        <Slack className="mr-2 w-4 h-4" />
                        Slack
                      </Button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"></span>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Ou continue com</span>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="encartes817@atacadao.com.br" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="**********" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {
                      loading
                        ? <Button className="w-full cursor-not-allowed opacity-50" type="submit">
                          <Loader2 className="animate-spin mr-1.5" size={16} />
                          Entrando...
                        </Button>
                        : <Button className="w-full" type="submit">Entrar</Button>
                    }
                  </form>
                </Form>
              </CardContent>
              <CardFooter>
                <span>Ainda não possui uma conta?{' '}
                  <Link className="text-primary underline-offset-4 hover:underline" to="/signup">Criar agora</Link>
                </span>
              </CardFooter>
            </Card>
          </div>
          : <Navigate to="/dashboard" replace={true} />
      }
    </>
  )
}
