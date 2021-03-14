require "date"

module Submissions
  # Calculates the reddit hot score
  # Taken from https://gist.github.com/jrochkind/2636355
  class CalculateHotScore < ApplicationService
    EPOCH = Time.local(1960, 12, 8, 7, 46, 43).to_time.freeze

    def initialize(created_at, score)
      @created_at = created_at
      @score = score
    end

    def call
      calculate_score
    end

    private

    def calculate_score
      displacement = Math.log([@score.abs, 1].max, 10)
      sign = sign_value(@score)

      (displacement * sign.to_f) + (epoch_seconds(@created_at) / 45000)
    end

    def epoch_seconds(t)
      (t.to_i - EPOCH.to_i).to_f
    end

    def sign_value(score)
      if score > 0
        1
      elsif score < 0
        -1
      else
        0
      end
    end
  end
end
