import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    // Optional: Add authentication/authorization here
    const authHeader = request.headers.get('authorization')
    
    // You can add a secret token for security
    const expectedToken = process.env.SITEMAP_REVALIDATE_TOKEN
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Revalidate the sitemap
    revalidatePath('/sitemap.xml')
    
    console.log('Sitemap revalidated at:', new Date().toISOString())
    
    return NextResponse.json({ 
      success: true, 
      message: 'Sitemap revalidated successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error revalidating sitemap:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate sitemap' }, 
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Sitemap revalidation endpoint', 
    method: 'POST required',
    timestamp: new Date().toISOString()
  })
}