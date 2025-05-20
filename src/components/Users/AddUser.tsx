import * as React from "react";
import { format } from "date-fns";
import { CardWithAddUser, AddUserFormValues } from "../an/CardWithAddUser";
import { useCreateUserMutation } from "~/http/services/adduser";
import { toast } from "react-hot-toast";

const initialForm: AddUserFormValues = {
  firstname: "",
  lastname: "",
  email: "",
  mobile: "",
  designation: "",
  dateofbirth: "",
  dateofjoninig: "",
  dob: undefined,
  doj: undefined,
};

export default function AddUser() {
  const [values, setValues] = React.useState<AddUserFormValues>(initialForm);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);

  const mutation = useCreateUserMutation();

  const formatDate = (date?: Date) => (date ? format(date, "dd/MM/yyyy") : "");

  const handleChange = <K extends keyof AddUserFormValues>(
    field: K,
    value: AddUserFormValues[K]
  ) => {
    setValues((prev) => {
      let newVal = value;
      if (field === "mobile" && typeof value === "string") {
        newVal = value.replace(/[^\d]/g, "").slice(0, 10) as AddUserFormValues[K];
      }
      return { ...prev, [field]: newVal };
    });
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  };

  const handleCancel = () => {
    setValues(initialForm);
    setErrors({});
    setSubmitted(false);
  };
  const validate = (vals: AddUserFormValues) => {
    const errs: Record<string, string> = {};
    if (!vals.firstname.trim()) errs.firstname = "First name is required";
    if (!vals.lastname.trim()) errs.lastname = "Last name is required";
    if (!vals.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(vals.email)) {
      errs.email = "Invalid email";
    }
    if (!vals.mobile.trim()) {
      errs.mobile = "Mobile is required";
    } else if (!/^\d{10}$/.test(vals.mobile)) {
      errs.mobile = "Mobile must be 10 digits";
    }
    if (!vals.dob) errs.dateofbirth = "Date of birth is required";
    if (!vals.doj) errs.dateofjoninig = "Date of joining is required";
    if (!vals.designation.trim()) errs.designation = "Designation is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      mutation.mutate(values, {
        onSuccess: () => {
          toast.success("User added successfully!");
          setValues(initialForm);
          setSubmitted(false);
        },
        onError: (error: any) => {
          if (error?.fieldErrors) {
            setErrors(prev => ({ ...prev, ...error.fieldErrors }));
          } else {
            toast.error(error.message || "Failed to add user");
          }
        },
      });
    }
  };

  return (
    <CardWithAddUser
      values={{
        ...values,
        dateofbirth: formatDate(values.dob),
        dateofjoninig: formatDate(values.doj),
      }}
      onChange={handleChange}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      errors={errors}
      submitted={submitted}
      loading={mutation.isPending}
    />
  );
}






