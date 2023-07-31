import { FC, ReactNode } from 'react'
import { Button, Card, CardBody, CardFooter, Heading, Stack, Text, Center } from '@chakra-ui/react'

export type TProps = {
  title: string,
  text: string,
  icon?: ReactNode,
  buttonText?: string,
  action?(): void,
}

export const CardWithAction: FC<TProps> = ({ text, title, buttonText, action, icon }) => {
  return (
    <Card maxWidth='lg' direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline' color='gray.600'>
      {icon && (
        <Center maxW={{ base: '100%', sm: '200px' }} m={2} ml={4}>
          {icon}
        </Center>
      )}

      <Stack>
        <CardBody>
          <Heading size='md'>{title}</Heading>

          <Text py='2'>{text}</Text>
        </CardBody>

        {buttonText && (
          <CardFooter>
            <Button colorScheme='blue' onClick={action} variant='outline'>
              {buttonText}
            </Button>
          </CardFooter>
        )}
      </Stack>
    </Card>
  )
}
