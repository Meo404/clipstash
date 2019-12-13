module UserHistory
  # Service class used to retrieve the users view history
  class FindSubmissions < ApplicationService
    def initialize(user_id, page, max_results)
      @user_id = user_id
      @page = page
      @max_results = max_results
    end

    def call
      retrieve_submissions
    end

    private

      attr_reader :user_id, :page, :max_results

      def retrieve_submissions
        submission_fullnames = Ahoy::Event
                                   .where(name: "submission_view", user_id: user_id)
                                   .order(time: :desc)
                                   .map { |event| event.properties["submission_fullname"] }
                                   .uniq

        # Order clause will preserve the order of the submission_fullnames array items using
        # the POSITION() function of postgres.
        Submission
            .where(reddit_fullname: submission_fullnames)
            .order(Arel.sql("position(reddit_fullname::text in '#{submission_fullnames.join(',')}')"))
            .page(page)
            .per(max_results)
      end
  end
end
