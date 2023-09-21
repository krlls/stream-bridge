import { FC, useMemo, useState } from 'react'
import { Box, Button, Container, Divider, DrawerFooter, Heading } from '@chakra-ui/react'

import { IStrategy, TProps } from './index.inerfaces.ts'
import { Strategy } from './Strategy'
import { ExportContextProvider } from './ExportContext'
import { useLocalization } from '../../hooks/useLocalization.ts'
import { CardItem } from './generic/CardItem'

export const ExportMedia: FC<TProps> = ({ strategies, streamingType, playlistId }) => {
  const [selected, setSelected] = useState(false)
  const [strategy, setStrategy] = useState<number>(-1)
  const { t, d } = useLocalization()
  const preparedStrategies = useMemo<IStrategy[]>(() => strategies.map((s) => s(t as any, d)), [strategies])
  const emptyStrategy = strategy === -1

  if (selected && !emptyStrategy) {
    return (
      <ExportContextProvider
        originStreamingType={streamingType}
        playlistsIds={playlistId !== undefined ? [playlistId] : []}
      >
        <Strategy strategy={preparedStrategies[strategy]} />
      </ExportContextProvider>
    )
  }

  return (
    <Box>
      <Container>
        <Heading mb={4} size={'xl'}>
          {t(d.Export)}
        </Heading>
        {preparedStrategies.map((s, i) => (
          <CardItem title={s.name} isSelected={strategy === i} onClick={() => setStrategy(i)} />
        ))}
      </Container>
      <Divider my={5} />
      <DrawerFooter>
        <Button onClick={() => setSelected(true)} isDisabled={emptyStrategy}>
          {t(d.Next)}
        </Button>
      </DrawerFooter>
    </Box>
  )
}
