import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import useSWR, { mutate, trigger } from "swr";
import fetcher from "../../lib/util/fetcher";
// import { HeartIcon } from "@heroicons/react/solid";
import { HeartIcon, LinkIcon } from "@heroicons/react/outline";
import { parseCookies } from "nookies";
import axios from "axios";
import { usePortfolios } from "../../hooks/usePortfolios";
import Head from "next/head";
import Link from "next/link";

export default function PortfolioDetail({ initialPortfolio }) {
  const router = useRouter();
  const { favorite, unFavorite } = usePortfolios();
  const { id } = router.query;
  const { data: fetchedPortfolio, error } = useSWR(
    `http://localhost:5000/portfolios/${id}`,
    fetcher,
    { initialData: initialPortfolio }
  );

  const handleClickFavorite = (id) => {
    try {
      if (portfolio.is_favorited) {
        unFavorite(id);
      } else {
        favorite(id);
      }
      mutate(
        `http://localhost:5000/portfolios/${id}`,
        { portfolio: { ...portfolio, is_favorited: !portfolio.is_favorited } },
        false
      );
      trigger(`http://localhost:5000/portfolios/${id}`);
    } catch (error) {}
  };

  if (fetchedPortfolio === undefined) return <>読み込み中</>;
  const { portfolio } = fetchedPortfolio || initialPortfolio;
  console.log(portfolio);
  return (
    <>
      <Head>
        <title>{portfolio.title}</title>
        <meta
          name="description"
          content="Next.js + SWR codebase containing realworld examples (CRUD, auth, advanced patterns, etc) that adheres to the realworld spec and API"
        />
      </Head>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl mb-3">{portfolio.title}</h1>
        <div className="col-span-3 row-span-1">
          <div className="flex align-bottom flex-col leading-none p-2 md:p-4">
            <div className="flex flex-row items-center">
              <Link href={`/users/${portfolio.job_seeker.profile.name}`}>
                <a className="flex items-center no-underline hover:underline text-black mr-3">
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

              <div className="w-6 text-yellow-500 cursor-pointer">
                <HeartIcon
                  stroke={"#FC7400"}
                  fill={portfolio.is_favorited ? "#FC7400" : "#fff"}
                  onClick={() => handleClickFavorite(portfolio.id)}
                />
              </div>

              {portfolio.favorited_count}
            </div>
          </div>
        </div>
        <div className="flex mb-3">
          <div className="mr-3">
            <img alt="thumbnail" src="https://picsum.photos/640/320/?random" />
          </div>
          <div>
            <div className="mb-3">
              <div className="flex text-gray-500 font-bold">
                <LinkIcon className="w-6"></LinkIcon>
                サービス
              </div>
              <a href="https://www.jirorious.com" target="_blank">
                https://www.jirorious.com
              </a>
            </div>
            <div className="mb-3">
              <div className="flex text-gray-500 font-bold">
                <LinkIcon className="w-6"></LinkIcon>
                公開日
              </div>
              2021/2/2
            </div>
            <div className="mb-3">
              <div className="flex text-gray-500 font-bold">
                <LinkIcon className="w-6"></LinkIcon>
                GitHubリポジトリ
              </div>
              <a href="https://www.jirorious.com" target="_blank">
                https://www.jirorious.com
              </a>
            </div>

            <div className="mb-3">
              <div className="flex text-gray-500 font-bold">
                <LinkIcon className="w-6"></LinkIcon>
                使用技術
              </div>
              <div>
                {portfolio.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="bg-blue-100 text-indigo-700 inline-block py-1 px-5 m-1 rounded-md"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl">サービスについて</h2>
          <p>{portfolio.body}</p>
          <p>
            サンプルテキストサンプルテキストサンプルテキストサンプルテキスト
            サンプルテキスト サンプルテキスト サンプルテキスト サンプルテキスト
            サンプルテキスト サンプルテキスト サンプルテキスト サンプルテキスト
            サンプルテキスト サンプルテキスト サンプルテキスト サンプルテキスト
            サンプルテキスト サンプルテキスト サンプルテキスト サンプルテキスト
          </p>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const cookies = parseCookies(context);
  // localhostや5000だと接続できないので注意
  const { data: initialPortfolio } = await axios.get(
    `http://backend:3000/portfolios/${id}`,
    {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    }
  );
  return { props: { initialPortfolio } };
}
