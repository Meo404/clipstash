module Submissions
  class UpsertSubmissions < ApplicationService
    def initialize(submissions, media)
      @submissions = submissions
      @media = media
    end

    # Upserts Submissions and Media seperately
    #
    # The reason why they're seperated is that the activerecord-import gem can't handle
    # on_duplicate_key_ignore for recursive (e.g. has_one associations) imports. As we don't want to import the same
    # Medium over and over again nor want to create tons of errors, this was the way to go for now.
    def call
      import_submissions
      import_media
    end

    private
      # Upsert Submissions only
      def import_submissions
        # Necessary for friendlyId to work properly with mass importing
        @submissions = @submissions.uniq { |s| s.slug }

        Submission.import @submissions,
                          validate: true,
                          batch_size: 100,
                          on_duplicate_key_update: { conflict_target: [:reddit_fullname],
                                                    columns: [:comment_count, :over18, :score, :title] }
      end

      # Upserts Media only
      def import_media
        Medium.import @media,
                      validate: true,
                      batch_size: 100,
                      on_duplicate_key_ignore: true
      end
  end
end
