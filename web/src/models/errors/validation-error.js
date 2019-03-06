// @flow
import { CaseConverter } from '../../utils/case-converter'

type Error = {
  [attribute: string]: string | Error,
}

export class ValidationError {
  data: Error

  constructor(errors: Error) {
    this.data = CaseConverter.camelize(errors)
  }
}
