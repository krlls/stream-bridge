import { Flex, Heading } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

export type TProps = {
  title?: string,
  children: ReactNode,
}

export const Section: FC<TProps> = ({ children, title }) => {
  return (
    <Flex direction='column' m={4}>
      <Heading mb={8}>{title}</Heading>
      {children}
    </Flex>
  )
}
