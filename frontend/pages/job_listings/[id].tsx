import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import fetcher from "../../lib/util/fetcher";

// TODO: SSRにすべし？
export default function JobListingDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    `http://localhost:5000/job_listings/${id}`,
    fetcher
  );
  if (data === undefined) return <>読み込み中</>;
  const { job_listing } = data;
  return (
    <>
      <div className="container mx-auto pt-5">
        <h2 className="text-2xl font-bold">{job_listing.title}</h2>
        <div className="flex items-center mb-5">
          <img
            alt="Placeholder"
            className="block rounded-full"
            src="https://picsum.photos/32/32/?random"
          />
          <span className="ml-2 text-sm">{job_listing.company.name}</span>
        </div>
        <div>
          <img
            src={`https://picsum.photos/640/400/?${Math.random()}`}
            alt="Placeholder"
            className="object-cover h-60 w-full"
          />
        </div>
        <div>
          <h3 className="font-bold">概要</h3>
          {job_listing.body}
        </div>
        <div>
          {job_listing.is_applied ? (
            <div>応募済みです</div>
          ) : (
            <Link href={`/job_listings/${id}/application/new`}>
              <a className="border border-yellow-500 bg-yellow-500 text-white px-5 py-2 inline-block rounded-3xl">
                応募する
              </a>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
