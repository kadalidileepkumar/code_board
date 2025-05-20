import { useMutation } from '@tanstack/react-query';
import { fetcher, APIError } from '~/utils/helpers/fetch';
import { AddUserFormValues } from '~/components/an/CardWithAddUser';

export type UserApiPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  designation: string;
  dob: string | null;
  doj: string | null;
};

export function useCreateUserMutation() {
  return useMutation({
    mutationFn: async (data: AddUserFormValues) => {
      const formatted: UserApiPayload = {
        first_name: data.firstname,
        last_name: data.lastname,
        email: data.email,
        phone: data.mobile.startsWith("+91") ? data.mobile : `+91 ${data.mobile}`,
        designation: data.designation,
        dob: data.dob ? data.dob.toISOString() : null,
        doj: data.doj ? data.doj.toISOString() : null,
      };
      return fetcher('/users', {
        method: 'POST',
        body: formatted,
      });
    },
  });
}
