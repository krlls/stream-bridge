import { FC, ReactNode } from 'react'
import { Center, Text } from '@chakra-ui/react'

import { AppImage } from '../../AppImage'

type TProps = {
  image?: string,
  title: string,
  isActive?: boolean,
  icon?: ReactNode,
  onEnter?(): void,
}

const ACTIVE_COLOR = 'RGBA(255, 255, 255, 0.04)'

export const StreamingItem: FC<TProps> = ({ image, title, onEnter, icon, isActive }) => {
  return (
    <Center
      flexDirection='column'
      alignContent='center'
      onClick={onEnter}
      cursor='pointer'
      background={isActive ? ACTIVE_COLOR : undefined}
      _hover={{ bg: ACTIVE_COLOR }}
      transition='.2s'
      rounded='xl'
      px={1}
      py={2}
    >
      {icon ? icon : <AppImage width={'48px'} height={'48px'} src={image} mb={2} rounded='full' />}
      <Text lineHeight={1.4} noOfLines={2} fontSize='sm' maxWidth='97px' as={isActive ? 'b' : undefined}>
        {title}
      </Text>
    </Center>
  )
}
