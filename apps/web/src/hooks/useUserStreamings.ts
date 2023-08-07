import { useGetAvailableStreamingsQuery } from '../data/streaming'

export const useUserStreamings = () => {
  const { data, isLoading, isError } = useGetAvailableStreamingsQuery('')

  return { data, isError, isLoading }
}
