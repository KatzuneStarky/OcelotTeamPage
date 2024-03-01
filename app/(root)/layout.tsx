import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import React from 'react'

const RootLayout = ({
    children
}: { children: React.ReactNode }) => {
  return (
    <div>
        <Navbar />
        {children}
        <Footer />
    </div>
  )
}

export default RootLayout