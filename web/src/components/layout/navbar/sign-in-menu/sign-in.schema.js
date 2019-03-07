import * as yup from 'yup'

export const SignInSchema = intl =>
  yup.object().shape({
    identity: yup()
      .string(intl.formatMessage())
      .required(),
    password: yup()
      .string()
      .required(),
  })
