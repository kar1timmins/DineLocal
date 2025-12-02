'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, ArrowLeft, ChefHat, Lock, Mail, Phone, User } from 'lucide-react'
import * as z from 'zod'

import { authApi, type RegisterRequest, UserRole } from '@/api/auth'
import { Alert, AlertDescription } from '@/components/shared/alert'
import { Button } from '@/components/shared/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shared/card'
import { Checkbox } from '@/components/shared/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/form'
import { Input } from '@/components/shared/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shared/tabs'
import { useAuthStore } from '@/stores/authStore'

// Sign Up Schema
const signUpSchema = z
  .object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    phone: z.string().optional(),
    role: z.enum(['user', 'host']),
    agreeToTerms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
  .refine((data) => data.agreeToTerms === true, {
    message: 'You must agree to the terms and conditions',
    path: ['agreeToTerms'],
  })

// Sign In Schema
const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean(),
})

type SignUpFormValues = z.infer<typeof signUpSchema>
type SignInFormValues = z.infer<typeof signInSchema>

export function RegisterPage() {
  const router = useRouter()
  const { login } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signup')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Sign Up Form
  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      role: 'user',
      agreeToTerms: false,
    },
  })

  // Sign In Form
  const signInForm = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  // Handle Sign Up
  async function onSignUp(values: SignUpFormValues) {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const registerData: RegisterRequest = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone || undefined,
        role: values.role as UserRole,
      }

      const response = await authApi.register(registerData)

      setSuccess(
        `Account created successfully! ${values.role === 'host' ? 'Welcome to DineLocal as a Host!' : 'Welcome to DineLocal!'}`
      )

      // Update auth store
      login({
        id: response.user.id,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        email: response.user.email,
        avatar: response.user.profileImage,
        registeredAsHost: response.user.role === UserRole.HOST,
      })

      // Redirect after short delay
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Sign In
  async function onSignIn(values: SignInFormValues) {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // TODO: Replace with actual login API call when auth endpoint is implemented
      // const response = await authApi.login({
      //   email: values.email,
      //   password: values.password,
      // })

      // For now, show a placeholder message
      setError('Sign in functionality will be implemented once the backend auth endpoint is ready.')

      // Placeholder login logic (remove when real auth is ready)
      // login({
      //   id: response.user.id,
      //   firstName: response.user.firstName,
      //   lastName: response.user.lastName,
      //   email: response.user.email,
      //   avatar: response.user.profileImage,
      //   registeredAsHost: response.user.role === UserRole.HOST,
      // })
      //
      // setSuccess('Signed in successfully!')
      // setTimeout(() => {
      //   router.push('/')
      // }, 1000)
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const watchRole = signUpForm.watch('role')

  return (
    <div className="flex min-h-screen items-center justify-center py-12">
      <div className="relative container flex w-full max-w-lg flex-col items-center">
        {/* Back to Home Link */}
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground absolute -top-12 left-0 flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Logo/Brand */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
            <ChefHat className="text-primary-foreground h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold">DineLocal</h1>
          <p className="text-muted-foreground text-center text-sm">
            Discover authentic home dining experiences
          </p>
        </div>

        {/* Auth Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Welcome to DineLocal</CardTitle>
            <CardDescription>
              Sign up to discover unique dining experiences or create an account to host your own
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as 'signin' | 'signup')}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Sign Up
                </TabsTrigger>
                <TabsTrigger value="signin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Sign In
                </TabsTrigger>
            </TabsList>

            {/* Sign Up Tab */}
            <TabsContent value="signup" className="space-y-4">
              {error && (
                <Alert variant="error">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <Form {...signUpForm}>
                <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4">
                  {/* Account Type Selection */}
                  <FormField
                    control={signUpForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>I want to</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-2 gap-3">
                            <Button
                              type="button"
                              variant={field.value === 'user' ? 'default' : 'outline'}
                              className="h-auto flex-col gap-2 py-4"
                              onClick={() => field.onChange('user')}
                            >
                              <User className="h-5 w-5" />
                              <div className="text-center">
                                <div className="font-semibold">Join as Guest</div>
                                <div className="text-xs opacity-80">Discover experiences</div>
                              </div>
                            </Button>
                            <Button
                              type="button"
                              variant={field.value === 'host' ? 'default' : 'outline'}
                              className="h-auto flex-col gap-2 py-4"
                              onClick={() => field.onChange('host')}
                            >
                              <ChefHat className="h-5 w-5" />
                              <div className="text-center">
                                <div className="font-semibold">Become a Host</div>
                                <div className="text-xs opacity-80">Share your cuisine</div>
                              </div>
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={signUpForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Email Field */}
                  <FormField
                    control={signUpForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                            <Input placeholder="john.doe@example.com" className="pl-9" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone Field (Optional) */}
                  <FormField
                    control={signUpForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Phone Number <span className="text-muted-foreground">(Optional)</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                            <Input placeholder="+1 (555) 123-4567" className="pl-9" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          {watchRole === 'host'
                            ? 'Required for hosting - guests may need to contact you'
                            : 'Optional for booking confirmations'}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password Fields */}
                  <FormField
                    control={signUpForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="pl-9"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>Must be at least 6 characters</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signUpForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="pl-9"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Terms and Conditions */}
                  <FormField
                    control={signUpForm.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the{' '}
                            <Link
                              href="/terms"
                              className="text-primary underline-offset-4 hover:underline"
                            >
                              Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link
                              href="/privacy"
                              className="text-primary underline-offset-4 hover:underline"
                            >
                              Privacy Policy
                            </Link>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            {/* Sign In Tab */}
            <TabsContent value="signin" className="space-y-4">
              {error && (
                <Alert variant="error">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <Form {...signInForm}>
                <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4">
                  {/* Email Field */}
                  <FormField
                    control={signInForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                            <Input placeholder="john.doe@example.com" className="pl-9" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password Field */}
                  <FormField
                    control={signInForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="pl-9"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <FormField
                      control={signInForm.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Remember me</FormLabel>
                        </FormItem>
                      )}
                    />
                    <Link
                      href="/forgot-password"
                      className="text-primary text-sm underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

        {/* Footer */}
        <p className="text-muted-foreground mt-8 text-center text-sm">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
