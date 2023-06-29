/* eslint-disable import/prefer-default-export */

import { IAuthDetails, IToken } from '.'

const isString = (text: unknown): text is string => {
  return (
    (typeof text === 'string' || text instanceof String) &&
    (text as string).length > 0
  )
}

const isNumber = (no: unknown): no is number => {
  return !Number.isNaN(Number(no))
}

export const isToken = (object: unknown): boolean => {
  if (
    !object ||
    !isString((object as IToken).access_token) ||
    (object as IToken).token_type !== 'bearer'
  ) {
    return false
  }
  return true
}

export const isAuthDetails = (object: unknown): boolean => {
  if (
    !object ||
    Object.keys(object).length !== 4 ||
    !isNumber((object as IAuthDetails).id) ||
    !isString((object as IAuthDetails).email) ||
    !isString((object as IAuthDetails).username) ||
    !isToken((object as IAuthDetails).token)
  ) {
    return false
  }
  return true
}
