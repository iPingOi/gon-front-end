'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function SignUp (): JSX.Element {
  const formSchema = z.object({
    name: z.string({
      required_error: 'Preencha o campo Nome.',
      invalid_type_error: 'Este não é um formato de nome valido.'
    }).min(3,
      { message: 'Deve ter 3 ou mais caracteres.' }
    ).max(15,
      { message: 'Deve ter 15 caracteres ou menos.' }
    ),
    surname: z.string({
      required_error: 'Preencha o campo Sobrenome.',
      invalid_type_error: 'Este não é um formato de sobrenome valido.'
    }).min(3,
      { message: 'Deve ter 3 ou mais caracteres.' }
    ).max(15,
      { message: 'Deve ter 15 caracteres ou menos.' }
    ),
    enrollment: z.string({
      required_error: 'Preencha o campo Matrícula.',
      invalid_type_error: 'Este não é um formato de matrícula valido.'
    }).min(7,
      { message: 'Deve ter 7 ou mais caracteres.' }
    ).max(11,
      { message: 'Deve ter 11 caracteres ou menos.' }
    ),
    email: z.string({
      required_error: 'Preencha o campo Email.',
      invalid_type_error: 'Este não é um formato de email valido.'
    }).email(
      { message: 'Endereço de Email inválido.' }
    ),
    password: z.string({
      required_error: 'Preencha o campo Senha.',
      invalid_type_error: 'Este não é um formato de senha valido.'
    }).min(8, {
      message: 'Deve ter 8 ou mais caracteres.'
    }).max(20, {
      message: 'Deve ter 20 caracteres ou menos.'
    }),
    confirmPassword: z.string({
      required_error: 'Preencha o campo Confirmar Senha.',
      invalid_type_error: 'Este não é um formato de senha valido.'
    }).min(8, {
      message: 'Deve ter 8 ou mais caracteres.'
    }).max(20, {
      message: 'Deve ter 20 caracteres ou menos.'
    })
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword']
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      surname: '',
      enrollment: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  function onSubmit (values: z.infer<typeof formSchema>): void {
    // !OBRA DE ARTE PAPAI
    console.log(values)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
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
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Rodrigo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enrollment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Matrícula</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="500807215" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="rodrigo_fernandes_silva@atacadao.com.br" {...field} />
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="**********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit">Entrar</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <span>Já possui uma conta?{' '}
            <Link className="text-primary underline-offset-4 hover:underline" to="/auth/signin">Entrar agora</Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  )
}
