export interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dob: Date | null;
  doj: Date | null;
  designation: string;
}

export interface UserFormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  dob?: string;
  doj?: string;
  designation?: string;
}