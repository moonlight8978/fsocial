shared_examples 'does not change db' do |klass|
  it "does not change #{klass.name}" do
    expect do
      subject
    rescue StandardError
      nil
    end .not_to change(klass, :count)
  end
end

shared_examples 'change db' do |klass, count = 1|
  it "create #{klass.name} record" do
    expect do
      subject
    rescue StandardError
      nil
    end .to change(klass, :count).by(count)
  end
end

shared_examples 'create activity' do |count = 1|
  include_examples 'change db', Activity, count
end

shared_examples 'does not create activity' do
  it 'create activity record' do
    expect do
      subject
    rescue StandardError
      nil
    end .not_to change(Activity, :count)
  end
end

shared_examples 'enqueue job' do |job|
  it "enqueue #{job.name.humanize}" do
    expect { subject }.to have_enqueued_job(job)
  end
end