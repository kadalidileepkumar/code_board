import { createFileRoute } from '@tanstack/react-router'
import { SingleProfile } from '~/components/Profile/SingleProfile'

export const Route = createFileRoute('/profile/$id')({
  component: SingleProfile,
})

