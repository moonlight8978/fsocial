module Posts
  class Destroy
    attr_reader :post

    def initialize(post)
      @post = post
    end

    def perform!
      ActiveRecord::Base.transaction do
        Activity.where(trackable: [post.replies, post]).destroy_all
        post.replies.destroy_all
        post.destroy
      end
    end
  end
end
