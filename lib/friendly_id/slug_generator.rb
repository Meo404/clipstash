# Monkey Patch for the FriendlyId Gems Slug Generator
#
# Modified method available?(slug):
#   This will not individually check slugs for their availability anymore.
#   Reason is that we ensure uniqueness on the model already, thus there is no need for it. This drastically improves
#   performance when importing submissions.
module FriendlyId
  class SlugGenerator

    def initialize(scope, config)
      @scope = scope
      @config = config
    end

    def available?(slug)
      if @config.uses?(::FriendlyId::Reserved) && @config.reserved_words.present? && @config.treat_reserved_as_conflict
        return false if @config.reserved_words.include?(slug)
      end

      true
    end

    def generate(candidates)
      candidates.each {|c| return c if available?(c)}
      nil
    end

  end
end