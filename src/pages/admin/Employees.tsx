import { PageContainer } from '../../components/common/PageContainer'
import { ComingSoonState } from '../../components/common/ComingSoonState'

export default function Employees() {
  return (
    <PageContainer
      title="Employees"
      description="View employee profiles and their work history."
    >
      <ComingSoonState
        title="Employee directory is on its way"
        description="Employee profiles, work history, and total hours will live here."
      />
    </PageContainer>
  )
}