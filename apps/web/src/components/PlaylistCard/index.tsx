import { FC } from 'react'
import { StarIcon } from '@chakra-ui/icons'
import {
  AspectRatio,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Text,
  Image,
  useColorModeValue,
  Skeleton,
} from '@chakra-ui/react'

import { variants } from '../../utils/size.ts'
import { useThemeColors } from '../../hooks/useThemeColors.ts'

export type TProps = {
  id: number,
  name: string,
  cover?: string,
  onClick?(id: number): void,
}

export const PlaylistCard: FC<TProps> = ({ id, name, onClick, cover }) => {
  const { imagePlaceholder, subBackground } = useThemeColors()
  const imagePlaceholderColor = useColorModeValue('gray.400', 'gray.500')

  return (
    <Card
      flex={variants('40%', 'none')}
      onClick={onClick ? () => onClick(id) : undefined}
      overflow={'hidden'}
      role='group'
      width={variants('100%', '200px')}
      cursor='pointer'
      rounded='lg'
      bg={subBackground}
      transitionDuration='0.3s'
      transitionTimingFunction='cubic-bezier(.4,0,.2,1)'
      _hover={{
        shadow: useColorModeValue('none', 'xl'),
        transform: 'scale(1.05, 1.05)',
        bg: useColorModeValue('gray.200', 'gray.720'),
      }}
    >
      <CardHeader display='flex' alignItems='center' justifyContent='center' p='12px'>
        <AspectRatio width='100%' minHeight='80px' minWidth='80px' ratio={1}>
          <Flex
            flex={1}
            alignItems='center'
            justifyContent='center'
            bg={imagePlaceholder}
            rounded='md'
            shadow={useColorModeValue('none', 'md')}
          >
            {cover ? (
              <Image src={cover} flex={1} fallback={<Skeleton flex={1} width={'100%'} height='100%' />} />
            ) : (
              <StarIcon boxSize='3em' color={imagePlaceholderColor} />
            )}
          </Flex>
        </AspectRatio>
      </CardHeader>
      <CardBody p='1em'>
        <Text fontSize='sm' as='b' noOfLines={1}>
          {name}
        </Text>
      </CardBody>
    </Card>
  )
}
