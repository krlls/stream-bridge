import { FC, ReactNode } from 'react'
import { Box, Flex, Heading, Image, Tag, TagLabel } from '@chakra-ui/react'

import { useThemeColors } from '../../hooks/useThemeColors.ts'
import { variants } from '../../utils/size.ts'

interface TProps {
  title: string,
  image?: string,
  children?: ReactNode,
  tags?: { title: string, color: string }[],
  topCmp?: ReactNode,
}

export const SubHeader: FC<TProps> = ({ children, title, image, tags, topCmp }) => {
  const { primary, secondary } = useThemeColors()

  return (
    <Flex width='100%' bgGradient={`linear(to-b, ${primary}, ${secondary} 80%)`} rounded='xl' maxHeight='250px'>
      <Flex flex={1} p={variants(4, 6)} direction='column'>
        {topCmp}
        <Flex>
          <Box
            display='flex'
            minWidth={variants('80px', '150px')}
            width={variants('80px', '150px')}
            height={variants('80px', '150px')}
            mr={variants(4, 6)}
          >
            <Image src={image} flex={1} bg='gray.400' rounded='xl' />
          </Box>
          <Flex justifyContent={'space-between'} flexDirection='column'>
            <Box>
              <Heading size='xl' noOfLines={1}>
                {title}
              </Heading>
              {!!tags && (
                <Box my={2} ml={0}>
                  {tags.map(({ title, color }) => (
                    <Tag size='sm' variant='outline' colorScheme={color} mr={2}>
                      <TagLabel>{title}</TagLabel>
                    </Tag>
                  ))}
                </Box>
              )}
            </Box>
            <Box display={variants('none', 'block')}>{children}</Box>
          </Flex>
        </Flex>
        <Box display={variants('block', 'none')}>{children}</Box>
      </Flex>
    </Flex>
  )
}
