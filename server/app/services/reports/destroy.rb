class Reports::Destroy
  attr_reader :reportable

  def initialize(reportable)
    @reportable = reportable
  end

  def perform!
    Report.where(reportable: reportable).destroy_all
    reportable.update(reports_count: 0)
  end
end
