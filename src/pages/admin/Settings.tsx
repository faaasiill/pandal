import { PageContainer } from '../../components/common/PageContainer'
import { ComingSoonState } from '../../components/common/ComingSoonState'

export default function Settings() {
  return (
    <PageContainer
      title="Settings"
      description="Manage your admin account and preferences."
    >
      <ComingSoonState
        title="Settings are on their way"
        description="Account and preference controls will live here."
      />
    </PageContainer>
  )
}