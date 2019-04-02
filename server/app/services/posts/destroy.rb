module Posts
  class Destroy
    attr_reader :post

    def initialize(post)
      @post = post
    end

    def perform!
      ActiveRecord::Base.transaction do
        destroy!
        post.replies.destroy_all
        post.destroy
      end
    end

    def destroy!
      if post.root?
        Activity.where(trackable: [*post.replies, post]).destroy_all
        post.replies.destroy_all
      elsif post.root_reply?
        Activity.where(trackable: [*post.sub_replies, post]).destroy_all
        post.sub_replies.destroy_all
      else
        Activity.where(trackable: post).destroy_all
      end
    end
  end
end
