import { useAuthentication } from "../hooks/useAuthentication";

export default function JobSeekerSignUp() {
  const { googleLogin } = useAuthentication();
  const handleClickGoogleLogin = () => {
    googleLogin();
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <button
          onClick={handleClickGoogleLogin}
          className="uppercase h-12 mt-3 text-white  rounded bg-red-800 hover:bg-red-900 px-10"
        >
          Googleでログイン
        </button>
      </div>
    </>
  );
}
