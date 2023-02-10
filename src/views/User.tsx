import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from 'context/authContext'

const UserPage = () => {
  const { authDetails } = useContext(AuthContext)

  if (!authDetails) return <Navigate to="/sign-in" />
  const { username } = authDetails.user

  return (
    <div>
      <h1>Hello {username}!</h1>
    </div>
  )
}

export default UserPage
