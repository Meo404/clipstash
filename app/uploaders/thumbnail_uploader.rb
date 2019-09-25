require "image_processing/mini_magick"

class ThumbnailUploader < Shrine
  plugin :determine_mime_type
  plugin :pretty_location
  plugin :processing
  plugin :remote_url, max_size: 20 * 1024 * 1024
  plugin :store_dimensions, analyzer: :mini_magick


  process(:store) do |io, context|
    io.download do |original|
      ImageProcessing::MiniMagick
          .source(original)
          .saver(quality: 92)
          .resize_to_limit(480, 360, sharpen: false)
          .call
    end
  end
end
