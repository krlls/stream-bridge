import { FC } from 'react'
import { Skeleton, Stack, StackItem } from '@chakra-ui/react'

import { ConnectStreaming } from '../ConnectStreaming'
import { useUserStreamings } from '../../hooks/useUserStreamings.ts'

export const StreamingsTab: FC = () => {
  const { data, isLoading, isError, refetch } = useUserStreamings()

  if (isLoading || isError) {
    return <Skeleton height='80px' width='100%' m={'4px'} rounded='md' />
  }

  return (
    <Stack spacing={4}>
      {(data || []).map(({ type, name, isConnected }) => (
        <StackItem key={type}>
          <ConnectStreaming type={type} name={name} isConnected={isConnected} reload={refetch} />
        </StackItem>
      ))}
    </Stack>
  )
}
