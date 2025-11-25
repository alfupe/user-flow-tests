import { Provider } from 'react-redux'
import { store } from 'store'
import { Home } from 'pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { UserDetail } from 'pages/UserDetail'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:slug" element={<UserDetail />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export { App }
