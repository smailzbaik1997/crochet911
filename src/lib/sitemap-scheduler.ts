import { supabase } from '@/lib/supabase'

export class SitemapScheduler {
  private static instance: SitemapScheduler
  private intervalId: NodeJS.Timeout | null = null

  private constructor() {}

  public static getInstance(): SitemapScheduler {
    if (!SitemapScheduler.instance) {
      SitemapScheduler.instance = new SitemapScheduler()
    }
    return SitemapScheduler.instance
  }

  public startScheduler() {
    if (this.intervalId) {
      console.log('Sitemap scheduler already running')
      return
    }

    // Run every hour (3600000 milliseconds)
    this.intervalId = setInterval(async () => {
      try {
        await this.triggerSitemapUpdate()
      } catch (error) {
        console.error('Error in scheduled sitemap update:', error)
      }
    }, 3600000) // 1 hour

    console.log('Sitemap scheduler started - will update every hour')
  }

  public stopScheduler() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
      console.log('Sitemap scheduler stopped')
    }
  }

  private async triggerSitemapUpdate() {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      const token = process.env.SITEMAP_REVALIDATE_TOKEN

      const response = await fetch(`${baseUrl}/api/revalidate-sitemap`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Scheduled sitemap update successful:', result)
      } else {
        console.error('Scheduled sitemap update failed:', response.status)
      }
    } catch (error) {
      console.error('Error triggering sitemap update:', error)
    }
  }

  // Check for recent pattern or category updates
  public async checkForUpdates(): Promise<boolean> {
    try {
      const oneHourAgo = new Date(Date.now() - 3600000).toISOString()
      
      // Check for recent patterns
      const { data: recentPatterns } = await supabase
        .from('patterns')
        .select('id')
        .gte('updated_at', oneHourAgo)
        .limit(1)

      // Check for recent categories
      const { data: recentCategories } = await supabase
        .from('categories')
        .select('id')
        .gte('updated_at', oneHourAgo)
        .limit(1)

      return Boolean(recentPatterns && recentPatterns.length > 0) || 
             Boolean(recentCategories && recentCategories.length > 0)
    } catch (error) {
      console.error('Error checking for updates:', error)
      return false
    }
  }
}

// Auto-start the scheduler in production
if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
  const scheduler = SitemapScheduler.getInstance()
  scheduler.startScheduler()
}