import { object, string, array } from 'yup'

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
      object().shape({
        type: string().matches(
          /jpg|png|jpeg/,
          intl.formatMessage({
            id: 'schemas.post.medias.errors.invalidMime',
          })
        ),
      })
    ),
  })
