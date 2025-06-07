"use client";
import useSWR from "swr";

import Link from "next/link";
import CrudPage from "./../components/crud";
import QueryPage from "./../components/query";
import ReportPage from "./../components/report";
import { useEffect } from "react";

export default function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const tab = searchParams.tab;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const handleDownloadReport = async () => {
    const response = await fetch("/api/vuz/report");
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderContent = () => {
    switch (tab) {
      case "crud":
        return <CrudPage />;
      case "query":
        return <QueryPage />;
      case "report":
        return <ReportPage />;
      default:
        return <div>Упс... Такой вкладки нет!</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="navbar bg-base-300">
        <div className="flex-1">
          <Link href="/?tab=crud" passHref>
            <span
              className={`btn btn-ghost ${tab === "crud" ? "btn-active" : ""}`}
            >
              CRUD
            </span>
          </Link>
          <button
            className="btn btn-secondary  ml-2"
            onClick={handleDownloadReport}
          >
            Скачать отчет PDF
          </button>
        </div>
      </nav>
      <main className="flex-grow p-4">{renderContent()}</main>
    </div>
  );
}
