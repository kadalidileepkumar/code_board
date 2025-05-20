import { createFileRoute } from '@tanstack/react-router'
import AddUserForm from '~/components/User/AddUser'
export const Route = createFileRoute('/users/add-user')({
  component: ()=><AddUserForm/>
})

