require_relative '../support/common/helpers'

class FactoryHelpers
  extend ::ActiveStorageHelpers

  class << self
    def create_blob(filename: 'hong.jpg')
      memory = Memory.new
      memory.picture.attach(io: get_attachment(filename: filename), filename: filename)
      memory.picture.blob
    end
  end
end
