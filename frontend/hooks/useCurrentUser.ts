import { useAuthentication } from "./useAuthentication";

export function useCurrentUser() {
  const { currentUser } = useAuthentication();
  const isAuthChecking = currentUser === undefined;

  return {
    currentUser,
    isAuthChecking,
  };
}
