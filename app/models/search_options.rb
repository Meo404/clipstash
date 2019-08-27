class SearchOptions
  # Top Sorting
  TOP_DAILY   = { limit: 100, sort: :top, time: :day }.freeze
  TOP_WEEKLY  = { limit: 100, sort: :top, time: :week }.freeze
  TOP_MONTHLY = { limit: 100, sort: :top, time: :month }.freeze
  TOP_YEARLY  = { limit: 100, sort: :top, time: :year }.freeze
  TOP_ALLTIME = { limit: 100, sort: :top, time: :all }.freeze
  # Hot Sorting
  HOT_DAILY   = { limit: 100, sort: :hot, time: :day }.freeze
  HOT_WEEKLY  = { limit: 100, sort: :hot, time: :week }.freeze
  HOT_MONTHLY = { limit: 100, sort: :hot, time: :month }.freeze
  HOT_YEARLY  = { limit: 100, sort: :hot, time: :year }.freeze
  HOT_ALLTIME = { limit: 100, sort: :hot, time: :all }.freeze
end
