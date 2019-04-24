import moment from 'moment'

import { localHttp } from '../../services/http'

const PasswordSchema = {
  parse: user => ({
    current_password: user.currentPassword,
    password: user.password,
    password_confirmation: user.passwordConfirmation,
  }),
}

const ProfileSchema = {
  parse: user => ({
    fullname: user.fullname,
    email: user.email,
    birthday: moment(user.birthday).format('YYYY-MM-DD'),
    description: user.description,
    gender: user.gender,
  }),
}

const SettingsApi = {
  updatePassword(user) {
    return localHttp.request({
      method: 'put',
      url: '/profile/password',
      data: { user: PasswordSchema.parse(user) },
    })
  },
  updateProfile(user) {
    return localHttp.request({
      method: 'put',
      url: '/profile',
      data: { user: ProfileSchema.parse(user) },
    })
  },
}

export default SettingsApi
