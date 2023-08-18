import React from 'react'
import { LoginComponent } from '../../components'

export default function LoginPage() {
  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: 'pink',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <LoginComponent.LoginCard />
    </div>
  )
}