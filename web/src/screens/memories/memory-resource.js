import { AttachmentResource } from '../../resources/attachment'
import { UserResource } from '../../resources/user'

const Point = {
  parse: point => ({ x: point.x, y: point.y }),
}

const MemoryTagging = {
  parse: tagging => ({
    id: tagging.id,
    vertices: tagging.vertices.map(point => Point.parse(point)),
    description: tagging.description,
    blobId: tagging.blob_id,
  }),
}

const Memory = {
  parse: memory => ({
    id: memory.id,
    picture: AttachmentResource.parse(memory.picture),
    creator: UserResource.ProfileOverall.parse(memory.creator),
    content: memory.content,
    createdAt: new Date(memory.created_at),
    memoryTaggings: memory.memory_taggings.map(tagging =>
      MemoryTagging.parse(tagging)
    ),
  }),
}

const Memories = {
  parse: memories => memories.map(memory => Memory.parse(memory)),
}

const MemoryPicture = {
  parse: picture => ({
    ...AttachmentResource.parse(picture),
    signedBlobId: picture.signed_id,
    memoryTaggings: picture.memory_taggings.map(tagging =>
      MemoryTagging.parse(tagging)
    ),
  }),
}

const MemoryResource = {
  Memories,
  Memory,
  MemoryPicture,
}

export default MemoryResource
