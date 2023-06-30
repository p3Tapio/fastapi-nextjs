/* eslint-disable import/prefer-default-export */

import { IAuthDetails, IUser } from '.'

const isString = (text: unknown): text is string => {
  return (
    (typeof text === 'string' || text instanceof String) &&
    (text as string).length > 0
  )
}

const isNumber = (no: unknown): no is number => {
  return !Number.isNaN(Number(no))
}

export const isUser = (object: unknown): boolean => {
  if (
    !object ||
    !isNumber((object as IUser).id) ||
    !isString((object as IUser).email) ||
    !isString((object as IUser).email)
  ) {
    return false
  }
  return true
}

export const isAuthDetails = (object: unknown): boolean => {
  if (
    !object ||
    Object.keys(object).length !== 2 ||
    !isString((object as IAuthDetails).token) ||
    !isUser((object as IAuthDetails).user)
  ) {
    return false
  }
  return true
}
