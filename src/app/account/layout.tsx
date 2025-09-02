import React, { ReactNode } from 'react'
import "../globals.css"
import Layout from '@/components/accont/Layout'

function layout({children}:{children:ReactNode}) {
  return (
    <html>
        <body className='antialise'>
            <Layout>
                {children}
            </Layout>
        </body>
    </html>
  )
}

export default layout