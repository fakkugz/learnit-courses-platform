import Link from "next/link";

type Props = {
  totalPages: number;
  currentPage: number;
  basePath: string;
};

export default function Pagination({ totalPages, currentPage, basePath }: Props) {
  return (
    <div className="flex justify-center mt-10 space-x-2">
      {Array.from({ length: totalPages }, (_, i) => {
        const pageNum = i + 1;
        return (
          <Link
            key={pageNum}
            href={`${basePath}?page=${pageNum}`}
            className={`px-4 py-2 border rounded ${
              pageNum === currentPage
                ? "bg-primary-300 text-white"
                : "bg-white text-secondary-200 hover:bg-secondary-200 hover:text-white"
            }`}
          >
            {pageNum}
          </Link>
        );
      })}
    </div>
  );
}
