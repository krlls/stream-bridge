import { Flex, Text, VStack, Image, Box, Skeleton, SkeletonText, Spinner, Center } from '@chakra-ui/react'
import { Api } from 'api-types'
import { FC, memo, useEffect } from 'react'
import { debounce } from 'lodash'

import { variants } from '../../utils/size.ts'
import { useGetRef } from '../../hooks/useGetRef.ts'

type TProps = {
  isFetching: boolean,
  isLoading: boolean,
  tracks: Api.Music.Track[],
  cover?: string,
  setPage(): void,
}

export const TracksList: FC<TProps> = memo(({ tracks, cover, isLoading, setPage, isFetching }) => {
  const ref = useGetRef<HTMLDivElement>()

  useEffect(() => {
    const onScroll = debounce(() => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= (ref.current?.getBoundingClientRect().height || 0) - 100

      if (scrolledToBottom && !isFetching) {
        setPage()
      }
    }, 1)

    document.addEventListener('scroll', onScroll)

    return function () {
      document.removeEventListener('scroll', onScroll)
    }
  }, [isFetching])

  return (
    <VStack height='100%' px={variants(2, 0)} direction='column' ref={ref} position='relative' paddingBottom='40px'>
      <Box width='100%' position='sticky' top='64px' bg='gray.800' zIndex={1}>
        <Header name={'Name'} album={'Album'} />
      </Box>
      {isLoading
        ? Array(10)
            .fill(null)
            .map((_, i) => (
              <Flex key={i + 's'} width={'100%'} align='center'>
                <Skeleton mr={4} width='40px' height={'10px'} />
                <SkeletonText flex={1} noOfLines={2} width={'100%'} />
              </Flex>
            ))
        : tracks.map(({ name, album, artist, id }) => (
            <TrackItem key={id} name={name} album={album} artist={artist} cover={cover} />
          ))}
      {isFetching && (
        <Center position={'absolute'} bottom={1} marginBottom='10px'>
          <Spinner size='md' />
        </Center>
      )}
    </VStack>
  )
})

function TrackItem({ name, album, artist, cover }: { name: string, album: string, artist: string, cover?: string }) {
  return (
    <Flex
      p={2}
      width='100%'
      align='center'
      cursor='pointer'
      transition={'.3s'}
      rounded='md'
      _hover={{ bg: 'gray.750' }}
    >
      <Flex noOfLines={1} mr={4}>
        <Image width='40px' src={cover} rounded='sm' />
      </Flex>
      <Flex flex={1} direction='column' mr={4}>
        <Text fontSize='md' noOfLines={1}>
          {name}
        </Text>
        <Text noOfLines={1} fontSize='sm' color='gray.500'>
          {artist}
        </Text>
      </Flex>
      <Box flex={1} display={variants('none', 'block')}>
        <Text overflow='hidden' noOfLines={1} color='gray.500' fontSize='sm'>
          {album}
        </Text>
      </Box>
    </Flex>
  )
}

function Header({ name, album }: { name: string, album: string }) {
  return (
    <Flex width='100%' align='center' py={2} borderBottom='1px' borderBottomColor='gray.750' color='gray.500'>
      <Flex noOfLines={1} mr={6}>
        <Box width='40px' />
      </Flex>
      <Flex flex={1} direction='column' mr={4}>
        <Text fontSize='sm'>{name}</Text>
      </Flex>
      <Box flex={1} display={variants('none', 'block')}>
        <Text flex={1} fontSize='sm'>
          {album}
        </Text>
      </Box>
    </Flex>
  )
}
