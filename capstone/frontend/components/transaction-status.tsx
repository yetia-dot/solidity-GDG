'use client'

import React from 'react'
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'

interface TransactionStatusProps {
  type: 'success' | 'pending' | 'error'
  message: string
}

export default function TransactionStatus({
  type,
  message,
}: TransactionStatusProps) {
  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-600',
          text: 'text-green-800',
          Icon: CheckCircle2,
        }
      case 'pending':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          icon: 'text-amber-600',
          text: 'text-amber-800',
          Icon: Clock,
        }
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: 'text-red-600',
          text: 'text-red-800',
          Icon: AlertCircle,
        }
    }
  }

  const styles = getStyles()
  const Icon = styles.Icon

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 animate-in fade-in slide-in-from-bottom-4">
      <div
        className={`${styles.bg} ${styles.border} border rounded-lg p-4 flex gap-4 items-start shadow-lg`}
      >
        <Icon className={`${styles.icon} w-5 h-5 mt-0.5 flex-shrink-0`} />
        <p className={`${styles.text} font-medium text-sm`}>{message}</p>
      </div>
    </div>
  )
}
