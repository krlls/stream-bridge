import { FC, ReactNode } from 'react'
import { Container, Heading } from '@chakra-ui/react'

export type TProps = {
  title: string,
  children: ReactNode,
}

export const StepContainer: FC<TProps> = ({ children, title }) => {
  return (
    <Container mt={8}>
      <Heading my={4} size='md'>
        {title}
      </Heading>
      {children}
    </Container>
  )
}
