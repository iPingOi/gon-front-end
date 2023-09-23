'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function SignUp (): JSX.Element {
  const formSchema = z.object({
    enrollment: z.string().nonempty({
      message: 'Preencha o campo Matrícula.'
    }),
    password: z.string().nonempty({
      message: 'Preencha o campo Senha.'
    })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enrollment: '',
      password: ''
    }
  })

  function onSubmit (values: z.infer<typeof formSchema>): void {
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
            <form onSubmit={() => onSubmit} className="space-y-8">
              <FormField
                control={form.control}
                name="enrollment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Matrícula</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      Insira sua matrícula.
                    </FormDescription>
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
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                      Insira sua senha.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">Entrar</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
