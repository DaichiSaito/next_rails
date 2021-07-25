import { LinkIcon, PlusIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

export default function UserPortfolio({ portfolios }) {
  const { currentUser } = useCurrentUser();
  const router = useRouter();
  const { name } = router.query;
  console.log(name);
  console.log(currentUser);
  const isMine = useRef<Boolean>(currentUser?.profile.name == name);

  return (
    <>
      {isMine.current ? (
        <>
          <Link href={`/portfolios/new`}>
            <a>
              <div className="flex items-center mb-2 text-yellow-500">
                <PlusIcon className="w-5 mr-1" />
                追加する
              </div>
            </a>
          </Link>
        </>
      ) : (
        <></>
      )}
      {portfolios.map((portfolio) => (
        <div key={portfolio.id} className="flex mb-3">
          <div className="mr-3">
            <img
              alt="thumbnail"
              src={`https://picsum.photos/480/320/?${Math.random()}`}
              className="rounded-3xl"
            />
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
      ))}
    </>
  );
}
