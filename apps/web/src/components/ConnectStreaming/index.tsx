import { FC, useEffect, useState } from 'react'
import { capitalize } from 'lodash'
import { Button, Card, Spacer, Stack, StackItem, Text } from '@chakra-ui/react'
import { Api, EStreamingType } from 'api-types'

import { useLocalization } from '../../hooks/useLocalization.ts'
import { AuthWindow } from '../AuthWindow'
import { useGetConnectStreamingLinkMutation } from '../../data/streaming'

export type TProps = {
  name: string,
  type: EStreamingType,
  isConnected: boolean,
  reload(): void,
}

export const ConnectStreaming: FC<TProps> = ({ name, isConnected, type, reload }) => {
  const { t, d } = useLocalization()
  const [window, setWindow] = useState(false)
  const [getUrl, { isLoading, isError, data }] = useGetConnectStreamingLinkMutation()

  useEffect(() => {
    if (data) setWindow(true)
  }, [data])

  const handleWindowClose = () => {
    reload()
    setWindow(false)
  }

  return (
    <Card variant='outline' p={4}>
      <AuthWindow isOpen={window} url={data || ''} onClose={handleWindowClose} />
      <Stack>
        <StackItem display='flex' flexDirection='row' alignItems='center'>
          <Text>{capitalize(name)}</Text>
          <Spacer />
          <Button
            isLoading={isLoading || isError}
            variant={isConnected ? 'outline' : 'solid'}
            onClick={() => getUrl(type.toLowerCase() as Api.Streaming.EApiStreamingType)}
          >
            {isConnected ? t(d.Update) : t(d.Connect)}
          </Button>
        </StackItem>
      </Stack>
    </Card>
  )
}
