module Posts
  class CreateHashtags
    attr_reader :post

    def initialize(post)
      @post = post
    end

    def perform
      extracter = ::Twitter::TextExtractor.new
      hashtags = extracter.extract_hashtags(post.content).uniq
      hashtags.each do |name|
        hashtag = Hashtag.find_by(name: name) || Hashtag.create(name: name, creator: post.creator)
        Tagging.create(hashtag: hashtag, post: post)
      end
    end
  end
end
