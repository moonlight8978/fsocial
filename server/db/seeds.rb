def seed(model, counting)
  puts "Seeding #{model}..."
  yield
  puts "Done. #{counting.call} records has been imported."
end

def random_or_nothing(max)
  [0, rand(max)].sample
end

ActiveRecord::Base.transaction do
  seed(:user, proc { User.count }) do
    users = []

    users.push(
      User.new do |user|
        user.email = 'assmin@sample.com'
        user.username = 'assmin'
        user.fullname = 'Assmin khoai to'
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
          user.password = '1111'
        end
      )
    end

    users.each do |user|
      user.username = user.username.tr('.', '_')
    end

    User.import(users, on_duplicate_key_ignore: true)
  end

  users = User.all.select(:id)

  seed(:following, proc { Following.count }) do
    followings = []
    activities = []

    users.each do |user|
      followees = Array.new(rand(15)).map { users.sample }
        .reject { |followee| followee.id == user.id }
        .uniq(&:id)
      followees.each do |followee|
        followings.push(
          Following.new do |following|
            following.follower_id = user.id
            following.followee_id = followee.id
          end
        )
        activities.push(
          Activity.new do |activity|
            activity.owner_id = user.id
            activity.key = 'following.create'
            activity.recipient_id = followee.id
          end
        )
      end
    end

    Following.import(followings, on_duplicate_key_ignore: true)
    Activity.import(activities, on_duplicate_key_ignore: true)
  end

  seed(:posts, proc { Post.where(root: nil, parent_id: nil).count }) do
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

  seed('activities#post', proc { Activity.where(key: 'post.create').count }) do
    activities = []

    Post.where(root: nil, parent_id: nil).select(:id, :creator_id).find_each do |post|
      activities.push(
        Activity.new do |activity|
          activity.trackable_id = post.id
          activity.trackable_type = Post.name
          activity.owner_id = post.creator_id
          activity.key = 'post.create'
        end
      )
    end

    Activity.import(activities, on_duplicate_key_ignore: true)
  end

  seed(:replies, proc { Post.where(parent: nil).where.not(root: nil).count }) do
    replies = []

    Post.where(root: nil).select(:id).find_each do |post|
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

  seed(:sub_replies, proc { Post.where.not(root: nil, parent: nil).count }) do
    sub_replies = []

    Post.where(parent: nil).where.not(root: nil).select(:id, :root_id).find_each do |reply|
      random_or_nothing(5).times do
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

  seed(:sharings, proc { Sharing.count }) do
    sharings = []

    Post.where(parent: nil, root: nil).select(:id, :creator_id).each do |post|
      Array.new(random_or_nothing(10)) { users.sample }.map do |user|
        sharing = Sharing.new(creator_id: user.id, post_id: post.id)
        sharings.push(sharing)
      end
    end

    Post.where.not(root: nil).where(parent_id: nil).select(:id, :creator_id).find_each do |reply|
      Array.new(random_or_nothing(10)) { users.sample }.map do |user|
        sharing = Sharing.new(creator_id: user.id, post_id: reply.id)
        sharings.push(sharing)
      end
    end

    Sharing.import(sharings, on_duplicate_key_ignore: true)
  end

  seed('activities#sharing', proc { Activity.where(key: 'sharing.create').count }) do
    activities = []

    Sharing.includes(:post).all.find_each do |sharing|
      activities.push(
        Activity.new do |activity|
          activity.owner_id = sharing.creator_id
          activity.trackable = sharing
          activity.recipient_id = sharing.post.creator_id
          activity.key = 'sharing.create'
        end
      )
    end

    Activity.import(activities, on_duplicate_key_ignore: true)
  end

  seed(:favorites, proc { Favorite.count }) do
    favorites = []

    Post.select(:id, :creator_id).find_each do |post|
      Array.new(random_or_nothing(10)) { users.sample }.uniq(&:id).map do |user|
        favorite = Favorite.new(creator_id: user.id, post_id: post.id)
        favorites.push(favorite)
      end
    end

    Favorite.import(favorites, on_duplicate_key_ignore: true)
  end

  seed('activities#sharing', proc { Activity.where(key: 'sharing.create').count }) do
    activities = []

    Favorite.includes(:post).where(posts: { parent_id: nil, root_id: nil }).all.find_each do |favorite|
      activities.push(
        Activity.new do |activity|
          activity.owner_id = favorite.creator_id
          activity.trackable = favorite
          activity.recipient_id = favorite.post.creator_id
          activity.key = 'favorite.create'
        end
      )
    end

    Activity.import(activities, on_duplicate_key_ignore: true)
  end

  seed('hashtags', proc { Hashtag.count }) do
    hashtags = []

    100.times do |i|
      hashtags << Hashtag.new(name: "#{Faker::Lorem.word}_#{i}")
    end

    Hashtag.import(hashtags, on_duplicate_key_ignore: true)
  end

  seed('taggings', proc { Tagging.count }) do
    posts = []
    taggings = []

    hashtags = Hashtag.all.to_a

    Post.root.each do |post|
      tagged_hashtags = Array.new(random_or_nothing(5)) { hashtags.sample }.uniq(&:id)
      next if tagged_hashtags.empty?

      post.content = [
        post.content,
        tagged_hashtags.map { |hashtag| "##{hashtag.name}" }.join(' ')
      ].join(' ')
      posts << post
      tagged_hashtags.each do |hashtag|
        hashtag.creator ||= post.creator
        taggings << Tagging.new(post: post, hashtag: hashtag)
      end
    end

    Post.import(posts, on_duplicate_key_update: [:content])
    Tagging.import(taggings, on_duplicate_key_ignore: true)
    Hashtag.import(hashtags, on_duplicate_key_update: [:creator_id])
  end

  seed('reports', proc { Report.where(reportable_type: Post.name).count }) do
    reports = []

    Post.find_each do |post|
      reporters = Array.new(random_or_nothing(5)) { users.sample }.uniq(&:id)
      reporters.each do |reporter|
        reports << Report.new(
          reportable: post,
          reporter: reporter
        )
      end
    end

    Report.import(reports, on_duplicate_key_ignore: true)
  end
rescue StandardError => e
  puts e
  raise ActiveRecord::Rollback
end
