'use client'

import React, { useContext } from 'react'
import { redirect } from 'next/navigation'
import { AuthContext } from '../../_state/user/authContext'

const User = () => {
  const { authDetails } = useContext(AuthContext)
  if (!authDetails) return redirect('/')
  return <p>HELLO</p>
}

export default User
