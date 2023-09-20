import { FC } from 'react'
import { Button, ButtonGroup, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ArrowForwardIcon, DownloadIcon, HamburgerIcon, RepeatIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { EStreamingType } from 'api-types'

import { SubHeader } from '../SubHeader'
import { useLocalization } from '../../hooks/useLocalization.ts'
import { PopoverConfirmation } from '../PopoverConfirmation'
import { NavBar } from '../NavBar'
import { AppDrawer } from '../AppDrawer'
import { ExportMedia } from '../ExportMedia'
import { MainStrategies } from '../ExportMedia/Strategies.ts'

interface TProps {
  title: string,
  playlists: number,
  tracks: number,
  logo?: string,
  isImporting: boolean,
  type: EStreamingType,
  onImport(): void,
  onImportMedia(): void,
}

export const StreamingSubHeader: FC<TProps> = ({
  title,
  playlists,
  tracks,
  logo,
  onImport,
  isImporting,
  onImportMedia,
  type,
}) => {
  const { t, d } = useLocalization()
  const navigate = useNavigate()

  return (
    <SubHeader
      image={logo}
      title={title}
      tags={[
        { title: `${t(d.Playlists)} ${playlists}`, color: 'green' },
        { title: `${t(d.Tracks)} ${tracks}`, color: 'blue' },
      ]}
      topCmp={<NavBar iconClick={() => navigate('/Profile?tab=1')} left={false} />}
    >
      <ButtonGroup mt={4} isAttached variant='outline' size='sm'>
        <Menu>
          <MenuButton isDisabled={isImporting} as={IconButton} icon={<HamburgerIcon />} />
          <MenuList>
            <MenuItem onClick={onImport}>{playlists ? t(d.UpdatePlaylists) : t(d.ImportPlaylists)}</MenuItem>
          </MenuList>
        </Menu>
        <PopoverConfirmation
          onOk={onImportMedia}
          title={t(d.ImportConfirmationTitle)}
          message={t(d.ImportConfirmationMessage, { streaming: title })}
        >
          <Button isLoading={isImporting} leftIcon={playlists ? <RepeatIcon /> : <DownloadIcon />}>
            {playlists ? t(d.Update) : t(d.Import)}
          </Button>
        </PopoverConfirmation>
        <AppDrawer
          trigger={
            <Button rightIcon={<ArrowForwardIcon />} disabled={!playlists}>
              {t(d.Export)}
            </Button>
          }
          placement='right'
          size='xl'
        >
          <ExportMedia strategies={MainStrategies} streamingType={type} />
        </AppDrawer>
      </ButtonGroup>
    </SubHeader>
  )
}
