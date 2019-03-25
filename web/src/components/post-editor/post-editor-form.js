import { object, string } from 'yup'

export const defaultValues = {
  content: '',
  medias: [],
}

export const schema = intl =>
  object().shape({
    content: string().required(
      intl.formatMessage({
        id: 'schemas.post.content.errors.required',
      })
    ),
  })
