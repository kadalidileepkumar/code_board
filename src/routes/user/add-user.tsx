import { createFileRoute } from '@tanstack/react-router'
import AddUserForm from '~/components/User/AddUser'
export const Route = createFileRoute('/user/add-user')({
  component: ()=><AddUserForm/>
})

