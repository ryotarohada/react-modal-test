import { useState } from 'react'
import ReactModal from 'react-modal'

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return {
    isOpen,
    open,
    close,
    Modal: ReactModal,
  }
}
