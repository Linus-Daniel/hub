import React, { ReactNode } from 'react'
import "../globals.css"
import Layout from '@/components/accont/Layout'

function RootLayout({children}:{children:ReactNode}) {
  return (
    <html>
        <body>
            <Layout>
                {children}
            </Layout>
        </body>
    </html>
  )
}

export default RootLayout