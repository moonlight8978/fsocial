class StatisticsSerializer < ActiveModel::Serializer
  attributes(
    :followers_count,
    :followees_count,
    :posts_count,
    :shares_count,
    :favorites_count,
    :replies_count
  )
end
