import { FC } from 'react'
import { Box, Button, ButtonGroup, Flex, Heading, Image, Tag, TagLabel } from '@chakra-ui/react'
import { ArrowForwardIcon, DownloadIcon, RepeatIcon } from '@chakra-ui/icons'

import { SubHeader } from '../SubHeader'
import { useLocalization } from '../../hooks/useLocalization.ts'
import { variants } from '../../utils/size.ts'

interface TProps {
  title: string,
  playlists: number,
  tracks: number,
  logo?: string,
  isImporting: boolean,
  onImport(): void,
}

export const StreamingSubHeader: FC<TProps> = ({ title, playlists, tracks, logo, onImport, isImporting }) => {
  const { t, d } = useLocalization()

  const actions = (
    <ButtonGroup mt={4} isAttached variant='outline' size='sm'>
      <Button isLoading={isImporting} onClick={onImport} leftIcon={playlists ? <RepeatIcon /> : <DownloadIcon />}>
        {playlists ? t(d.Update) : t(d.Import)}
      </Button>
      <Button rightIcon={<ArrowForwardIcon />} disabled={!playlists}>
        {t(d.Export)}
      </Button>
    </ButtonGroup>
  )

  return (
    <SubHeader>
      <Flex flex={1} p={variants(4, 6)} direction='column'>
        <Flex>
          <Box display='flex' width={variants('80px', '150px')} height={variants('80px', '150px')} mr={variants(4, 6)}>
            <Image src={logo} flex={1} bg='gray.400' rounded='xl' />
          </Box>
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
            <Box display={variants('none', 'block')}>{actions}</Box>
          </Flex>
        </Flex>
        <Box display={variants('block', 'none')}>{actions}</Box>
      </Flex>
    </SubHeader>
  )
}
