import useSWR from "swr";
import JobListing from "../components/organisms/job_listing/JobListing";
import fetcher from "../lib/util/fetcher";

export default function JobListings() {
  const { data, error } = useSWR("http://localhost:5000/job_listings", fetcher);
  if (data === undefined) return <>読み込み中</>;
  const { job_listings } = data;
  return (
    <>
      <div className="container mx-auto pt-5">
        <h1 className="text-2xl mb-3 font-bold">求人一覧</h1>
        <div className="grid grid-cols-3 gap-4">
          {job_listings.map((job_listing) => (
            <JobListing key={job_listing.id} job_listing={job_listing} />
          ))}
        </div>
      </div>
    </>
  );
}
