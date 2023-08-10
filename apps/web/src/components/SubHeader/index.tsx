import { FC, ReactNode } from 'react'
import { Box, Flex, Heading, Image, Tag, TagLabel } from '@chakra-ui/react'

import { useThemeColors } from '../../hooks/useThemeColors.ts'
import { variants } from '../../utils/size.ts'

interface TProps {
  title: string,
  image?: string,
  bgImage?: string,
  children?: ReactNode,
  tags?: { title: string, color: string }[],
  topCmp?: ReactNode,
}

export const SubHeader: FC<TProps> = ({ children, title, image, tags, topCmp, bgImage }) => {
  const { primary, secondary } = useThemeColors()

  return (
    <Flex
      width='100%'
      bgGradient={`linear(to-b, ${primary}, ${secondary} 80%)`}
      bgImage={bgImage}
      backgroundSize='cover'
      roundedTop='xl'
    >
      <Flex
        border='none'
        roundedTop='xl'
        flex={1}
        p={variants(4, 6)}
        direction='column'
        zIndex={1}
        backdropFilter={'blur(60px)'}
        bgGradient={bgImage ? `linear(to-b, rgba(255,255,255,0) 0%,  ${secondary} 95%)` : undefined}
      >
        <Flex mb={bgImage ? '40px' : undefined} direction={'column'}>
          {topCmp}
          <Flex>
            <Box
              shadow={bgImage ? '2xl' : undefined}
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
                <Heading size='xl' noOfLines={1} textShadow='1px 1px black'>
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
    </Flex>
  )
}
