module RequestHelpers
  def response_body
    JSON.parse(response.body).with_indifferent_access
  end

  def serialize(object, serializer)
    ActiveModelSerializers::SerializableResource.new(object, serializer: serializer).as_json
  end
end

shared_examples 'unauthorized' do
  before { subject }

  it 'return 403 forbidden' do
    expect(response).to have_http_status(:forbidden)
  end

  it 'return error message' do
    expected = { error: I18n.t('errors.pundit/not_authorized_error') }
    expect(response_body).to eq(expected.as_json)
  end
end

shared_examples 'unauthenticated' do
  before { subject }

  it 'return 401 unauthorized' do
    expect(response).to have_http_status(:unauthorized)
  end

  it 'return error message' do
    expected = { error: I18n.t('errors.application_controller/unauthenticated') }
    expect(response_body).to eq(expected.as_json)
  end
end

shared_examples 'guest only' do
  before { subject }

  it 'return 403 forbidden' do
    expect(response).to have_http_status(:forbidden)
  end

  it 'return error message' do
    expected = { error: I18n.t('errors.application_controller/guest_only') }
    expect(response_body).to eq(expected.as_json)
  end
end

shared_examples 'success' do
  it 'return 200 success' do
    subject
    expect(response).to have_http_status(:ok)
  end
end

shared_examples 'created' do
  it 'return 201 created' do
    subject
    expect(response).to have_http_status(:created)
  end
end

shared_examples 'validation errors' do
  it 'return status 422 Unprocessable Entity' do
    expect(response).to have_http_status(:unprocessable_entity)
  end
end
