import axios from 'axios'
import type { Options } from '../types/options'
import type { Row } from '../types/row'

export async function saveLesson (rows: Row[], tl: [({
  term: string
  image: string
  type: string | undefined
} | undefined)?], options: Options): Promise<any> {
  const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/lesson', { rows, tl, options, user: 'sub' })
  return res
}
export async function openSubscription (): Promise<any> {
  const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/paypal/create-subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userAction: 'SUBSCRIBE_NOW' })
  })
  return res
}
