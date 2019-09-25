class DefaultImageUploader < Shrine
  plugin :determine_mime_type
  plugin :pretty_location
  plugin :remote_url, max_size: 20 * 1024 * 1024
  plugin :store_dimensions, analyzer: :mini_magick
end
