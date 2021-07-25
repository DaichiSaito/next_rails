import axios from "axios"
import { useCurrentUser } from "./useCurrentUser"

export const useJobListings = () => {
  const { currentUser } = useCurrentUser()
  const apply = async (id: number, body: string) => {
    if (currentUser == null) return
    
    const res = await axios.post(`http://localhost:5000/job_listings/${id}/application`, {
      body
    }, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    })
  }
  return { apply }
}