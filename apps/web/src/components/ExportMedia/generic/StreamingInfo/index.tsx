import { FC } from 'react'
import { EStreamingType } from 'api-types'
import { Avatar, Box, Card, CardBody, Flex, Text } from '@chakra-ui/react'
import { capitalize } from 'lodash'
import { ArrowForwardIcon } from '@chakra-ui/icons'

import { streamingToLogo } from '../../../../utils/image.ts'

type TProps = {
  originStreamingType: EStreamingType,
  targetStreamingType: EStreamingType,
}

export const StreamingInfo: FC<TProps> = ({ originStreamingType, targetStreamingType }) => {
  return (
    <Flex direction='row' justify='space-between' flex={1} maxWidth='500px'>
      <StreamingCard type={originStreamingType} />
      <Flex align='center'>
        <ArrowForwardIcon boxSize={20} color='gray.500' />
      </Flex>
      <StreamingCard type={targetStreamingType} />
    </Flex>
  )
}

function StreamingCard({ type }: { type: EStreamingType }) {
  return (
    <Card bg='gray.800' border='2px' borderColor='gray.600' width='120px' height='150px'>
      <CardBody display='flex' flexDirection={'column'} overflow='hidden' alignItems={'center'} justifyContent='center'>
        <Box>
          <Avatar src={streamingToLogo(type)} mb={2} />
        </Box>
        <Text align='center' noOfLines={2}>
          {capitalize(type)}
        </Text>
      </CardBody>
    </Card>
  )
}
