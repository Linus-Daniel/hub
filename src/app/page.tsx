import Head from 'next/head'
import Header from '@/components/home/Header'
import Hero from '@/components/home/Hero'
import Intro from '@/components/home/Intro'
import About from '@/components/home/About'
import Why from '@/components/home/Why'
import Who from '@/components/home/Who'
import Benefits from '@/components/home/Benefits'
import ProfilePreview from '@/components/home/ProfilePreview'
import Join from '@/components/home/Join'
import Footer from '@/components/home/Footer'
import StickyCTA from '@/components/home/StickyCTA'

export default function Home() {
  return (
    <>
      <Head>
        <title>CONCES National Talent Directory</title>
        <meta name="description" content="A national showcase of Nigeria's brightest engineering, tech, and design talents" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Header />
      <main>
        <Hero />
        <Intro />
        <About />
        <Why />
        <Who />
        <Benefits />
        <ProfilePreview />
        <Join />
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}