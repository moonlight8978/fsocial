import { ValidationError } from './validation-error'

test('transform error keys received from api to camelcase', () => {
  const apiErrors = {
    email: ["can't be blank"],
    password_confirmation: ["can't be blank"],
  }
  const { data } = new ValidationError(apiErrors)
  expect(data).toEqual({
    email: ["can't be blank"],
    passwordConfirmation: ["can't be blank"],
  })
})
