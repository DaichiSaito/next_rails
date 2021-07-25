import { styled } from "styled-components";
import { useState } from "react";
import {
  AcademicCapIcon,
  DesktopComputerIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import UserPortfolio from "../../components/organisms/user/UserPortfolio";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import fetcher from "../../lib/util/fetcher";

// const HeroArea = styled("div")``;
type TabType = "portfolio" | "development";
export default function UserDetail() {
  const [tabType, setTabType] = useState<TabType>("portfolio");
  const router = useRouter();
  const { name } = router.query;
  const { data, error } = useSWR(
    `http://localhost:5000/job_seekers/${name}`,
    fetcher
  );
  if (data === undefined) return <>読み込み中</>;
  const { job_seeker } = data;

  console.log(job_seeker);
  return (
    <>
      <div className="bg-blue-100" style={{ height: "180px" }}></div>
      <div className="container mx-auto">
        <div className="flex items-center mb-5">
          <img
            alt="Placeholder"
            className="block rounded-full"
            src="https://picsum.photos/64/64/?random"
          />
          <span className="ml-5 text-lg font-bold">
            {job_seeker.profile.name}
          </span>
          <div className="ml-auto">
            <Link href={`/users/profile/edit`}>
              <a className="p-3 border-yellow-500 border-2 rounded-3xl text-yellow-500">
                プロフィール編集
              </a>
            </Link>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <AcademicCapIcon className="w-6 mr-1" />
            出身プログラミングスクール: RUNTEQ在学中
          </div>
          <div className="flex items-center mb-2">
            <DesktopComputerIcon className="w-6 mr-1" />
            <a href="https://github.com/DaichiSaito">
              https://github.com/DaichiSaito
            </a>
          </div>
          <div className="flex items-center mb-2">
            <PencilIcon className="w-6 mr-1" />
            <a href="https://github.com/DaichiSaito">
              https://github.com/DaichiSaito
            </a>
          </div>
        </div>
        <div>
          <ul className="flex border-b-2 gap-3 mb-5">
            <li
              className={
                "cursor-pointer " +
                (tabType == "portfolio" ? "border-b-4 border-yellow-500" : "")
              }
              onClick={() => setTabType("portfolio")}
            >
              ポートフォリオ
            </li>
            <li
              className={
                "cursor-pointer " +
                (tabType == "development" ? "border-b-4 border-yellow-500" : "")
              }
              onClick={() => setTabType("development")}
            >
              開発ログ
            </li>
          </ul>
          {tabType == "portfolio" && (
            <>
              <UserPortfolio portfolios={job_seeker.portfolios} />
            </>
          )}
          {tabType == "development" && (
            <>
              <div>開発ログだよ</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
