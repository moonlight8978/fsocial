import { object, string, array, mixed } from 'yup'

export const defaultValues = {
  content: '',
  medias: [],
}

export const allowedMimeTypes = ['.jpg', '.jpeg', '.png']

export const schema = intl =>
  object().shape({
    content: string().required(
      intl.formatMessage({
        id: 'schemas.post.content.errors.required',
      })
    ),
    medias: array().of(
      mixed().test(
        'mime',
        intl.formatMessage({
          id: 'schemas.post.medias.errors.invalidMime',
        }),
        value => value.type.match(/jpg|png|jpeg/)
      )
    ),
  })
