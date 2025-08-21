"use client"
import { useState, useEffect } from 'react'

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      id="sticky-cta" 
      className={`fixed bottom-0 left-0 w-full bg-navy py-4 transform transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-white mb-4 md:mb-0">Ready to join Nigeria's brightest tech talents?</p>
        <button className="bg-gold text-navy px-6 py-3 rounded-lg font-montserrat font-semibold hover:bg-yellow-500 transition-colors duration-300">
          Join the Movement
        </button>
      </div>
    </div>
  )
}