import ax from 'axios'
import type { Options } from '../types/options'
import type { Row } from '../types/row'
import download from 'downloadjs'
import { type Language } from '../types/language'
import { type activityItem } from '../types/activity'
import type React from 'react'
import getUser from './getUser'
import { type Lesson } from '../types/lesson'

const config = (token: string): any => {
  return {
    headers: { Authorization: `Bearer ${token}` }
  }
}

const axios = ax.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

export async function saveLesson (rows: activityItem[], tl: Language, options: Options): Promise<any> {
  const user = JSON.parse(await getUser())
  if (!user) {
    return
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const get = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/lesson', { rows, tl, options }, config(user.accessToken))

  return get
}

export async function getLessons (): Promise<Lesson[] | undefined> {
  const user = JSON.parse(await getUser())
  if (!user) {
    return
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const get = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/lesson/user', {}, config(user.accessToken))
  return get.data as Lesson[]
}

export async function openSubscription (): Promise<any> {
  const res = await axios.post('/paypal/create-subscription', { userAction: 'SUBSCRIBE_NOW' })
  return res
}

export async function getActivities (setActivities: React.Dispatch<React.SetStateAction<activityItem[]>>): Promise<any> {
  const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/activity')
  const data = res.data as activityItem[]
  setActivities(data)
}

interface resWorksheet {
  data: string
  headers: any
}

export async function genPrintables (rows: Row[], tl: Language, options: Options): Promise<any> {
  const { data, headers }: resWorksheet = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/worksheet', { rows, tl, options, user: 'sub' })

  const content = headers['content-type'] as (string | undefined)
  download(data, 'handout.pdf', content)

  return 1
}
