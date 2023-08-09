import { FC } from 'react'
import { Box, Button, ButtonGroup, Center, Flex, Heading, Image, Tag, TagLabel } from '@chakra-ui/react'
import { ArrowForwardIcon, DownloadIcon, RepeatIcon } from '@chakra-ui/icons'

import { SubHeader } from '../SubHeader'
import { useLocalization } from '../../hooks/useLocalization.ts'

interface TProps {
  title: string,
  playlists: number,
  tracks: number,
  logo?: string,
}

export const StreamingSubHeader: FC<TProps> = ({ title, playlists, tracks, logo }) => {
  const { t, d } = useLocalization()

  return (
    <SubHeader>
      <Flex flex={1} p={6}>
        <Center pr={6}>
          <Image src={logo} width='150px' height='150px' bg='gray.400' rounded='xl' />
        </Center>
        <Flex justifyContent={'space-between'} flexDirection='column'>
          <Box>
            <Heading size='xl' noOfLines={1}>
              {title}
            </Heading>
            <Box my={2} ml={0}>
              {[
                { title: t(d.Playlists), data: playlists, color: 'green' },
                { title: t(d.Tracks), data: tracks, color: 'blue' },
              ].map(({ title, data, color }) => (
                <Tag size='sm' variant='outline' colorScheme={color} mr={2}>
                  <TagLabel>
                    {title} {data}
                  </TagLabel>
                </Tag>
              ))}
            </Box>
          </Box>
          <Box>
            <ButtonGroup mt={4} isAttached variant='outline' size='sm'>
              <Button leftIcon={playlists ? <RepeatIcon /> : <DownloadIcon />}>
                {playlists ? t(d.Update) : t(d.Import)}
              </Button>
              <Button rightIcon={<ArrowForwardIcon />} disabled={!playlists}>
                {t(d.Export)}
              </Button>
            </ButtonGroup>
          </Box>
        </Flex>
      </Flex>
    </SubHeader>
  )
}
