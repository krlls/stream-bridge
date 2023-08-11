import { Center, Skeleton, SkeletonCircle, Stack, StackDivider, Text } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'
import { SmallAddIcon } from '@chakra-ui/icons'
import { Api, Success } from 'api-types'
import { Link } from 'react-router-dom'

import { useLocalization } from '../../hooks/useLocalization.ts'
import { streamingToLogo } from '../../utils/image.ts'
import { AppImage } from '../AppImage'

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
        <Streaming icon={<SmallAddIcon boxSize='2em' />} title={t(d.AddService)} />
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
              image={streamingToLogo(s.type)}
              title={s.type[0] + s.type.slice(1).toLowerCase()}
              onEnter={onEnter ? () => onEnter(s) : undefined}
            />
          ))}
    </Stack>
  )
}

function Streaming({
  image,
  title,
  onEnter,
  icon,
}: {
  image?: string,
  title: string,
  icon?: ReactNode,
  onEnter?(): void,
}) {
  return (
    <Center flexDirection='column' as={'button'} alignContent='center' onClick={onEnter}>
      {icon ? icon : <AppImage width={'48px'} height={'48px'} src={image} mb={2} rounded='full' />}
      <Text lineHeight={1.4} noOfLines={2} fontSize='sm' maxWidth='97px'>
        {title}
      </Text>
    </Center>
  )
}
