import { FC } from 'react'
import { Flex, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

import { variants } from '../../utils/size.ts'
import { resetToken, useGetUserQuery, useUpdateUserMutation } from '../../data/user'
import { ProfileCard } from './ProfileCard'
import { useGetCalculatedUserStats } from '../../hooks/useGetCalculatedUserStats.ts'
import { ProfileData } from './ProfileData'

export const ProfileTab: FC = () => {
  const { data, isLoading } = useGetUserQuery(undefined)
  const { result, isLoading: statLoading, isError: statError } = useGetCalculatedUserStats()
  const [updateUser, updateResult] = useUpdateUserMutation()
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
    <Stack direction={variants('column', 'row')} spacing={4} flexWrap='wrap' maxWidth='1700px'>
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
      <ProfileData
        name={name}
        login={login}
        id={id}
        isLoading={false}
        updateUser={({ login, name, pass }) => updateUser({ login, name, pass })}
        updateResult={{ isError: updateResult.isError, isLoading: updateResult.isLoading }}
      />
    </Stack>
  )
}
