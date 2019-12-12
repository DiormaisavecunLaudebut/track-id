class FoundTrackJob < ApplicationJob
  queue_as :default

  def perform(*args)
    puts "job is performing"
    sleep(2)
    puts "job done"
  end
end
