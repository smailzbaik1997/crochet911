import { NextRequest, NextResponse } from 'next/server'
import { SitemapScheduler } from '@/lib/sitemap-scheduler'

export async function POST(request: NextRequest) {
  try {
    // Optional: Add authentication/authorization here
    const authHeader = request.headers.get('authorization')
    
    const expectedToken = process.env.ADMIN_SECRET_TOKEN
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const scheduler = SitemapScheduler.getInstance()
    
    // Get the action from request body
    const body = await request.json()
    const { action } = body

    switch (action) {
      case 'start':
        scheduler.startScheduler()
        return NextResponse.json({ 
          success: true, 
          message: 'Sitemap scheduler started',
          timestamp: new Date().toISOString()
        })
      
      case 'stop':
        scheduler.stopScheduler()
        return NextResponse.json({ 
          success: true, 
          message: 'Sitemap scheduler stopped',
          timestamp: new Date().toISOString()
        })
      
      case 'status':
        return NextResponse.json({ 
          success: true, 
          message: 'Scheduler status endpoint',
          timestamp: new Date().toISOString()
        })
      
      case 'check-updates':
        const hasUpdates = await scheduler.checkForUpdates()
        return NextResponse.json({ 
          success: true, 
          hasUpdates,
          message: hasUpdates ? 'Recent updates found' : 'No recent updates',
          timestamp: new Date().toISOString()
        })
      
      default:
        return NextResponse.json({ 
          error: 'Invalid action. Use: start, stop, status, or check-updates' 
        }, { status: 400 })
    }
  } catch (error) {
    console.error('Error in sitemap scheduler endpoint:', error)
    return NextResponse.json(
      { error: 'Failed to manage sitemap scheduler' }, 
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Sitemap scheduler management endpoint',
    actions: ['start', 'stop', 'status', 'check-updates'],
    method: 'POST required',
    timestamp: new Date().toISOString()
  })
}