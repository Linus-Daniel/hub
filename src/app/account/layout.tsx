import React, { ReactNode } from 'react'
import Layout from '@/components/account/Layout'

export default function AccountLayout({children}:{children:ReactNode}) {
  return (
    <Layout>
      {children}
    </Layout>
  )
}