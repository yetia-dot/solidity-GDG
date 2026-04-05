import React from 'react'

export default function HeroSection() {
  return (
    <section className="border-b border-border py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
          Direct, Decentralized Support
        </h2>
        <p className="font-serif text-2xl md:text-3xl text-primary/80 mb-8 leading-relaxed">
          for Ethiopian Creators
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          EthioLink is a sophisticated protocol enabling direct cryptocurrency support for content creators. No intermediaries. No fees. Pure connection between creators and supporters.
        </p>
      </div>
    </section>
  )
}
