module Memories
  class Create
    attr_reader :params

    def initialize(params)
      @params = params
    end

    def perform!
      blob = params.delete(:blob)
      memory_taggings_attributes = params.delete(:memory_taggings)

      ActiveRecord::Base.transaction do
        Memory.new do |memory|
          memory.assign_attributes(params)
          memory.picture.attach(blob)
          memory.save!
          MemoryTagging.where(blob: blob).update_all(memory_id: memory.id)

          memory_taggings_attributes.each do |memory_tagging_attributes|
            id, description = memory_tagging_attributes.values_at(:id, :description)
            MemoryTagging.find_by(blob: blob, id: id)&.update(description: description)
          end
        end
      end
    end
  end
end
