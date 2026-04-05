'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Twitter,
  Linkedin,
  Instagram,
  Send as Telegram,
  Globe,
  Music,
  BookOpen,
  Edit2,
  LogOut,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import SharableLink from './sharable-link'

interface SocialLink {
  type: 'linkedin' | 'instagram' | 'telegram' | 'portfolio' | 'tiktok' | 'medium'
  url: string
}

interface CreatorProfileProps {
  onTip: (amount: number) => void
  username?: string
  bio?: string
  twitter?: string
  socialLinks?: SocialLink[]
  isOwner?: boolean
  onLogout?: () => void
}

const ICON_MAP = {
  linkedin: Linkedin,
  instagram: Instagram,
  telegram: Telegram,
  portfolio: Globe,
  tiktok: Music,
  medium: BookOpen,
}

export default function CreatorProfile({
  onTip,
  username = '@ethiocreator',
  bio = 'Storyteller, artist, and visionary creating meaningful content for East Africa.',
  twitter = '@ethiocreator',
  socialLinks = [],
  isOwner = true,
  onLogout,
}: CreatorProfileProps) {
  const [customAmount, setCustomAmount] = useState('')
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null)

  const handlePresetTip = (amount: number) => {
    setSelectedPreset(amount)
    onTip(amount)
    setTimeout(() => setSelectedPreset(null), 2000)
  }

  const handleCustomTip = () => {
    const amount = parseFloat(customAmount)
    if (amount > 0) {
      onTip(amount)
      setCustomAmount('')
    }
  }

  const initials = username
    .replace('@', '')
    .split('')
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="w-full max-w-md space-y-4">
      <Card className="border-border bg-card shadow-lg">
        <CardContent className="p-8">
          {/* Header with controls - only show if owner */}
          {isOwner && (
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Creator Dashboard
              </p>
              <button
                onClick={onLogout}
                className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                <LogOut className="w-3 h-3" />
                Logout
              </button>
            </div>
          )}

          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <Avatar className="w-24 h-24 border-2 border-accent">
              <AvatarFallback className="bg-accent/20 text-accent font-serif text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Creator Info */}
          <div className="text-center mb-8 border-b border-border pb-8">
            <h2 className="font-serif text-3xl font-bold text-primary mb-2">
              {username}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">{bio}</p>

            {/* Social Links - Always show Twitter, then optional links */}
            <div className="flex justify-center gap-4 mt-6 flex-wrap">
              <a
                href={`https://twitter.com/${twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-accent/20 text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>

              {socialLinks.map((link, index) => {
                const IconComponent = ICON_MAP[link.type]
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-accent/20 text-primary transition-colors"
                    aria-label={link.type}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Tipping Section */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-primary text-center">
              Support with USDC
            </p>

            {/* Preset Buttons */}
            <div className="grid grid-cols-3 gap-3">
              {[5, 10, 25].map((amount) => (
                <Button
                  key={amount}
                  onClick={() => handlePresetTip(amount)}
                  variant={selectedPreset === amount ? 'default' : 'outline'}
                  className={`font-medium transition-all ${
                    selectedPreset === amount
                      ? 'bg-accent hover:bg-accent/90 text-accent-foreground border-accent'
                      : 'border-border hover:border-accent text-primary hover:bg-accent/10'
                  }`}
                >
                  ${amount}
                </Button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                min="0"
                step="0.01"
                className="border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
              />
              <Button
                onClick={handleCustomTip}
                disabled={!customAmount || parseFloat(customAmount) <= 0}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
              >
                Send
              </Button>
            </div>

            {/* Send Tip Button */}
            <Button
              onClick={() => {
                const preset = selectedPreset
                if (preset) handlePresetTip(preset)
              }}
              disabled={selectedPreset === null && !customAmount}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-serif font-semibold text-base py-6"
            >
              Send Tip
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sharable Link - only show if owner */}
      {isOwner && <SharableLink username={username.replace('@', '')} />}
    </div>
  )
}
