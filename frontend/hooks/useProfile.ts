import axios from "axios"
import { useCurrentUser } from "./useCurrentUser"
type UpdateProfileProps = {
  name: string;
  nickname: string;
  introduction: string;
}
export const useProfile = () => {
  const { currentUser } = useCurrentUser()
  const updateProfile = (props: UpdateProfileProps) => {
    if (currentUser == null) return
    const { name, nickname, introduction } = props
    const res = axios.patch(`http://localhost:5000/job_seekers/me/profile`, props, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    })
  }
  return { updateProfile }
}