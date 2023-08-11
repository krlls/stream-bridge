import { FC, useState } from 'react'
import { Fade, Image, ImageProps, Skeleton, useImage } from '@chakra-ui/react'

type TProps = ImageProps

const SVG = '.svg'

export const AppImage: FC<TProps> = ({ ...props }) => {
  const [load, setLoad] = useState(false)
  const src = props.src
  const status = useImage({ src })

  if (src && src?.substring(src.length - SVG.length, src.length) === SVG) {
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
