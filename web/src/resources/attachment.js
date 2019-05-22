import { settings } from '../config'

export const AttachmentResource = {
  parse: attachment => ({
    filename: attachment.filename,
    url: `${settings.server.host}${attachment.path}`,
    path: attachment.path,
    metadata: {
      width: attachment.metadata.width,
      height: attachment.metadata.height,
    },
  }),
}
