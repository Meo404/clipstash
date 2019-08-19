class SubredditSerializer < ActiveModel::Serializer
  attributes :reddit_fullname,
             :display_name,
             :display_name_prefixed,
             :public_description,
             :subscribers,
             :icon_image,
             :icon_size,
             :banner_image,
             :banner_size,
             :url
end
