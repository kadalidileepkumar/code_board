import { useQuery } from "@tanstack/react-query";
import React from "react";
import dayjs from "dayjs";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ProfileTable } from "../an/ProfileTable";
import { useNavigate, useSearch } from '@tanstack/react-router';
import { UserProfile, UsersApiResponse, FullProfile } from "~/lib/interfaces/types";
import { getUsersAPI } from "~/http/services/allprofiles";



export const columns: ColumnDef<UserProfile>[] = [

  {
    accessorKey: "full_name",
    header: () => <div>Full Name</div>,
    cell: ({ row }) => (
      <div className="text-(--an-table-body-text-color) pl-3">
        {row.getValue("full_name")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div>Email</div>,
    cell: ({ row }) => (
      <div className="text-(--an-table-body-number-color)">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: () => <div>Mobile</div>,
    cell: ({ row }) => (
      <div className="text-(--an-table-body-number-color)">
        {row.getValue("phone")}
      </div>
    ),
  },
  {
    accessorKey: "is_active",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const isActive = row.getValue("is_active") as boolean;
      return (
        <Button
          className={`rounded-lg font-normal text-white p-0 h-5 bg-white ${
            isActive
              ? "text-green-400 hover:bg-white"
              : "text-red-400 hover:bg-white"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </Button>
      );
    },
  },
  {
    accessorKey: "dob",
    header: () => <div>Date Of Birth</div>,
    cell: ({ row }) => (
      <div className="text-(--an-table-body-number-color)">
        {dayjs(row.getValue("dob")).format('DD-MMM-YYYY')}
      </div>
    ),
  },
  {
    accessorKey: "doj",
    header: () => <div>Date Of Joining</div>,
    cell: ({ row }) => (
      <div className="text-(--an-table-body-text-color)">
        {dayjs(row.getValue("doj")).format('DD-MMM-YYYY')}
      </div>
    ),
  },
  {
    accessorKey: "designation",
    header: () => <div>Designation</div>,
    cell: ({ row }) => (
      <div className="text-(--an-table-body-text-color)">
        {(row.getValue("designation"))}
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: () => <div>Created At</div>,
    cell: ({ row }) => (
      <div className="text-(--an-table-body-text-color)">
        {dayjs(row.getValue("created_at")).format('DD-MMM-YYYY')}
      </div>
    ),
  },
  {
    accessorKey: "updated_at",
    header: () => <div>Updated At</div>,
    cell: ({ row }) => (
      <div className="text-(--an-table-body-text-color)">
        {dayjs(row.getValue("updated_at")).format('DD-MMM-YYYY')}
      </div>
    ),
  },
];

export function UserList() {
const search = useSearch({ strict: false }) as Record<string, string | undefined>;
  const navigate = useNavigate();

  const initialPage = 1;
  const initialpage_size = 10;

  

  const page_no = Number(search.page_no) || initialPage;
  const page_size = Number(search.page_size) || initialpage_size;

  React.useEffect(() => {
    if (search.page_no == null || search.page_size == null) {
      navigate({
        search: {
          page_no: search.page_no == null ? initialPage : search.page_no,
          page_size: search.page_size == null ? initialpage_size : search.page_size,
          ...search,
        },
        replace: true,
      });
    }
  }, [search.page_no, search.page_size, navigate, search, initialPage, initialpage_size]);

  const { data, isLoading, isError } = useQuery<UsersApiResponse>({
    queryKey: ['users', page_no, page_size],
    queryFn: () => getUsersAPI(page_no, page_size),
    enabled: search.page_no != null && search.page_size != null,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data || !data.data || !Array.isArray(data.data.data)) {
    return <div>Error fetching users or no data available.</div>;
  }

  const users = data.data.data.map(user => ({
    ...user,
    full_name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    phone: user.phone,

    dob: user.dob,
    doj: user.doj,
    designation: user.designation,
    created_at: user.created_at,
    updated_at: user.updated_at,
    
  }));

  const paginationDetails = {
    page: data.data.current_page,
    total_pages: data.data.totalPages,
    total: data.data.total_records,
    page_size: page_size,
  };

  return (
    <ProfileTable
      data={users}
      columns={columns}
      paginationDetails={paginationDetails}
      getData={(params: { page?: number; page_size?: number }) => {
        navigate({
          search: (prevSearch) => ({
            ...prevSearch,
            page_no: params.page !== undefined ? params.page : page_no,
            page_size: params.page_size !== undefined ? params.page_size : page_size
          }),
        });
      }}
    />
  );
}