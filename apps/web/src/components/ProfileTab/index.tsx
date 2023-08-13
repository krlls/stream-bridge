import { FC } from 'react'
import { Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

import { variants } from '../../utils/size.ts'
import { resetToken, useGetUserQuery } from '../../data/user'
import { ProfileCard } from './ProfileCard'
import { useGetCalculatedUserStats } from '../../hooks/useGetCalculatedUserStats.ts'

export const ProfileTab: FC = () => {
  const { data, isLoading } = useGetUserQuery(undefined)
  const { result, isLoading: statLoading, isError: statError } = useGetCalculatedUserStats()
  const dispatch = useDispatch()

  if (isLoading || !data) {
    return (
      <Flex flex={1} direction={variants('column', 'row')}>
        <Flex mr={4}>
          <SkeletonCircle size='130' />
        </Flex>
        <Flex flex={1} maxWidth='500px'>
          <SkeletonText flex={1} mt='4' noOfLines={4} spacing='4' skeletonHeight='3' />
        </Flex>
      </Flex>
    )
  }

  const { name, login, id } = data

  return (
    <Flex direction={variants('column', 'row')}>
      <Flex>
        <ProfileCard
          name={name}
          login={login}
          id={id}
          isLoading={statLoading || statError}
          streamings={result?.streamings || 0}
          playlists={result?.playlists || 0}
          tracks={result?.tracks || 0}
          logOut={() => dispatch(resetToken())}
        />
      </Flex>
      <Flex></Flex>
    </Flex>
  )
}
