import { FC } from 'react'
import { Box, Card, CardHeader, Image, Stack } from '@chakra-ui/react'

type TProps = {
  title: string,
  isSelected?: boolean,
  onClick?: VoidFunction,
  image?: string,
}

export const CardItem: FC<TProps> = ({ image, isSelected, onClick, title }) => {
  return (
    <Card
      direction='row'
      my={2}
      bgColor={isSelected ? 'gray.600' : 'gray.800'}
      cursor='pointer'
      onClick={onClick}
      _hover={{ bgColor: isSelected ? 'gray.600' : 'gray.750' }}
      transition={'0.2s'}
      overflow='hidden'
      maxH={'50px'}
    >
      <Stack alignItems='center' direction='row'>
        {image && (
          <Box maxWidth='100px'>
            <Image objectFit='cover' h={'50px'} w={'100%'} src={image} alt='Caffe Latte' />
          </Box>
        )}
        <CardHeader>{title}</CardHeader>
      </Stack>
    </Card>
  )
}
