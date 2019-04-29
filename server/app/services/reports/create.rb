class Reports::Create
  class AlreadyReported < StandardError; end

  attr_reader :reportable, :reporter, :message

  def initialize(reportable, reporter:, message: nil)
    @reportable = reportable
    @reporter = reporter
    @message = message
  end

  def perform!
    raise AlreadyReported if Report.exists?(reportable: reportable, reporter: reporter)

    Report.create!(reportable: reportable, reporter: reporter, message: message)
  end
end
