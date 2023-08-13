import { FC } from 'react'
import { Avatar, Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

import { variants } from '../../utils/size.ts'
import { useGetUserQuery } from '../../data/user'

export const ProfileTab: FC = () => {
  const { data, isLoading } = useGetUserQuery(undefined)

  if (isLoading) {
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

  return (
    <Flex direction={variants('column', 'row')}>
      <Flex>
        <Avatar size='xl' name={data?.name} />
      </Flex>
      <Flex></Flex>
    </Flex>
  )
}
