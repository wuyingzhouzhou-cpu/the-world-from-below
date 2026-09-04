import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {isPreviewAllowed} from '@/lib/previewAccess'

export function proxy(request: NextRequest) {
  const allowed = isPreviewAllowed({
    isProduction: process.env.NODE_ENV === 'production',
    secret: process.env.PREVIEW_SECRET,
    provided: request.nextUrl.searchParams.get('secret'),
  })
  if (!allowed) {
    return new NextResponse('Not found', {status: 404})
  }
  const response = NextResponse.next()
  response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return response
}

export const config = {
  matcher: ['/preview/:path*'],
}
