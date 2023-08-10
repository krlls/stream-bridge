import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Text } from '@chakra-ui/react'

export const Playlist: FC = () => {
  const { id, type } = useParams()

  return (
    <Text>
      Playlist {type} {id}
    </Text>
  )
}
