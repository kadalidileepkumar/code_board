import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import AddCommits from '~/components/commits/AddCommits'

export const Route = createFileRoute('/commit/add-commits')({

  validateSearch: z.object({
    page_no: z.coerce.number().optional(),
    page_size: z.coerce.number().optional(),
  }),
  
  component: () => <AddCommits />
})
