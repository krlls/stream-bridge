import { FC } from 'react'
import { Skeleton } from '@chakra-ui/react'

import { ConnectStreaming } from '../ConnectStreaming'
import { useUserStreamings } from '../../hooks/useUserStreamings.ts'

export const StreamingsTab: FC = () => {
  const { data, isLoading, isError } = useUserStreamings()

  if (isLoading || isError) {
    return <Skeleton height={40} width='100%' />
  }

  return (data || []).map(({ type, name }) => <ConnectStreaming type={type} name={name} isConnected />)
}
