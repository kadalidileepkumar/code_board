import { useQuery } from '@tanstack/react-query'
import { getProfileAPI } from '~/http/services/profile'
import dayjs from 'dayjs'
import { useParams } from '@tanstack/react-router'
import { ViewProfile } from '../an/ViewProfile'

export function SingleProfile() {
  const { id } = useParams({ from :'/profile/$id' })

  const { isLoading, data, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getProfileAPI(id),
    enabled: !!id,
    retry: false,
  })

  if (isLoading) return <div>Loading...</div>

  if (error instanceof Error && error.message === 'User not found') {
    return <div className="text-red-500 text-lg font-medium">User not found</div>
  }

  if (error) {
    return <div className="text-red-500 text-lg font-medium">An error occurred</div>
  }

  const user = data?.data

  function capital(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const singleProfile = {
    name: `${capital(user?.first_name || '')} ${capital(user?.last_name || '')}`,
    email: user?.email,
    phone: user?.phone,
    designation: user?.designation,
    dob: dayjs(user?.dob).format('DD MMM YYYY'),
    doj: dayjs(user?.doj).format('DD MMM YYYY'),
    avatarUrl: 'https://github.com/shadcn.png',
    status: user?.is_active ? 'Active' : 'InActive',
  }

  return <ViewProfile {...singleProfile} />
}

