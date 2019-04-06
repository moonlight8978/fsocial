import { TimeUtils } from './time-utils'

describe('Relative time', () => {
  test('1 second', () => {
    const fromTime = 'Thu Oct 25 2018 00:20:00 GMT+0700 (Indochina Time)'
    const toTime = 'Thu Oct 25 2018 00:20:01 GMT+0700 (Indochina Time)'
    expect(TimeUtils.getRelativeTime(fromTime, toTime)).toEqual({
      value: 10,
      type: TimeUtils.format.LESS_THAN_X_SECONDS,
    })
  })

  test('10 seconds', () => {
    const fromTime = 'Thu Oct 25 2018 00:20:00 GMT+0700 (Indochina Time)'
    const toTime = 'Thu Oct 25 2018 00:20:10 GMT+0700 (Indochina Time)'
    expect(TimeUtils.getRelativeTime(fromTime, toTime)).toEqual({
      value: 20,
      type: TimeUtils.format.LESS_THAN_X_SECONDS,
    })
  })

  test('20 seconds', () => {
    const fromTime = 'Thu Oct 25 2018 00:20:00 GMT+0700 (Indochina Time)'
    const toTime = 'Thu Oct 25 2018 00:20:20 GMT+0700 (Indochina Time)'
    expect(TimeUtils.getRelativeTime(fromTime, toTime)).toEqual({
      value: null,
      type: TimeUtils.format.HALF_A_MINUTE,
    })
  })

  test('40 seconds', () => {
    const fromTime = 'Thu Oct 25 2018 00:20:00 GMT+0700 (Indochina Time)'
    const toTime = 'Thu Oct 25 2018 00:20:40 GMT+0700 (Indochina Time)'
    expect(TimeUtils.getRelativeTime(fromTime, toTime)).toEqual({
      value: null,
      type: TimeUtils.format.LESS_THAN_A_MINUTE,
    })
  })

  test('1 minute', () => {
    const fromTime = 'Thu Oct 25 2018 08:20:00 GMT+0700 (Indochina Time)'
    const toTime = 'Thu Oct 25 2018 08:21:00 GMT+0700 (Indochina Time)'
    expect(TimeUtils.getRelativeTime(fromTime, toTime)).toEqual({
      value: 1,
      type: TimeUtils.format.MINUTE,
    })
  })

  test('4 minutes', () => {
    const fromTime = 'Thu Oct 25 2018 08:20:00 GMT+0700 (Indochina Time)'
    const toTime = 'Thu Oct 25 2018 08:24:00 GMT+0700 (Indochina Time)'
    expect(TimeUtils.getRelativeTime(fromTime, toTime)).toEqual({
      value: 4,
      type: TimeUtils.format.X_MINUTES,
    })
  })

  test('1 hour', () => {
    const fromTime = 'Thu Oct 25 2018 08:00:00 GMT+0700 (Indochina Time)'
    const toTime = 'Thu Oct 25 2018 09:00:00 GMT+0700 (Indochina Time)'
    expect(TimeUtils.getRelativeTime(fromTime, toTime)).toEqual({
      value: 1,
      type: TimeUtils.format.HOUR,
    })
  })

  test('5 hours', () => {
    const fromTime = 'Thu Oct 25 2018 03:00:00 GMT+0700 (Indochina Time)'
    const toTime = 'Thu Oct 25 2018 08:00:00 GMT+0700 (Indochina Time)'
    expect(TimeUtils.getRelativeTime(fromTime, toTime)).toEqual({
      value: 5,
      type: TimeUtils.format.X_HOURS,
    })
  })

  test('24 hours', () => {
    const fromTime = 'Thu Oct 25 2018 01:00:00 GMT+0700 (Indochina Time)'
    const toTime = 'Fri Oct 26 2018 01:00:00 GMT+0700 (Indochina Time)'
    expect(TimeUtils.getRelativeTime(fromTime, toTime)).toEqual({
      value: 24,
      type: TimeUtils.format.X_HOURS,
    })
  })

  test('43 hours (3 days)', () => {
    const fromTime = 'Thu Oct 25 2018 00:00:00 GMT+0700 (Indochina Time)'
    const toTime = 'Sun Oct 28 2018 01:00:00 GMT+0700 (Indochina Time)'
    expect(TimeUtils.getRelativeTime(fromTime, toTime)).toEqual({
      value: 3,
      type: TimeUtils.format.X_DAYS,
    })
  })

  test('60 days (2 months)', () => {
    const fromTime = 'Thu Oct 25 2018 00:00:00 GMT+0700 (Indochina Time)'
    const toTime = 'Tue Dec 28 2018 00:00:00 GMT+0700 (Indochina Time)'
    expect(TimeUtils.getRelativeTime(fromTime, toTime)).toEqual({
      value: 2,
      type: TimeUtils.format.X_MONTHS,
    })
  })

  test('1 year 1 month', () => {
    const fromTime = 'Thu Oct 25 2018 00:00:00 GMT+0700 (Indochina Time)'
    const toTime = 'Mon Nov 25 2019 00:00:00 GMT+0700 (Indochina Time)'
    expect(TimeUtils.getRelativeTime(fromTime, toTime)).toEqual({
      value: 1,
      type: TimeUtils.format.YEAR,
    })
  })

  test('2 years', () => {
    const fromTime = 'Thu Oct 25 2018 00:00:00 GMT+0700 (Indochina Time)'
    const toTime = 'Sun Oct 25 2020 00:00:00 GMT+0700 (Indochina Time)'
    expect(TimeUtils.getRelativeTime(fromTime, toTime)).toEqual({
      value: 2,
      type: TimeUtils.format.X_YEARS,
    })
  })
})
