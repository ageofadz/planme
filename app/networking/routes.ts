import axios from 'axios'
import type { Options } from '../types/options'
import type { Row } from '../types/row'

export function saveLesson (rows: Row[], tl: [({
  term: string
  image: string
  type: string | undefined
} | undefined)?], options: Options): boolean {
  axios.post(process.env.NEXT_PUBLIC_API_URL + '/lesson', { rows, tl, options, user: 'sub' }).then(res => {
    console.log(res.data)
  }).catch(err => {
    console.log(err)
  })
  return true
}
