import Head from 'next/head'
import Header from '@/components/home/Header'
import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Why from '@/components/home/Why'
import Who from '@/components/home/Who'
import Benefits from '@/components/home/Benefits'
import ProfilePreview from '@/components/home/ProfilePreview'
import Footer from '@/components/home/Footer'
import StickyCTA from '@/components/home/StickyCTA'
import IntroSection from '@/components/home/Intro'
import JoinSection from '@/components/home/Join'

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
        <IntroSection />
        <About />
        <Why />
        <Who />
        <Benefits />
        <ProfilePreview />
        <JoinSection />
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}