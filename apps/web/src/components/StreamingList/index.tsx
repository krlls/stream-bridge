import { Avatar, Center, Skeleton, SkeletonCircle, Stack, StackDivider, Text } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'
import { SmallAddIcon, StarIcon } from '@chakra-ui/icons'
import { Api, Success } from 'api-types'
import { Link } from 'react-router-dom'

import { useLocalization } from '../../hooks/useLocalization.ts'

type TProps = {
  data?: Success<Api.Streaming.List.Resp>,
  isLoading: boolean,
  isError: boolean,
  addButton?(): void,
  onEnter?(streaming: Api.Streaming.List.Streaming): void,
}

const NUMBER_OF_LOADING = 5

export const StreamingList: FC<TProps> = ({ data, isLoading, isError, onEnter }) => {
  const { t, d } = useLocalization()

  return (
    <Stack spacing={4} divider={<StackDivider />}>
      <Link to='/Profile?tab=1'>
        <Streaming image={<SmallAddIcon boxSize='2em' />} title={t(d.AddService)} />
      </Link>
      {isLoading || isError
        ? Array(NUMBER_OF_LOADING)
            .fill(null)
            .map((_, i) => (
              <Center flexDirection='column' key={i} alignItems='center'>
                <SkeletonCircle width='3rem' height='3rem' mb={2} />
                <Skeleton width='100%' height='20px' />
              </Center>
            ))
        : data?.items.map((s) => (
            <Streaming
              key={s.id + s.type}
              image={<Avatar mb={2} icon={<StarIcon />} />}
              title={s.type[0] + s.type.slice(1).toLowerCase()}
              onEnter={onEnter ? () => onEnter(s) : undefined}
            />
          ))}
    </Stack>
  )
}

function Streaming({ image, title, onEnter }: { image: ReactNode, title: string, onEnter?(): void }) {
  return (
    <Center flexDirection='column' as={'button'} alignContent='center' onClick={onEnter}>
      {image}
      <Text lineHeight={1.4} noOfLines={2} fontSize='sm' maxWidth='97px'>
        {title}
      </Text>
    </Center>
  )
}
