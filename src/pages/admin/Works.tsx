import { PageContainer } from '../../components/common/PageContainer'
import { ComingSoonState } from '../../components/common/ComingSoonState'

export default function Works() {
  return (
    <PageContainer
      title="Work / Events"
      description="Create and manage catering events, seats, and rates."
    >
      <ComingSoonState
        title="Work management is on its way"
        description="Creating events, tracking seats, and setting hourly rates will live here."
      />
    </PageContainer>
  )
}