import { Metadata } from 'next'

import { RegisterPage } from './register'

export const metadata: Metadata = {
  title: 'Sign Up | DineLocal',
  description:
    'Create your DineLocal account to discover authentic dining experiences or become a host.',
}

export default function Page() {
  return <RegisterPage />
}
