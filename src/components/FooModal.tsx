import ReactModal, { Props as ReactModalProps } from 'react-modal'

type Props = {} & ReactModalProps

export const FooModal: React.FC<Props> = ({ isOpen }) => {
  return <ReactModal isOpen={isOpen}></ReactModal>
}
