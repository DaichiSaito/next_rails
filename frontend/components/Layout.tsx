import { ReactNode } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import Header from "./organisms/Header";
import LoadingSpinner from "../components/atoms/LoadingSpinner";

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;
  const { isAuthChecking } = useCurrentUser();
  if (isAuthChecking) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }
  return (
    <>
      <Header />
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
