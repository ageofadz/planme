'use server'
import { getSession } from '@auth0/nextjs-auth0'

export default async function getUser (): Promise<string> {
  const user = await getSession()
  return JSON.stringify(user)
}
