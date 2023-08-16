import { FC, ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'

export type TProps = {
  header?: ReactNode,
  children?: ReactNode | ReactNode[],
}

export const Page: FC<TProps> = ({ children, header }) => {
  return (
    <Flex direction='column'>
      {header}
      <Flex rounded='3xl'>{children}</Flex>
    </Flex>
  )
}
