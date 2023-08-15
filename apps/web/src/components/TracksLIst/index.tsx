import { Flex, Text, VStack, Image, Box, Skeleton, SkeletonText } from '@chakra-ui/react'
import { Api } from 'api-types'
import { FC } from 'react'

import { useGetRef } from '../../hooks/useGetRef.ts'
import { variants } from '../../utils/size.ts'

type TProps = {
  isLoading: boolean,
  tracks: Api.Music.Track[],
  cover?: string,
}

export const TracksList: FC<TProps> = ({ tracks, cover, isLoading }) => {
  const ref = useGetRef<HTMLDivElement>()

  return (
    <VStack
      px={variants(2, 0)}
      height={`calc(100vh - ${ref.current?.getBoundingClientRect().top}px)`}
      direction='column'
      overflowY={'auto'}
    >
      <Flex width='100%' position='sticky' top='0px' bg='gray.800' zIndex={1}>
        <Header name={'Name'} album={'Album'} />
      </Flex>
      {isLoading
        ? Array(10).fill(null).map((i) => (
          <Flex key={i+'s'} width={'100%'} align='center'>
            <Skeleton mr={4} width='40px' height={'40px'}/>
            <SkeletonText flex={1} noOfLines={2} width={'100%'}/>
          </Flex>
        ))
        : tracks.map(({ name, album, artist }) => (
            <TrackItem key={name + artist} name={name} album={album} artist={artist} cover={cover} />
          ))}
    </VStack>
  )
}

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
    <Flex width='100%' align='center' pb={2} borderBottom='1px' borderBottomColor='gray.750' color='gray.500'>
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
