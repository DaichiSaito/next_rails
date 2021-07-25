import Link from "next/link";

export default function JobListing({ job_listing }) {
  return (
    <>
      <div className="mb-10">
        <Link href={`/job_listings/${job_listing.id}`}>
          <a>
            <img
              src={`https://picsum.photos/640/400/?${Math.random()}`}
              alt="Placeholder"
              className="object-cover h-48 w-full rounded-xl overflow-hidden mb-2"
            />
          </a>
        </Link>
        <div>
          <h2 className="font-bold text-xl mb-2">{job_listing.title}</h2>
        </div>
        <div>
          <div className="flex items-center">
            <img
              alt="Placeholder"
              className="block rounded-full"
              src="https://picsum.photos/48/48/?random"
            />
            <span className="ml-2 text-sm">{job_listing.company.name}</span>
          </div>
        </div>
      </div>
    </>
  );
}
