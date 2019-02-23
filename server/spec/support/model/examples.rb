shared_examples 'raise error' do |exception, *params|
  it "raise #{exception.name}" do
    expect { subject }.to raise_error(exception, *params)
  end
end

shared_examples 'does not raise error' do
  it 'does not raise any error' do
    expect { subject }.not_to raise_error
  end
end
