import { FC } from 'react'
import { Text } from '@chakra-ui/react'

export const Logo: FC = () => {
  return (
    <Text as='b' bgGradient='linear(120deg, #bd34fe, #4186ff)' bgClip='text' fontSize='2xl'>
      S·Bridge
    </Text>
  )
}
