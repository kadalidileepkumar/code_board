import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CardWithAddUser } from "../an/AddCommits";
import { CommitFormData } from "~/lib/interfaces/types";
import { createCommitAPI } from "~/http/services/addcommit";

type SelectOption = {
  label: string;
  value: string;
};

export default function AddCommits() {

  const [formData, setFormData] = useState<CommitFormData>({
    project: "",
    date: undefined,
    lines: "",
    commit: "",
    commitname: "",
    name: "",
  });

  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<keyof CommitFormData, string>>
  >({});

  const projectOptions: SelectOption[] = [
    { label: "Project A", value: "project-a" },
    { label: "Project B", value: "project-b" },
    { label: "Project C", value: "project-c" },
  ];

  const mutation = useMutation({
    mutationFn: (data: CommitFormData) => createCommitAPI(data),
    onSuccess: (data) => {
      console.log("API Response:", data);

      setFormData({
        project: "",
        date: undefined,
        lines: "",
        commit: "",
        commitname: "",
        name: "",
      });
      setValidationErrors({});
    },
    onError: (error: any) => {
      console.error("API Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    },
  });

  const handleValueChange = (field: keyof CommitFormData, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [field]: undefined,
    }));
  };

  const validateForm = (data: CommitFormData) => {
    const errors: Partial<Record<keyof CommitFormData, string>> = {};
    if (!data.project) errors.project = "Project is required.";
    if (!data.date) errors.date = "Date is required.";
    if (!/^\d+$/.test(data.lines)) {
      errors.lines = "Lines must be a positive number.";
    }
    if (!data.commit) {
      errors.commit = "Commit link is required.";
    } else {
      const urlPattern =
        /^(https?:\/\/)[\w.-]+(?:\.[\w\.-]+)+(?:[\w\-\._~:/?#[\]@!$&'()*+,;=]+)?$/;
      if (!urlPattern.test(data.commit)) {
        errors.commit = "Please enter a valid URL.";
      }
    }
    if (!data.commitname) errors.commitname = "Commit name is required.";
    if (!data.name) errors.name = "Name is required.";
    return errors;
  };

  const handleSubmit = async (data: CommitFormData) => {
    console.log("Form submitted with data:", data);
    const errors = validateForm(data);

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      console.log("Validation errors:", errors);
      return;
    }

    mutation.mutate(data);
  };

  return (
    <CardWithAddUser
      values={formData}
      onValueChange={handleValueChange}
      onSubmit={handleSubmit}
      selectOptions={projectOptions}
      errors={validationErrors}
    />
  );
}


