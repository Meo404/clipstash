module Submissions
  # Service Class to recalculate the HOT Scores for each submission
  # TODO: Check performance, there might be imrovement necessary when Submissions grow
  class UpdateHotScores < ApplicationService
    def call
      Submission.find_each do |submission|
        submission.update(hot_score: submission.calculate_hot_score)
      end
    end
  end
end
