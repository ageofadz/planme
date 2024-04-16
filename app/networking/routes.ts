import ax from 'axios'
import type { Options } from '../types/options'
import type { Row } from '../types/row'
import download from 'downloadjs'

const headers =
{
}

const axios = ax.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers
})

export async function saveLesson (rows: Row[], tl: [({
  term: string
  image: string
  type: string | undefined
} | undefined)?], options: Options): Promise<any> {
  // const res = await axios.post('/lesson', { rows, tl, options, user: 'sub' }
  // )

  const get = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/lesson', { rows, tl, options, user: 'sub' })

  return get

  // fetch(process.env.NEXT_PUBLIC_API_URL + '/lesson', {
  //   method: 'POST',
  //   headers: { contentType: 'application/json' },
  //   body: JSON.stringify({
  //     rows, tl, options, user: 'sub'
  //   })
  // }).then(e => { console.log(e) }).catch(e => { console.log(e) })
}
export async function openSubscription (): Promise<any> {
  const res = await axios.post('/paypal/create-subscription', { userAction: 'SUBSCRIBE_NOW' })
  return res
}

interface resWorksheet {
  data: string
  headers: any
}

export async function genPrintables (rows: Row[], tl: [({
  term: string
  image: string
  type: string | undefined
} | undefined)?], options: Options): Promise<any> {
  const { data, headers }: resWorksheet = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/worksheet', { rows, tl, options, user: 'sub' })

  const content = headers['content-type']
  download(data, 'handout.pdf', content)

  return 1
}
