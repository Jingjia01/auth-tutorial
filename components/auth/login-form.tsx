"use client"

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import { zodResolver} from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CardWrapper } from "@/components/auth/card-wrapper"
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { login } from '@/actions/login';

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
          setError(data.error); 
          setSuccess(data.success); 
        })
        .catch(() => setError("An unexpected error occurred")); 
    });
  }

  return (
    <CardWrapper
       headerLabel="Welcome Back"
       backButtonLabel= "Don't have an account?"
       backButtonHref="/auth/register"
       showSocial
    >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
               <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="john@gmail.com"
                          type="email"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="password"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="********"
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
               />
            </div>
            <FormError message={error}/>
            <FormSuccess message={success}/>
            <Button
              disabled={isPending}
              type="submit"
              className='w-full'
            >
              Login
            </Button>  
          </form>
        </Form>
    </CardWrapper>
  )
}

export default LoginForm