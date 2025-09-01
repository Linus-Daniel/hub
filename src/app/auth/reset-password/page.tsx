import ResetPasswordPage from '@/components/auth/Reset-Password'
import React,{Suspense} from 'react'

function page() {
  return (
    <Suspense>
      <ResetPasswordPage />
    </Suspense>
  )
}

export default page