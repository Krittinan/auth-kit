import React from 'react'
import { useRoutes, BrowserRouter } from 'react-router-dom'

import { MainPage, LoginPage } from '../page'

function RoutePath() {
  return useRoutes([
    { path: '/', element: <MainPage /> },
    { path: '/login', element: <LoginPage />},
  ])
}

export default function Route() {
  return (
    <BrowserRouter basename="/">
        <RoutePath />
    </BrowserRouter>
  )
}