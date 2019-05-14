VCR.configure do |config|
  config.cassette_library_dir = 'spec/factories/cassettes'
  config.hook_into :webmock
end

# RSpec.configure do |config|
#   config.around(:each, type: :request) do |example|
#     host! "yourapp.hostname"
#     name = example.full_description.gsub /[^\w\-]/, '_'
#     VCR.use_cassette(name, record: :all) do
#       example.run
#     end
#   end
# end
