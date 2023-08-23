import { Center, Skeleton, SkeletonCircle, Stack, StackDivider } from '@chakra-ui/react'
import { FC, useMemo } from 'react'
import { SmallAddIcon } from '@chakra-ui/icons'
import { Api, Success } from 'api-types'
import { Link, useParams } from 'react-router-dom'
import { capitalize } from 'lodash'
import { EStreamingType } from 'api-types/lib/common'

import { useLocalization } from '../../hooks/useLocalization.ts'
import { streamingToLogo } from '../../utils/image.ts'
import { StreamingItem } from './StreamingItem'

type TProps = {
  data?: Success<Api.Streaming.List.Resp>,
  isLoading: boolean,
  isError: boolean,
  addButton?(): void,
  onEnter?(streaming: EStreamingType): void,
}

const NUMBER_OF_LOADING = 5

export const StreamingList: FC<TProps> = ({ data, isLoading, isError, onEnter }) => {
  const { t, d } = useLocalization()
  const streamings = useMemo(() => [...(data?.items || [])].reverse(), [data?.items.length])
  const { type: typeParam } = useParams()

  return (
    <Stack spacing={4} divider={<StackDivider />}>
      <Link to='/Profile?tab=1'>
        <StreamingItem noHover icon={<SmallAddIcon boxSize='2em' />} title={t(d.AddService)} />
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
        : streamings.map(({ type, id }) => (
            <StreamingItem
              key={id + type}
              image={streamingToLogo(type)}
              title={capitalize(type)}
              onEnter={onEnter ? () => onEnter(type) : undefined}
              isActive={type.toLowerCase() === typeParam}
            />
          ))}
    </Stack>
  )
}
