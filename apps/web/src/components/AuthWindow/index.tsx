import { FC } from 'react'
import NewWindow from 'react-new-window'

export type TProps = {
  isOpen: boolean,
  url: string,
  onClose?(): void,
}

export const AuthWindow: FC<TProps> = ({ isOpen, url, onClose }) => {
  return <>{isOpen && <NewWindow url={url} center='screen' onUnload={onClose} />}</>
}
