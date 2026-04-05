'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function TreasuryFooter() {
  const [feesCollected] = useState(1247.50)

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            Owner Treasury
          </p>
          <p className="font-serif text-2xl font-bold text-primary">
            Fees Collected: ${feesCollected.toFixed(2)}
          </p>
        </div>
        
        <Button
          variant="outline"
          className="border-border text-primary hover:bg-accent/10 hover:text-primary hover:border-accent"
        >
          Withdraw
        </Button>
      </div>
    </footer>
  )
}
