import { FC } from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { ArrowForwardIcon, DownloadIcon, RepeatIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

import { SubHeader } from '../SubHeader'
import { useLocalization } from '../../hooks/useLocalization.ts'
import { NavBar } from '../NavBar'

interface TProps {
  title: string,
  tracks: number,
  isImporting: boolean,
  cover?: string,
  onImport?(): void,
}

export const PlaylistSubHeader: FC<TProps> = ({ title, tracks, cover, onImport, isImporting }) => {
  const { t, d } = useLocalization()
  const navigate = useNavigate()

  return (
    <SubHeader
      title={title}
      image={cover}
      tags={[{ title: `${t(d.Tracks)} ${tracks}`, color: 'green' }]}
      topCmp={<NavBar iconClick={() => navigate('/Profile?tab=1')} right={false} />}
      bgImage={cover}
    >
      <ButtonGroup mt={4} isAttached variant='outline' size='sm'>
        <Button onClick={onImport} isLoading={isImporting} leftIcon={tracks ? <RepeatIcon /> : <DownloadIcon />}>
          {tracks ? t(d.Update) : t(d.Import)}
        </Button>
        <Button rightIcon={<ArrowForwardIcon />} disabled={!tracks}>
          {t(d.Export)}
        </Button>
      </ButtonGroup>
    </SubHeader>
  )
}
