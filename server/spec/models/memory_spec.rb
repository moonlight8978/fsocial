require 'rails_helper'

RSpec.describe Memory, type: :model do
  let(:trump) do
    File.open(Rails.root.join("tmp", "trump.jpg"))
  end
  let(:un_trump) do
    File.open(Rails.root.join("tmp", "un-trump.jpg"))
  end

  it do
    vision_api = Google::VisionApi.new
    vision_api.detect_faces(un_trump)
  end
end
