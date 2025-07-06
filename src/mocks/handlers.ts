import { http, HttpResponse } from 'msw'
import { emilyJohnson, johnMaverick, meryJaneSmith } from './responses'

export const handlers = [
  http.get('https://example.com/users/', () => {
    return HttpResponse.json({})
  }),
  http.get('https://example.com/users/:slug', ({ params }) => {
    if (params.slug === 'john-maverick') {
      return HttpResponse.json(johnMaverick)
    }

    if (params.slug === 'mery-jane-smith') {
      return HttpResponse.json(meryJaneSmith)
    }

    if (params.slug === 'emily-johnson') {
      return HttpResponse.json(emilyJohnson)
    }

    return new HttpResponse(null, { status: 404 })
  }),
]
