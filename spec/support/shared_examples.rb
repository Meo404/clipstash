RSpec.shared_examples "pagination examples" do
  it 'has pagination meta data' do
    body = JSON.parse(subject.body)
    expected_keys = %w(current_page next_page prev_page total_pages total_count)

    expect(body['meta'].keys).to eq(expected_keys)
  end
end

RSpec.shared_examples "result key length" do |key, size|
  it 'returns valid json' do
    body = JSON.parse(subject.body)
    expect(body[key.to_s].length).to eq(size)
  end
end