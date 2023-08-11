import { FC, useState } from 'react'
import { Fade, Image, ImageProps, Skeleton, useImage } from '@chakra-ui/react'

import note from '../../assets/note.svg'
import { useThemeColors } from '../../hooks/useThemeColors.ts'
import { variants } from '../../utils/size.ts'

type TProps = ImageProps

const SVG = '.svg'

export const AppImage: FC<TProps> = ({ ...props }) => {
  const { imagePlaceholder } = useThemeColors()
  const [load, setLoad] = useState(false)
  const src = props.src
  const status = useImage({ src })

  if (!src) {
    return (
      <Image
        {...props}
        src={note}
        background={imagePlaceholder}
        objectFit={'cover'}
        p={variants('30px', '50px')}
        objectPosition={'center'}
      />
    )
  }

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
