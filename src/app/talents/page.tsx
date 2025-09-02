import TalentsPage from '@/components/TalentPage'
import React, { Suspense } from 'react'

function page() {
  return (
    <Suspense>

      <TalentsPage />
    </Suspense>
  )
}

export default page