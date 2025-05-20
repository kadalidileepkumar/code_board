import React from "react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate, useSearch } from '@tanstack/react-router';

import { Commit } from "~/lib/interfaces/types";
import { getCommitsApi } from "~/http/services/commits";
import { ProfileTable } from "../an/ProfileTable";

export const columns: ColumnDef<Commit>[] = [
  {
    accessorKey: "project_name",
    header: () => <div>Project Name</div>,
    cell: ({ row }) => <div>{row.getValue("project_name")}</div>,
  },
    {
    accessorKey: "user_first_name",
    header: () => <div>Developer Name</div>,
    cell: ({ row }) => <div>{row.getValue("user_first_name")}</div>,
  },
  {
    accessorKey: "created_at",
    header: () => <div>Date</div>,
    cell: ({ row }) => (
      <div>{dayjs(row.getValue("created_at")).format("DD-MMM-YYYY")}</div>
    ),
  },
  {
    accessorKey: "created_at_time",
    header: () => <div>Time</div>,
    cell: ({ row }) => (
      <div>{dayjs(row.original.created_at).format("HH:mm")}</div>
    ),
  },
  {
    accessorKey: "line_of_codes",
    header: () => <div>Lines of Code</div>,
    cell: ({ row }) => <div>{row.getValue("line_of_codes")}</div>,
  },
  {
    accessorKey: "commit_link",
    header: () => <div>Link</div>,
    cell: ({ row }) => {
      const link = row.getValue("commit_link");
      try {
        new URL(link);
        return (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Commit
          </a>
        );
      } catch {
        return <div>{link || "N/A"}</div>;
      }
    },
  },
  {
    accessorKey: "commit_message",
    header: () => <div>Commit Message</div>,
    cell: ({ row }) => (
      <div className="max-w-xs truncate">
        {row.getValue("commit_message")}
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: () => <div>Action</div>,
    cell: () => (
      <div className="text-blue-500 cursor-pointer">Action</div>
    ),
  },
];
interface CommitsApiResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    total_records: string;
    page: number;
    page_size: number;
    totalPages: number;
    next_page: number | null;
    prev_page: number | null;
    data: Commit[];
  };
}

interface SearchParams {
  page_no?: string;
  page_size?: string;
  [key: string]: string | undefined;
}

function CommitsList() {
  const search = useSearch({ strict: false }) as SearchParams;
  const navigate = useNavigate();

  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 10;

  const page_no = Number(search.page_no) || DEFAULT_PAGE;
  const page_size = Number(search.page_size) || DEFAULT_PAGE_SIZE;

  React.useEffect(() => {
    if (search.page_no == null || search.page_size == null) {
      navigate({
        search: (prev: any) => ({
          ...prev,
          page_no: search.page_no == null ? DEFAULT_PAGE : Number(search.page_no),
          page_size: search.page_size == null ? DEFAULT_PAGE_SIZE : Number(search.page_size),
        }),
        replace: true,
      });
    }
  }, [search.page_no, search.page_size, navigate]);
const { data, isError } = useQuery<CommitsApiResponse>({
  queryKey: ['commits', page_no, page_size],
  queryFn: () => getCommitsApi(page_no, page_size),
  enabled: search.page_no != null && search.page_size != null,
});




if (isError || !data?.data?.data || !Array.isArray(data.data.data)) {
  return <div>Error fetching commits or no data available.</div>;
}



const commits = data.data.data.map(commit => ({
  
  ...commit,
  
  created_at_time: commit.created_at,
}));

const paginationDetails = {
  page: data.data.page,
  total_pages: data.data.totalPages,
  total: Number(data.data.total_records),
  page_size: data.data.page_size,
};

  return (
    <ProfileTable
      data={commits}
      columns={columns}
      paginationDetails={paginationDetails}
      getData={(params: { page?: number; page_size?: number }) => {
        navigate({
          search: {
            ...search,
            page_no: params.page ?? page_no,
            page_size: params.page_size ?? page_size,
          },
        });
      }}
    />
  );
}

export default CommitsList;