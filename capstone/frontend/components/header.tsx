'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="font-serif text-3xl font-bold text-primary italic">
            EthioLink
          </h1>
        </div>
        
        <Button
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium rounded-full px-6"
          size="lg"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>
      </div>
    </header>
  )
}
