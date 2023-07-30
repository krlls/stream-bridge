import { FC, ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'

export type TProps = {
  header?: ReactNode,
  children?: ReactNode | ReactNode[],
}

export const Page: FC<TProps> = ({ children, header }) => {
  return (
    <Flex flex={1} direction='column'>
      {header}
      <Flex flex={1}>{children}</Flex>
    </Flex>
  )
}
