import { FC } from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { ArrowForwardIcon, DownloadIcon, RepeatIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

import { SubHeader } from '../SubHeader'
import { useLocalization } from '../../hooks/useLocalization.ts'
import { PopoverConfirmation } from '../PopoverConfirmation'
import { NavBar } from '../NavBar'

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
        <PopoverConfirmation
          onOk={onImport}
          title={t(d.ImportConfirmationTitle)}
          message={t(d.ImportConfirmationMessage, { streaming: title })}
        >
          <Button isLoading={isImporting} leftIcon={playlists ? <RepeatIcon /> : <DownloadIcon />}>
            {playlists ? t(d.Update) : t(d.Import)}
          </Button>
        </PopoverConfirmation>
        <Button rightIcon={<ArrowForwardIcon />} disabled={!playlists}>
          {t(d.Export)}
        </Button>
      </ButtonGroup>
    </SubHeader>
  )
}
