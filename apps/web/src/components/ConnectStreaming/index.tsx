import { FC } from 'react'
import { capitalize } from 'lodash'
import { Button, Card, Spacer, Stack, StackItem, Text } from '@chakra-ui/react'
import { EStreamingType } from 'api-types'

import { useLocalization } from '../../hooks/useLocalization.ts'

export type TProps = {
  name: string,
  type: EStreamingType,
  isConnected: boolean,
}

export const ConnectStreaming: FC<TProps> = ({ name, isConnected }) => {
  const { t, d } = useLocalization()

  return (
    <Card variant='outline' p={4}>
      <Stack>
        <StackItem display='flex' flexDirection='row' alignItems='center'>
          <Text>{capitalize(name)}</Text>
          <Spacer />
          <Button variant={isConnected ? 'outline' : 'solid'}>{isConnected ? t(d.Update) : t(d.Connect)}</Button>
        </StackItem>
      </Stack>
    </Card>
  )
}
