shared_examples 'create activity' do |count = 1|
  it 'create activity record' do
    expect { subject }.to change(Activity, :count).by(count)
  end
end
