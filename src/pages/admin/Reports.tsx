import { PageContainer } from '../../components/common/PageContainer'
import { ComingSoonState } from '../../components/common/ComingSoonState'

export default function Reports() {
  return (
    <PageContainer
      title="Reports and History"
      description="Review completed works and calculated earnings."
    >
      <ComingSoonState
        title="Reports are on their way"
        description="Completed-work summaries, durations, and earnings will live here."
      />
    </PageContainer>
  )
}