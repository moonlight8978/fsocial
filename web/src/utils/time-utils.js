const formatTypes = {
  LESS_THAN_X_SECONDS: 'SECONDS',
  HALF_A_MINUTE: 'HALF_MINUTE',
  LESS_THAN_A_MINUTE: 'HALF_MINUTE',
  MINUTE: 'MINUTE',
  X_MINUTES: 'X_MINUTES',
  HOUR: 'HOUR',
  X_HOURS: 'X_HOURS',
  DAY: 'DAY',
  X_DAYS: 'X_DAYS',
  MONTH: 'MONTH',
  X_MONTHS: 'X_MONTHS',
  YEAR: 'YEAR',
  X_YEARS: 'X_YEARS',
}

const Distance = {
  parse: (value, type) => ({
    value,
    type,
  }),
}

export const TimeUtils = {
  format: formatTypes,

  getRelativeTimeFromNow(fromTime) {
    const now = new Date()
    this.getRelativeTime(fromTime, now)
  },

  getRelativeTime(fromTime, toTime) {
    const fromTimeInt = new Date(fromTime).getTime()
    const toTimeInt = new Date(toTime).getTime()

    const distanceInSeconds = Math.round((toTimeInt - fromTimeInt) / 1000)
    const distanceInMinutes = Math.round((toTimeInt - fromTimeInt) / 60000)
    const distanceInHours = Math.round((toTimeInt - fromTimeInt) / 3600000)
    const distanceInDays = Math.round((toTimeInt - fromTimeInt) / 86400000)
    const distanceInMonths = Math.round((toTimeInt - fromTimeInt) / 2592000000)
    const distanceInYears = Math.round((toTimeInt - fromTimeInt) / 31104000000)

    switch (true) {
      case distanceInMinutes < 2: {
        switch (true) {
          case distanceInSeconds < 10: {
            return Distance.parse(10, formatTypes.LESS_THAN_X_SECONDS)
          }
          case distanceInSeconds < 20: {
            return Distance.parse(20, formatTypes.LESS_THAN_X_SECONDS)
          }
          case distanceInSeconds < 39: {
            return Distance.parse(null, formatTypes.HALF_A_MINUTE)
          }
          case distanceInSeconds < 60: {
            return Distance.parse(null, formatTypes.LESS_THAN_A_MINUTE)
          }
          default: {
            return Distance.parse(distanceInMinutes, formatTypes.MINUTE)
          }
        }
      }
      case distanceInMinutes < 60: {
        return Distance.parse(distanceInMinutes, formatTypes.X_MINUTES)
      }
      case distanceInMinutes === 60: {
        return Distance.parse(1, formatTypes.HOUR)
      }
      // up to 42 hours
      case distanceInMinutes < 2520: {
        return Distance.parse(distanceInHours, formatTypes.X_HOURS)
      }
      // up to 60 days
      case distanceInMinutes < 86400: {
        return Distance.parse(distanceInDays, formatTypes.X_DAYS)
      }
      // up to 365 days
      case distanceInMinutes < 525600: {
        return Distance.parse(distanceInMonths, formatTypes.X_MONTHS)
      }
      // up do 18 months
      case distanceInMinutes < 788400: {
        return Distance.parse(1, formatTypes.YEAR)
      }
      default: {
        return Distance.parse(distanceInYears, formatTypes.X_YEARS)
      }
    }
  },
}
