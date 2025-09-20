"use client"
import { Query, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { Children } from 'react'
const queryClient = new QueryClient()

function Providers({children}: {children: React.ReactNode}) {
  return (
    <div>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </div>
  )
}

export default Providers