import { FC, useMemo } from 'react'
import {
  Avatar,
  Card,
  CardBody,
  Center,
  Heading,
  Stack,
  StackDivider,
  StackItem,
  Text,
  Badge,
  Flex,
  CardFooter,
  Divider,
  Button,
  Spinner,
} from '@chakra-ui/react'

import { variants } from '../../../utils/size.ts'
import { useLocalization } from '../../../hooks/useLocalization.ts'

export type TProps = {
  name: string,
  login: string,
  id: number,
  streamings: number,
  playlists: number,
  tracks: number,
  isLoading: boolean,
  logOut(): void,
}

export const ProfileCard: FC<TProps> = ({ name, login, streamings, playlists, tracks, logOut, isLoading }) => {
  const { t, d } = useLocalization()
  const accountInfo = useMemo(
    () => [
      { id: 1, title: t(d.Streamings), value: streamings, color: 'orange' },
      { id: 2, title: t(d.Playlists), value: playlists, color: 'blue' },
      { id: 3, title: t(d.Tracks), value: tracks, color: 'green' },
    ],
    [streamings, playlists, tracks, t, d],
  )

  return (
    <Card minWidth={variants('100%', '300px')} variant='outline'>
      <CardBody p={4}>
        <Center flexDirection='column'>
          <Avatar mb={4} name={name} size='2xl' />
          <Heading textAlign='center' noOfLines={1}>
            {name}
          </Heading>
          <Text textAlign='center' as='samp' size='md' color='gray.400' noOfLines={1}>
            {login}
          </Text>
        </Center>
        <Stack mt={4} spacing={4} divider={<StackDivider />} align='stretch'>
          {accountInfo.map(({ title, value, color, id }) => (
            <StackItem key={id}>
              <Flex justify='space-between' align='center'>
                <Text>{title}</Text>
                {!isLoading ? <Badge colorScheme={color}>{value}</Badge> : <Spinner size='sm' />}
              </Flex>
            </StackItem>
          ))}
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button onClick={logOut} width='100%' color='red.300' variant='outline'>
          {t(d.LogOut)}
        </Button>
      </CardFooter>
    </Card>
  )
}
