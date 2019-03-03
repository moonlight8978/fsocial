import { CaseConverter } from '../../utils/case-converter'

export class ValidationError {
  constructor(errors) {
    this.data = CaseConverter.camelize(errors)
  }
}
