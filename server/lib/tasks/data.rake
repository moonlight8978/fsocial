namespace :data do
  desc 'Fix counter cache'
  task counter: :environment do
    puts 'Calculating counter cache...'

    ActiveRecord::Base.transaction do
      posts = []
      Post.all.includes(:sharings, :favorites, :replies, :sub_replies).find_each do |post|
        %i[sharings favorites replies sub_replies].each do |association|
          post.send("#{association}_count=", post.send(association).length)
        end
        posts << post
      end
      Post.import(
        posts,
        on_duplicate_key_update: %i[sharings favorites replies sub_replies].map do |association|
          "#{association}_count"
        end
      )
      puts 'Done'
    rescue StandardError => e
      Rails.logger.debug(e)
      puts 'Error occurred'
    end
  end
end
