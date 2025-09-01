import VerifyEmailPage from '@/components/auth/Verify-Email'
import React, { Suspense } from 'react'

function page() {
  return (
    <Suspense>
      <VerifyEmailPage/>
    </Suspense>
  )
}

export default page