import {format} from 'date-fns'
import distanceInWords from 'date-fns/formatDistanceToNowStrict'
import isValid from 'date-fns/isValid'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY
const MONTH = 30 * DAY

const getFormat = (d: string, addSuffix: boolean) => {
  const date = new Date(d)

  const now = new Date()
  const delta = now.getTime() - date.getTime()

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  if (delta < MINUTE) return 'Just now' // less than 1 min ago
  if (yesterday.toDateString() === date.toDateString()) return 'Yesterday' // yesterday
  if (delta < DAY) return distanceInWords(date, {addSuffix}) // less than 1 day ago (in words) i.e. "2 hours ago"
  if (delta < MONTH) return format(date, 'MMM d') // less than 30 days ago (format: May 1)
  return format(date, 'MMM dd, yyyy') // more than 30 days ago (format: May 1, 2019)
}

export const getTwitterDate = (timestamp: string, addSuffix = true) => {
  const date = isValid(new Date(timestamp))
    ? getFormat(timestamp, addSuffix)
    : '-'
  return date
}
