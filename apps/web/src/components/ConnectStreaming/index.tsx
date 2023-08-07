import { FC } from 'react'
import { Button, Card, Spacer, Stack, StackItem, Text } from '@chakra-ui/react'
import { EStreamingType } from 'api-types'

export type TProps = {
  name: string,
  type: EStreamingType,
  isConnected: boolean,
}

export const ConnectStreaming: FC<TProps> = ({ type, isConnected }) => {
  return (
    <Card variant='outline' p={4}>
      <Stack>
        <StackItem display='flex' flexDirection='row' alignItems='center'>
          <Text>{type.toLowerCase()}</Text>
          <Spacer />
          <Button variant={isConnected ? 'outline' : 'solid'}>{isConnected ? 'Обновить' : 'Подключить'}</Button>
        </StackItem>
      </Stack>
    </Card>
  )
}
