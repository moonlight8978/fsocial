import moment from 'moment'

import { localHttp } from '../../services/http'

const PasswordSchema = {
  parse: user => ({
    current_password: user.currentPassword,
    password: user.password,
    password_confirmation: user.passwordConfirmation,
  }),
}

async function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

const ProfileSchema = {
  parse: async user => ({
    fullname: user.fullname,
    email: user.email,
    birthday: moment(user.birthday).format('YYYY-MM-DD'),
    description: user.description,
    gender: user.gender,
    avatar_base64: user.avatar && (await toBase64(user.avatar)),
    cover_base64: user.cover && (await toBase64(user.cover)),
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
  async updateProfile(user) {
    return localHttp.request({
      method: 'put',
      url: '/profile',
      data: { user: await ProfileSchema.parse(user) },
    })
  },
}

export default SettingsApi
