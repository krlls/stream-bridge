import { FC, useState } from 'react'
import { Fade, Image, ImageProps, Skeleton, useImage } from '@chakra-ui/react'

type TProps = ImageProps

export const AppImage: FC<TProps> = ({ ...props }) => {
  const [load, setLoad] = useState(false)
  const status = useImage({ src: props.src })

  if (props.src && props.src?.substring(props.src.length - 4, props.src.length) === '.svg') {
    return <Image {...props} />
  }

  return status === 'loaded' ? (
    <Fade in={load}>
      <Image {...props} fallbackStrategy={'onError'} onLoad={() => setLoad(true)} />
    </Fade>
  ) : (
    <Skeleton width='100%' height='100%' />
  )
}
