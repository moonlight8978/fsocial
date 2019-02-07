module RequestHelpers
  def response_body
    JSON.parse(response.body).with_indifferent_access
  end
end

RSpec.shared_examples 'unauthorized' do
  before { subject }

  it 'return 403 forbidden' do
    expect(response).to have_http_status(:forbidden)
  end

  it 'does not allow request' do
    expected = { error: I18n.t('errors.pundit/not_authorized_error') }
    expect(response_body).to eq(expected)
  end
end

RSpec.shared_examples 'unauthenticated' do
  before { subject }

  it 'return 401 unauthorized' do
    expect(response).to have_http_status(:unauthorized)
  end

  it 'does not allow request' do
    expected = { error: I18n.t('errors.application_controller/unauthenticated') }
    expect(response_body).to eq(expected)
  end
end

RSpec.shared_examples 'success' do
  it 'return 200 success' do
    subject
    expect(response).to have_http_status(:ok)
  end
end

RSpec.shared_examples 'created' do
  it 'return 201 created' do
    subject
    expect(response).to have_http_status(:created)
  end
end
