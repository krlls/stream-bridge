import { useParams } from 'react-router-dom'

export const useSafeParams = <T extends Record<string, string | number | undefined>>() => {
  const { ...params } = useParams()

  return params as T
}
