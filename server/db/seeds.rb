def seed(model)
  puts "Seeding #{model}..."
  yield
  puts 'Done.'
end

def random_or_nothing(max)
  [0, rand(max)].sample
end

ActiveRecord::Base.transaction do
  seed :user do
    users = []

    users.push(
      User.new do |user|
        user.email = 'admin@sample.com'
        user.username = 'admin'
        user.fullname = 'Admin khoai to'
        user.password = '1111'
        user.role = :admin
      end
    )

    users.push(
      User.new do |user|
        user.email = 'user@sample.com'
        user.username = 'user'
        user.fullname = 'User dep zai'
        user.password = '1111'
      end
    )

    100.times do
      users.push(
        User.new do |user|
          username = "#{Faker::Internet.username}_#{SecureRandom.hex(8)}"
          user.email = "#{username}@sample.com"
          user.username = username
          user.fullname = "#{Faker::Football.player} #{SecureRandom.hex(8)}"
        end
      )
    end

    User.import(users, on_duplicate_key_ignore: true)
  end

  users = User.all

  seed :posts do
    posts = []

    users.each do |user|
      random_or_nothing(20).times do
        posts.push(
          Post.new do |post|
            post.creator_id = user.id
            post.content = Faker::Lorem.paragraph(2, true, 2)
          end
        )
      end
    end

    Post.import(posts, on_duplicate_key_ignore: true)
  end

  seed :replies do
    replies = []

    Post.where(root: nil).select(:id).each do |post|
      random_or_nothing(5).times do
        replies.push(
          Post.new do |reply|
            reply.root_id = post.id
            reply.creator_id = users.sample.id
            reply.content = Faker::Lorem.paragraph(2, true, 2)
          end
        )
      end
    end

    Post.import(replies, on_duplicate_key_ignore: true)
  end

  seed :sub_replies do
    sub_replies = []

    Post.where(parent: nil).where.not(root: nil).select(:id, :root_id).each do |reply|
      random_or_nothing(2) do
        sub_replies.push(
          Post.new do |sub_reply|
            sub_reply.root_id = reply.root_id
            sub_reply.parent_id = reply.id
            sub_reply.creator_id = users.sample.id
            sub_reply.content = Faker::Lorem.paragraph(2, true, 2)
          end
        )
      end
    end

    Post.import(sub_replies, on_duplicate_key_ignore: true)
  end

rescue StandardError => e
  puts e
  byebug
  raise ActiveRecord::Rollback
end
