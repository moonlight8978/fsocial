FactoryBot.define do
  factory :report_post, class: Report.name do
    reportable { create(:post) }
    reporter { create(:user) }
    message { Faker::Lorem.paragraph }
  end

  factory :report_user, class: Report.name do
    reportable { create(:user) }
    reporter { create(:user) }
    message { Faker::Lorem.paragraph }
  end
end
