import { Avatar, Center, Spinner, Stack, StackDivider, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { StarIcon } from '@chakra-ui/icons'

import { useGetStreamingListQuery } from '../../data/streaming'

export const StreamingList: FC = () => {
  const { data, isLoading, isError } = useGetStreamingListQuery()

  return (
    <Stack spacing={4} divider={<StackDivider />}>
      {isLoading || isError ? (
        <Spinner />
      ) : (
        data?.items.map((s) => (
          <Center key={s.id} flexDirection='column' as={'button'} alignContent='center'>
            <Avatar mb={2} icon={<StarIcon />} />
            <Text lineHeight={1.4} noOfLines={2} fontSize='sm' maxWidth='97px'>
              {s.type}
            </Text>
          </Center>
        ))
      )}
    </Stack>
  )
}
