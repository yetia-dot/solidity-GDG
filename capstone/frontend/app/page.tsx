'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import RegistrationForm from '@/components/registration-form'
import CreatorProfile from '@/components/creator-profile'
import TreasuryFooter from '@/components/treasury-footer'
import TransactionStatus from '@/components/transaction-status'

interface SocialLink {
  type: 'linkedin' | 'instagram' | 'telegram' | 'portfolio' | 'tiktok' | 'medium'
  url: string
}

interface CreatorData {
  username: string
  bio: string
  twitter: string
  socialLinks: SocialLink[]
}

export default function Home() {
  const searchParams = useSearchParams()
  const publicUsername = searchParams.get('creator')

  const [isRegistered, setIsRegistered] = useState(false)
  const [creatorData, setCreatorData] = useState<CreatorData | null>(null)
  const [transactionStatus, setTransactionStatus] = useState<{
    type: 'success' | 'pending' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleRegistration = (data: any) => {
    setCreatorData({
      username: `@${data.username}`,
      bio: data.bio,
      twitter: `@${data.twitter.replace('@', '')}`,
      socialLinks: data.socialLinks || [],
    })
    setIsRegistered(true)
    setTransactionStatus({
      type: 'success',
      message: 'Profile created successfully!',
    })
    setTimeout(() => {
      setTransactionStatus({ type: null, message: '' })
    }, 3000)
  }

  const handleTip = (amount: number) => {
    setTransactionStatus({
      type: 'pending',
      message: `Processing tip of $${amount}...`,
    })
    setTimeout(() => {
      setTransactionStatus({
        type: 'success',
        message: `Tip of $${amount} sent successfully!`,
      })
      setTimeout(() => {
        setTransactionStatus({ type: null, message: '' })
      }, 3000)
    }, 2000)
  }

  const handleLogout = () => {
    setIsRegistered(false)
    setCreatorData(null)
  }

  // Public profile view (when accessed via /u/username)
  if (publicUsername && !isRegistered) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <CreatorProfile
            onTip={handleTip}
            username={`@${publicUsername}`}
            bio="Creator supporting EthioLink"
            twitter={`@${publicUsername}`}
            socialLinks={[]}
            isOwner={false}
          />
        </div>
        {transactionStatus.type && (
          <TransactionStatus
            type={transactionStatus.type}
            message={transactionStatus.message}
          />
        )}
        <TreasuryFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      {!isRegistered ? (
        <>
          <HeroSection />
          <div className="flex-1 flex items-center justify-center px-4 py-20">
            <RegistrationForm onSubmit={handleRegistration} />
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          {creatorData && (
            <CreatorProfile
              onTip={handleTip}
              username={creatorData.username}
              bio={creatorData.bio}
              twitter={creatorData.twitter}
              socialLinks={creatorData.socialLinks}
              isOwner={true}
              onLogout={handleLogout}
            />
          )}
        </div>
      )}

      {transactionStatus.type && (
        <TransactionStatus
          type={transactionStatus.type}
          message={transactionStatus.message}
        />
      )}

      <TreasuryFooter />
    </div>
  )
}
