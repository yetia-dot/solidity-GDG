'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import { ChevronDown } from 'lucide-react'

interface SocialLink {
  type: 'linkedin' | 'instagram' | 'telegram' | 'portfolio' | 'tiktok' | 'medium'
  url: string
}

interface RegistrationFormProps {
  onSubmit: (data: any) => void
}

const LINK_TYPES = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'medium', label: 'Medium' },
]

export default function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    twitter: '',
    socialLinks: [] as SocialLink[],
  })
  const [showAddLink, setShowAddLink] = useState(false)
  const [newLink, setNewLink] = useState({ type: 'linkedin' as const, url: '' })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddLink = () => {
    if (newLink.url.trim()) {
      setFormData((prev) => ({
        ...prev,
        socialLinks: [...prev.socialLinks, newLink],
      }))
      setNewLink({ type: 'linkedin', url: '' })
      setShowAddLink(false)
    }
  }

  const handleRemoveLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.twitter.trim()) {
      alert('X (Twitter) Handle is required')
      return
    }
    onSubmit(formData)
  }

  return (
    <Card className="w-full max-w-md border-border bg-card">
      <CardHeader>
        <CardTitle className="font-serif text-2xl">Create Your Profile</CardTitle>
        <CardDescription className="text-muted-foreground">
          Join EthioLink and start receiving support
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                name="username"
                placeholder="@yourname"
                value={formData.username}
                onChange={handleChange}
                required
                className="border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about yourself and your work"
                value={formData.bio}
                onChange={handleChange}
                required
                className="border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-accent resize-none"
                rows={4}
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="twitter">
                X (Twitter) Handle <span className="text-accent">*</span>
              </FieldLabel>
              <Input
                id="twitter"
                name="twitter"
                placeholder="@yourhandle"
                value={formData.twitter}
                onChange={handleChange}
                required
                className="border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
              />
            </Field>
          </FieldGroup>

          {/* Social Links List */}
          {formData.socialLinks.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-border">
              <p className="text-sm font-medium text-primary">Additional Links</p>
              {formData.socialLinks.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-muted/30 rounded border border-border"
                >
                  <span className="text-sm text-foreground">
                    {LINK_TYPES.find((lt) => lt.value === link.type)?.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(index)}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Social Link */}
          <div className="space-y-2 border-t border-border pt-4">
            <button
              type="button"
              onClick={() => setShowAddLink(!showAddLink)}
              className="w-full flex items-center justify-between p-3 bg-muted/20 hover:bg-muted/40 rounded border border-dashed border-border transition-colors"
            >
              <span className="text-sm font-medium text-primary">Add Social Link</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showAddLink ? 'rotate-180' : ''
                }`}
              />
            </button>

            {showAddLink && (
              <div className="space-y-3 animate-in slide-in-from-top-2 p-3 bg-muted/10 rounded border border-border">
                <select
                  value={newLink.type}
                  onChange={(e) =>
                    setNewLink({
                      ...newLink,
                      type: e.target.value as typeof newLink.type,
                    })
                  }
                  className="w-full px-3 py-2 border border-border bg-background text-foreground rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent text-sm"
                >
                  {LINK_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>

                <Input
                  type="url"
                  placeholder="Paste your URL here"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
                />

                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={handleAddLink}
                    disabled={!newLink.url.trim()}
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-medium text-sm py-2 h-auto"
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setShowAddLink(false)
                      setNewLink({ type: 'linkedin', url: '' })
                    }}
                    variant="outline"
                    className="flex-1 border-border text-primary hover:bg-muted text-sm py-2 h-auto"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
            size="lg"
          >
            Create Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
