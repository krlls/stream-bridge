import { useEffect, useRef, useState } from 'react'

export const useGetRef = <T>() => {
  const ref = useRef<T>(null)
  const [shouldUpdate, setShouldUpdate] = useState(true)

  useEffect(() => {
    if (shouldUpdate) {
      setShouldUpdate(false)
    }
  }, [shouldUpdate])

  return ref
}
