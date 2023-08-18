import React from 'react';
import { AuthProvider } from 'react-auth-kit'

import Route from './routes'

function App() {
  return (
    <AuthProvider
      cookieDomain={window.location.hostname}
      authType='cookie'
      authName='_auth'
    >
      <Route />
    </AuthProvider>
  )
}

export default App;