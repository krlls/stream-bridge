import { FC } from 'react'
import { StarIcon } from '@chakra-ui/icons'
import { AspectRatio, Card, CardBody, CardHeader, Flex, Text } from '@chakra-ui/react'

import { variants } from '../../utils/size.ts'

export type TProps = {
  id: number,
  name: string,
  onClick?(id: number): void,
}

export const PlaylistCard: FC<TProps> = ({ id, name, onClick }) => {
  return (
    <Card
      flex={variants('40%', 'none')}
      onClick={onClick ? () => onClick(id) : undefined}
      overflow={'hidden'}
      role='group'
      width={variants('100%', '200px')}
      height={variants('250px', '270px')}
      minHeight={variants('250px', '250px')}
      cursor='pointer'
      rounded='lg'
      bg='gray.700'
      transitionDuration='0.3s'
      transitionTimingFunction='cubic-bezier(.4,0,.2,1)'
      _hover={{
        shadow: 'xl',
        transform: 'scale(1.05, 1.05)',
      }}
    >
      <CardHeader display='flex' alignItems='center' justifyContent='center' p='12px'>
        <AspectRatio width='100%' minHeight='80px' minWidth='80px' ratio={1}>
          <Flex flex={1} alignItems='center' justifyContent='center' bg={'gray.600'} rounded='md' shadow='md'>
            <StarIcon boxSize='3em' color='gray.500' />
          </Flex>
        </AspectRatio>
      </CardHeader>
      <CardBody p='12px'>
        <Text fontSize='sm' as='b' noOfLines={2}>
          {name}
        </Text>
      </CardBody>
    </Card>
  )
}
