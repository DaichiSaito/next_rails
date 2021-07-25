import Link from "next/link";
import { useState } from "react";
import { usePortfolios } from "../../../hooks/usePortfolios";

export default function Portfolio({ portfolio }) {
  const [preview, setPreview] = useState(portfolio);
  const { favorite, unFavorite } = usePortfolios();
  const handleClickFavorite = (id) => {
    setPreview({
      ...preview,
      is_favorited: !preview.is_favorited,
    });
    try {
      if (preview.is_favorited) {
        unFavorite(id);
      } else {
        favorite(id);
      }
    } catch (error) {}
  };

  return (
    <>
      <div className=" grid grid-cols-3 grid-rows-7 grid-flow-row overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="col-span-3 row-span-4 p-1 m-1">
          <Link href={`/portfolios/${portfolio.id}`}>
            <a>
              <img
                src={`https://picsum.photos/640/400/?${Math.random()}`}
                alt="Placeholder"
                className="rounded-t-xl object-cover h-48 w-full"
              />
            </a>
          </Link>
        </div>

        <div className="col-span-3 row-span-1">
          <div className="flex align-bottom flex-col leading-none p-2 md:p-4">
            <div className="flex flex-row justify-between items-center">
              <Link href={`/users/${portfolio.job_seeker.profile.name}`}>
                <a className="flex items-center no-underline hover:underline text-black">
                  <img
                    alt="Placeholder"
                    className="block rounded-full"
                    src="https://picsum.photos/32/32/?random"
                  />
                  <span className="ml-2 text-sm">
                    {portfolio.job_seeker.profile.name}
                  </span>
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-3 row-span-1">
          <header className="flex items-center justify-between leading-tight p-2 md:p-4">
            <h1 className="text-lg">
              <Link href={`/portfolios/${preview.id}`}>
                <a className="no-underline hover:underline text-black">
                  {preview.title}
                </a>
              </Link>
            </h1>
            <p className="text-grey-darker text-sm">9 min ago</p>
          </header>
        </div>
      </div>
    </>
  );
}
