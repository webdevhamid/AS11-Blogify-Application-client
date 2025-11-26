import { Link } from "react-router";
import PageTitle from "./../../components/PageTitle/PageTitle";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner/Spinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";

const FeaturedBlogs = () => {
  const axiosSecure = useAxiosSecure();
  // const [sorting, setSorting] = useState([]);

  const fetchFeaturedBlogs = async () => {
    const { data } = await axiosSecure.get(`/featured-blogs`);
    return data;
  };

  const { data: featuredBlogs, isLoading } = useQuery({
    queryKey: ["featuredBlogs"],
    queryFn: fetchFeaturedBlogs,
  });

  const columnHelper = createColumnHelper();

  // Define table columns
  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.author.name, {
      id: "author",
      header: "Author",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => new Date(row.publishedAt).toLocaleDateString(), {
      id: "publishedAt",
      header: "Published Date",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("category", {
      header: "Category",
    }),
    columnHelper.accessor("wordLength", {
      header: "Word Length",
    }),
    columnHelper.accessor((row) => row._id, {
      id: "view",
      header: "View",
      cell: (_id) => (
        <Link to={`/single-blog/${_id.getValue()}`} className="btn btn-primary btn-xs">
          View
        </Link>
      ),
    }),
  ];

  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: featuredBlogs,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="py-10">
      <PageTitle title="Featured Title" />
      <div className="overflow-x-auto">
        {isLoading && <Spinner />}

        <table className="table table-zebra w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer select-none"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: "▲",
                      desc: "▼",
                    }[header.column.getIsSorted()] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
