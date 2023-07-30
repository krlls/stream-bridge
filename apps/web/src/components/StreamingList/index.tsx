import { Avatar, Center, Spinner, Stack, StackDivider, Text } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'
import { SmallAddIcon, StarIcon } from '@chakra-ui/icons'

import { useGetStreamingListQuery } from '../../data/streaming'
import { useLocalization } from '../../hooks/useLocalization.ts'

export const StreamingList: FC = () => {
  const { data, isLoading, isError } = useGetStreamingListQuery()
  const { t, d } = useLocalization()

  return (
    <Stack spacing={4} divider={<StackDivider />}>
      <Streaming image={<SmallAddIcon boxSize='2em' />} title={t(d.AddService)} />
      {isLoading || isError ? (
        <Spinner />
      ) : (
        data?.items.map((s) => (
          <Streaming image={<Avatar mb={2} icon={<StarIcon />} />} title={s.type[0] + s.type.slice(1).toLowerCase()} />
        ))
      )}
    </Stack>
  )
}

function Streaming({ image, title }: { image: ReactNode, title: string }) {
  return (
    <Center flexDirection='column' as={'button'} alignContent='center'>
      {image}
      <Text lineHeight={1.4} noOfLines={2} fontSize='sm' maxWidth='97px'>
        {title}
      </Text>
    </Center>
  )
}
