import Link from "next/link";
import useSWR from "swr";
import Portfolio from "../components/organisms/portfolio/Portfolio";
import fetcher from "../lib/util/fetcher";
import styled from "styled-components";

const PortfolioContainer = styled("div")`
  max-width: 1280px;
  margin: auto;
  padding: 30px 0;
`;

const MainContent = styled("div")`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;
  & > * {
    width: 24%;
    margin-bottom: 30px;
  }
`;

export default function Portfolios() {
  const { data, error } = useSWR("http://localhost:5000/portfolios", fetcher);
  if (data === undefined) return <>読み込み中</>;
  const { portfolios } = data;
  return (
    <>
      <PortfolioContainer>
        <h1>ポートフォリオ一覧</h1>

        <MainContent>
          {portfolios.map((portfolio) => (
            <Portfolio key={portfolio.id} portfolio={portfolio} />
          ))}
        </MainContent>
      </PortfolioContainer>
    </>
  );
}
