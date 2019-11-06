require "shrine"

if Rails.env.production?
  require "shrine/storage/s3"

  s3_options = {
      access_key_id:     Rails.application.credentials[Rails.env.to_sym][:storage][:key],
      secret_access_key: Rails.application.credentials[Rails.env.to_sym][:storage][:secret],
      bucket:            Rails.application.credentials[Rails.env.to_sym][:storage][:bucket],
      region:            Rails.application.credentials[Rails.env.to_sym][:storage][:region],
      endpoint:          Rails.application.credentials[Rails.env.to_sym][:storage][:endpoint]
  }

  Shrine.storages = {
      cache: Shrine::Storage::S3.new(prefix: "cache", upload_options: { acl: "public-read" }, **s3_options),       # cache
      store: Shrine::Storage::S3.new(prefix: "store", upload_options: { acl: "public-read" }, **s3_options),       # permanent
  }
end

if Rails.env.development?
  require "shrine/storage/file_system"

  Shrine.storages = {
      cache: Shrine::Storage::FileSystem.new("public", prefix: "uploads/cache"),       # cache
      store: Shrine::Storage::FileSystem.new("public", prefix: "uploads/store"),       # permanent
  }
end

if Rails.env.test?
  require "shrine/storage/file_system"

  Shrine.storages = {
      cache: Shrine::Storage::FileSystem.new("spec", prefix: "support/uploads/cache"),       # cache
      store: Shrine::Storage::FileSystem.new("spec", prefix: "support/uploads/store"),       # permanent
  }
end


Shrine.plugin :activerecord