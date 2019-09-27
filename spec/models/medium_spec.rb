# == Schema Information
#
# Table name: media
#
#  id                  :bigint           not null, primary key
#  author              :string
#  author_url          :string
#  embed_url           :string
#  size                :integer          is an Array
#  submission_fullname :string
#  thumbnail           :string
#  thumbnail_size      :integer          is an Array
#  title               :string
#  url                 :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  external_id         :string
#  media_provider_id   :bigint
#
# Indexes
#
#  index_media_on_media_provider_id    (media_provider_id)
#  index_media_on_submission_fullname  (submission_fullname) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (media_provider_id => media_providers.id)
#

require 'rails_helper'

describe Medium do

  it { should belong_to(:submission).optional }
  it { should belong_to(:media_provider) }

  describe 'validations' do

    subject { build :medium }

    context 'when was created' do
      it { should validate_presence_of(:external_id) }
      it { should validate_presence_of(:size) }
      it { should validate_presence_of(:url) }
      it { should validate_presence_of(:embed_url) }
      it { should validate_url_of(:url) }
      it { should validate_url_of(:embed_url) }
    end

    context 'when media provider has author_url' do
      before { allow(subject).to receive(:author_url?).and_return(true) }
      it { is_expected.to validate_url_of(:author_url) }
    end

    context 'when media provider has thumbnail' do
      before { allow(subject).to receive(:thumbnail?).and_return(true) }
      it { is_expected.to validate_url_of(:thumbnail) }
    end
  end
end
