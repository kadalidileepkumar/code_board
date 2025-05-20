import { createFileRoute } from '@tanstack/react-router'


import CommitsList from '~/components/commits/CommitsList'

export const Route = createFileRoute('/commit/get-commit')({
  component: () => <CommitsList /> 
 
})
