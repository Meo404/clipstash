require "shrine"
require "shrine/storage/file_system"

if Rails.env.test?
  Shrine.storages = {
      cache: Shrine::Storage::FileSystem.new("spec", prefix: "support/uploads/cache"),       # cache
      store: Shrine::Storage::FileSystem.new("spec", prefix: "support/uploads/store"),       # permanent
  }
end

if Rails.env.development?
  Shrine.storages = {
      cache: Shrine::Storage::FileSystem.new("public", prefix: "uploads/cache"),       # cache
      store: Shrine::Storage::FileSystem.new("public", prefix: "uploads/store"),       # permanent
  }
end


Shrine.plugin :activerecord