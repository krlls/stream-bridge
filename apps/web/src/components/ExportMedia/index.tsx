import { FC, useMemo, useState } from 'react'
import { Box, Button, Card, CardHeader, Container, Divider, Heading } from '@chakra-ui/react'

import { IStrategy, TProps } from './index.inerfaces.ts'
import { Strategy } from './Strategy'
import { ExportContextProvider } from './ExportContext'
import { useLocalization } from '../../hooks/useLocalization.ts'

export const ExportMedia: FC<TProps> = ({ strategies }) => {
  const [selected, setSelected] = useState(false)
  const [strategy, setStrategy] = useState<number>(-1)
  const { t, d } = useLocalization()
  const preparedStrategies = useMemo<IStrategy[]>(() => strategies.map((s) => s(t as any, d)), [strategies])

  if (selected && strategy !== -1) {
    return (
      <ExportContextProvider>
        <Strategy strategy={preparedStrategies[strategy]} />
      </ExportContextProvider>
    )
  }

  return (
    <Container>
      <Heading mb={4} size={'xl'}>
        {t(d.Export)}
      </Heading>
      {preparedStrategies.map((s, i) => (
        <Card
          my={2}
          bgColor={strategy === i ? 'gray.600' : 'gray.800'}
          cursor='pointer'
          onClick={() => setStrategy(i)}
          _hover={{ bgColor: strategy === i ? 'gray.600' : 'gray.750' }}
          transition={'0.2s'}
        >
          <CardHeader>{s.name}</CardHeader>
        </Card>
      ))}
      <Divider my={5} />
      <Box>
        <Button onClick={() => setSelected(true)}>Next</Button>
      </Box>
    </Container>
  )
}
