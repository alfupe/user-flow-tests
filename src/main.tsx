import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from 'App'

async function enableMocking() {
  if (import.meta.env.VITE_MOCKED !== 'TRUE') {
    return
  }

  const { worker } = await import('./mocks/browser')

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(<App />)
})
