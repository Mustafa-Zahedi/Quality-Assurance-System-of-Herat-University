/* eslint-disable jsx-a11y/no-redundant-roles */
import { HomeIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const pages = [
  { name: "ثبت و تعریف", href: "", current: false },
  { name: "فاکولته", href: "faculty", current: false },
  { name: "دیپارتمنت", href: "department", current: true },
  { name: "دیپارتمنت", href: "#", current: true },
  { name: "دیپارتمنتk", href: "#", current: false },
];

export default function Breadcrumbs() {
  return (
    <nav className="flex w-full" aria-label="Breadcrumb">
      <ol role="list" className="flex w-full space-x-4 bg-white px-6 shadow">
        <li className="flex">
          <div className="flex items-center">
            <Link
              to={"/dashboard"}
              className="text-gray-400 hover:text-gray-500"
            >
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">خانه</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name} className="flex">
            <div className="flex items-center">
              <svg
                className="h-full w-6 flex-shrink-0 text-gray-200 rotate-180"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <Link
                to={page.href}
                className="mr-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                // aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
