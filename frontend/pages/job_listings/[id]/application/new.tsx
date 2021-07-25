import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import { useJobListings } from "../../../../hooks/useJobListings";
import fetcher from "../../../../lib/util/fetcher";
import JobListing from "../../../../components/organisms/job_listing/JobListing";

export default function JobListingApplicationNew() {
  const [body, setBody] = useState("");
  const { apply } = useJobListings();
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    `http://localhost:5000/job_listings/${id}`,
    fetcher
  );
  if (data === undefined) return <>読み込み中</>;
  const { job_listing } = data;
  const handleSubmit = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    apply(Number(id), body);
    router.push(`/job_listings/${id}`);
  };
  return (
    <>
      <div className="container mx-auto pt-5">
        <h2 className="text-xl font-bold mb-5">この求人に応募します</h2>
        <div className="flex gap-5">
          <div className="w-72 border-r border-gray-300 px-3">
            <JobListing job_listing={job_listing} />
          </div>
          <div className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
            <form onSubmit={handleSubmit}>
              <div>
                <label>
                  志望理由
                  <textarea
                    name="body"
                    cols="30"
                    rows="10"
                    onChange={(e) => setBody(e.target.value)}
                    className="border border-gray-300 w-full p-3"
                  ></textarea>
                </label>
              </div>
              <button className="border-yellow-500 bg-yellow-500 text-white px-5 py-3 rounded-3xl">
                応募する
              </button>
            </form>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
}
