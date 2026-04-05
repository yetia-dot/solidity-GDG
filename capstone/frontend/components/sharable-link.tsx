'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'

interface SharableLinkProps {
  username: string
}

export default function SharableLink({ username }: SharableLinkProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = `ethiolink.app/u/${username}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="w-full max-w-md border-border bg-card mt-6">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Your Sharable Link
            </p>
            <div className="flex items-center gap-2 p-3 bg-muted/20 rounded border border-border">
              <span className="text-sm font-mono text-primary flex-1 truncate">
                {shareUrl}
              </span>
            </div>
          </div>
          <Button
            onClick={handleCopy}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Link
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
