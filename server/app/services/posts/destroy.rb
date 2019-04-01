module Posts
  class Destroy
    attr_reader :post

    def initialize(post)
      @post = post
    end

    def perform!
    end
  end
end
