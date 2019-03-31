shared_examples 'response with status' do |status|
  it "response with status #{status}" do
    subject
    expect(response).to have_http_status(status)
  end
end

shared_examples 'match response schema' do |schema|
  it "response with #{schema} schema" do
    subject
    expect(response).to match_response_schema(schema)
  end
end

shared_examples 'response with error message' do |message|
  it 'respone with error message' do
    subject
    expected = { error: message }
    expect(response_body).to eq(expected.as_json)
  end
end

shared_examples 'response with empty body' do
  it 'response with empty body' do
    subject
    expect(response.body).to eq('')
  end
end

shared_examples 'no content' do
  include_examples 'response with status', :no_content

  include_examples 'response with empty body'
end

shared_examples 'success' do
  include_examples 'response with status', :ok
end

shared_examples 'created' do
  include_examples 'response with status', :created
end

shared_examples 'missing params' do
  include_examples 'response with status', :bad_request
  include_examples 'match response schema', 'error'
end

shared_examples 'bad request' do |message|
  include_examples 'response with status', :bad_request
  include_examples 'match response schema', 'error'
  include_examples 'response with error message', message
end

shared_examples 'validation error' do
  include_examples 'response with status', :unprocessable_entity
  include_examples 'match response schema', 'validation_error'
end

shared_examples 'unauthorized' do
  include_examples 'response with status', :forbidden
  include_examples 'match response schema', 'error'
  include_examples 'response with error message', I18n.t('errors.pundit/not_authorized_error')
end

shared_examples 'not found' do
  include_examples 'response with status', :not_found
  include_examples 'match response schema', 'error'
end

shared_examples 'unauthenticated' do
  include_examples 'response with status', :unauthorized
  include_examples 'match response schema', 'error'
  include_examples 'response with error message', I18n.t('errors.application_controller/unauthenticated')
end

shared_examples 'guest only' do
  include_examples 'response with status', :forbidden
  include_examples 'match response schema', 'error'
  include_examples 'response with error message', I18n.t('errors.application_controller/guest_only')
end

shared_examples 'accept request' do
  it 'accept request' do
    subject
    expect(response.status).to be < 400
  end
end

shared_examples 'accept all requests' do
  context 'when guest' do
    let(:token) { '' }

    include_examples 'accept request'
  end

  context 'when user' do
    let(:token) { Users::TokenGenerator.new(create(:user)).perform }

    include_examples 'accept request'
  end

  context 'when admin' do
    let(:token) { Users::TokenGenerator.new(create(:user, :admin)).perform }

    include_examples 'accept request'
  end
end

shared_examples 'correct data' do |expectation|
  it 'response with correct data' do
    subject
    expect(response_body).to(instance_eval(&expectation))
  end
end

shared_examples 'deleted' do
  include_examples 'no content'
end

shared_examples 'updated success' do
  include_examples 'success'
end

shared_examples 'updated without changes' do
  include_examples 'response with status', :not_modified
end
