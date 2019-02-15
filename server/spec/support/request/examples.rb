shared_examples 'match response schema' do |schema|
  it 'response with correct schema' do
    subject
    expect(response).to match_response_schema(schema)
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

shared_examples 'validation error' do
  before { subject }

  it 'return status 422 Unprocessable Entity' do
    expect(response).to have_http_status(:unprocessable_entity)
  end

  it_behaves_like 'match response schema', 'validation_error'
end

shared_examples 'unauthorized' do
  before { subject }

  it 'return 403 forbidden' do
    expect(response).to have_http_status(:forbidden)
  end

  it_behaves_like 'match response schema', 'error'

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

  it_behaves_like 'match response schema', 'error'

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

  it_behaves_like 'match response schema', 'error'

  it 'return error message' do
    expected = { error: I18n.t('errors.application_controller/guest_only') }
    expect(response_body).to eq(expected.as_json)
  end
end

shared_examples 'correct data' do |expectation|
  before { subject }

  it 'response with correct data' do
    expected = instance_eval(&expectation)
    expect(response_body).to include(expected)
  end
end
