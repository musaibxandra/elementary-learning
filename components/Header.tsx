import React from 'react'
import { Feature1 } from './ui/feature-1'

const Header = () => {
  return (
    <div>
      <Feature1
      title="Unlock Your Potential – Learn the Essential Skills that Matter"
      description="Experience our premium courses and services designed to rejuvenate your mind, body, and soul."
      buttonSecondary={{
        label: "Subscribe Now",
        href: "https://shadcnblocks.com"
    }}
    />
    </div>
  )
}

export default Header
