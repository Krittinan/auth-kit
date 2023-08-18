import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignIn, useIsAuthenticated } from 'react-auth-kit'
import axios from 'axios'

type LoginInputType = {
  username: string
  password: string
}

const initialLoginInput: LoginInputType = {
  username: '',
  password: '',
}

export default function LoginCard() {
  const isAuth = useIsAuthenticated()
  const signIn = useSignIn()
  const navigate = useNavigate()

  const [loginIn, setLoginIn] = useState<LoginInputType>(initialLoginInput)
  const [errorMessage, setErrorMessage] = useState<string>('')

  // user -> kminchelle
  // pass -> 0lelplR

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      // -> APIs for login 
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username: loginIn.username,
        password: loginIn.password
      })
      const data = await response.data

      // -> Check response data isn't undefined
      if (data) {
        signIn({
          token: data.token,
          expiresIn: 1440,
          tokenType: "Bearer",
          authState: { ...data }
        })
        navigate('/', { replace: true })
      }
    } catch (error: any) {
      // -> Handle error login
      if (error.response) {
        const { data } = error.response
        setErrorMessage(data.message)
      }
    }
  }

  useEffect(() => {
    if (isAuth()) {
      navigate('/', { replace: true })
    }
  }, [])

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        padding: '40px',
        borderRadius: '10px'
      }}
    >
      <p
        style={{
          textAlign: 'center',
          fontSize: '20px',
          marginBottom: '15px',
        }}
      >
        Please fill your information
      </p>

      <form
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <div>
        <p
            style={{ 
              fontSize: '10px',
              marginBottom: '3px'
            }}
          >
            username
          </p>
          <input
            type="text" 
            style={{ padding: '5px 5px', width: '94%' }}
            value={loginIn.username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setErrorMessage('')
              setLoginIn((prev: LoginInputType) => ({ ...prev, username: e.target.value}))
            }}
          />
        </div>
        <div>
          <p
            style={{ 
              fontSize: '10px',
              marginBottom: '3px'
            }}
          >
            password
          </p>
          <input
            type="password"
            style={{ padding: '5px 5px', width: '94%' }}
            value={loginIn.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setErrorMessage('')
              setLoginIn((prev: LoginInputType) => ({ ...prev, password: e.target.value}))
            }}
          />
        </div>

        {errorMessage !== '' && (
          <p
            style={{
              color: 'red',
              fontSize: '10px',
            }}
          >
            {`Error: ${errorMessage}`}
          </p>
        )}

        <button 
          type="submit"
          style={{
            marginTop: '10px',
            padding: '5px 10px',
            width: '100%',
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  )
}