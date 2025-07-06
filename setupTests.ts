import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { server } from 'mocks/server'

afterEach(() => {
  cleanup()
})

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
