import { useAuthentication } from "../hooks/useAuthentication";
export default function LogoutButton() {
  const { logout } = useAuthentication();
  return (
    <>
      <button onClick={() => logout()}>ログアウト</button>
    </>
  );
}
