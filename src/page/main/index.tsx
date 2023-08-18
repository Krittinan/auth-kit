import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RequireAuth, useAuthUser, useSignOut } from 'react-auth-kit'

export default function Main() {
  const auth = useAuthUser()
  const navigate = useNavigate()
  
  const signOut = useSignOut()

  const handleSignOut = () => {
    signOut()
    navigate('/login', { replace: true })
  }

  return (
    <RequireAuth loginPath='/login'>
      <div
        style={{
          backgroundColor: 'lightgreen',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            padding: '20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
          }}
        >
          <p>{`Hello, ${auth()?.firstName} ${auth()?.lastName}`}</p>

          <hr
            style={{
              border: 'none',
              height: '1px',
              backgroundColor: '#CACCCF',
              marginTop: '5px',
              marginBottom: '10px'
            }}
          />

          <img 
            src={auth()?.image}
            alt=""
          />

          <div
            style={{
              marginTop: '10px'
            }}
          >
            <p>{`id: ${auth()?.id}`}</p>
            <p>{`username: ${auth()?.username}`}</p>
            <p>{`gender: ${auth()?.gender}`}</p>
            <p>{`email: ${auth()?.email}`}</p>
          </div>

          <div
            style={{
              marginTop: '30px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <button 
              type="button"
              onClick={handleSignOut}
              style={{
                padding: '5px 20px'
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </RequireAuth>
  )
}