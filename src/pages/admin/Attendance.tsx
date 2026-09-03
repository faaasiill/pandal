import { PageContainer } from '../../components/common/PageContainer'
import { ComingSoonState } from '../../components/common/ComingSoonState'

export default function Attendance() {
  return (
    <PageContainer
      title="Attendance"
      description="Review and approve attendance requests for every event."
    >
      <ComingSoonState
        title="Attendance approvals are on their way"
        description="Attendance requests, approvals, and live status will live here."
      />
    </PageContainer>
  )
}