'use client'

import { useState } from 'react'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
// import { api } from '@/services/db'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
// import { useToast } from '@/components/ui/use-toast'

export function Dashboard (): JSX.Element {
  const formSchema = z.object({
    code: z.string(),
    title: z.string(),
    packaging: z.string(),
    price: z.string(),
    productImage: z.string()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
      title: '',
      packaging: '',
      price: '',
      productImage: 'https://www.big2be.com.br/products/7896212919888.png'
    }
  })

  const [loading, setLoading] = useState(false)

  async function onSubmit (values: z.infer<typeof formSchema>): Promise<void> {
    setLoading(true)
    try {
      await axios.post('http://localhost:3000/create', {
        code: values.code,
        title: values.title,
        packaging: values.packaging,
        price: values.price,
        productImage: values.productImage
      })
      form.reset()
    } catch (error) {
      throw new Error('An error occurred while sending the request!')
    }
    setLoading(false)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <Card className="w-[400px] border-border">
        <CardHeader className="relative">
          <div className="absolute right-3 top-3">
            <ModeToggle />
          </div>
          <CardTitle>Gerador de encartes</CardTitle>
          <CardDescription>Faça seu encarte agora!</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 xl:space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código do produto</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="68370" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="RF.SOBREM.FRUTAP DOCE DE LEITE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="packaging"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Embalagem</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="180G" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="11,29" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagem do produto</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://localhost.com/image/sobrem-frutap.png" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {
                loading
                  ? <Button className="w-full cursor-not-allowed opacity-50">
                    <Loader2 className="animate-spin mr-1.5" size={16} />
                    Carregando...
                  </Button>
                  : <Button className="w-full" type="submit">Enviar encarte!</Button>
              }
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
