import axios from "axios"
import { useCurrentUser } from "./useCurrentUser"

type CreatePortfolioParams = {
  title: string;
  serviceUrl: string;
  githubUrl: string;
  publishedOn: string;
  body: string;
  tags: []

}
export const usePortfolios = () => {
  const { currentUser } = useCurrentUser()
  const favorite = async (id) => {
    if (currentUser == null) return
    
    const res = await axios.post(`http://localhost:5000/portfolios/${id}/like`, {}, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    })
  }

  const unFavorite = async (id) => {
    if (currentUser == null) return
    
    const res = await axios.delete(`http://localhost:5000/portfolios/${id}/like`, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    })
  }

  const fetchPortfolio = async (id) => {
    // TODO: setPortfolioとかしなくていいのか
    // TODO: currentUserがない時の制御
    return await axios.get(`http://localhost:5000/portfolios/${id}`, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    })
  }

  const create = async(props: CreatePortfolioParams) => {
    if (currentUser == null) return

    const res = await axios.post(`http://localhost:5000/portfolios`, props, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    })
  }
  return { favorite, unFavorite, create }
}