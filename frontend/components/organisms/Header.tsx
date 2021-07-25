import styled from "styled-components";
import Image from "next/image";
import logoImage from "../../public/logo.svg";
import Link from "next/link";
import { useAuthentication } from "../../hooks/useAuthentication";

const NavbarContainer = styled("nav")`
  padding: 0.5rem 1rem;
  height: 64px;
  display: flex;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: 544px) {
    border-radius: 0.25rem;
  }
`;

const NavbarLeftMenu = styled("div")`
  margin-right: auto;
  display: flex;
  align-items: center;
  & > * {
    margin: 0 10px;
  }
`;

const NavbarRightMenu = styled("div")`
  margin-left: auto;
  display: flex;
  align-items: center;
  & > * {
    margin: 0 10px;
  }
`;
// styled-component使ってみたけどまじよくわからん。
export default function Header() {
  const { currentUser, logout } = useAuthentication();
  return (
    <>
      <NavbarContainer>
        <NavbarLeftMenu>
          <Image src={logoImage} />
          <Link href={"/portfolios"}>
            <a>ポートフォリオ</a>
          </Link>
          <Link href={"/job_listings"}>
            <a>求人</a>
          </Link>
        </NavbarLeftMenu>
        <NavbarRightMenu>
          {currentUser == null ? (
            <>
              <Link href={"/job_seeker_signup"}>
                <a>ログイン</a>
              </Link>
              <Link href={"/job_seeker_signup"}>
                <a>新規登録</a>
              </Link>{" "}
            </>
          ) : (
            <>
              <button onClick={() => logout()}>ログアウト</button>
            </>
          )}
        </NavbarRightMenu>
      </NavbarContainer>
    </>
  );
}
