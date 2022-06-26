import { useMemo, useState } from 'react'
import ReactModal from 'react-modal'
import { sleep } from '../lib/sleep'

type AuthModalContent = {
  contentName: string
  isOpen: boolean
  onOk?: any
  onCancel?: any
}

export const useLogin = () => {
  // ログイン処理
  const login = async (responceStatus: string) => {
    switch (responceStatus) {
      case 'pass_warn':
        await setPassWarnModal()
        break
      case 'pass_over':
        await setPassOverModal()
        break
      default:
        break
    }
    console.log('success login!')
  }

  // フォーム処理
  const handleSubmit = async () => {
    console.log('送信中...')
    await sleep(3000)
    await setPassChangeSuccessModal()
    console.log('送信完了')
  }

  // モーダル処理
  const initModalState: AuthModalContent = {
    contentName: 'init',
    isOpen: false,
  }
  const [modalState, setModalState] = useState<AuthModalContent>(initModalState)
  const close = () => setModalState({ ...modalState, isOpen: false })

  // パスワード期限警告モーダル
  const setPassWarnModal = async () => {
    return await new Promise<void>((resolve) => {
      const onOk = async () => {
        await setPassChangeModal()
        resolve()
      }
      const onCancel = () => {
        close()
        resolve()
      }
      setModalState({
        contentName: 'パスワード期限警告',
        isOpen: true,
        onCancel,
        onOk,
      })
    })
  }

  // パスワード期限切れモーダル
  const setPassOverModal = async () => {
    return await new Promise<void>((resolve) => {
      const onOk = async () => {
        await setPassChangeModal()
        resolve()
      }
      const onCancel = () => {
        close()
        resolve()
      }
      setModalState({
        contentName: 'パスワード期限切れ',
        isOpen: true,
        onCancel,
        onOk,
      })
    })
  }

  // パスワード変更モーダル
  const setPassChangeModal = async () => {
    return await new Promise<void>((resolve) => {
      const onOk = async () => {
        await handleSubmit()
        setModalState({ ...modalState, isOpen: false })
        resolve()
      }
      const onCancel = () => {
        setModalState({ ...modalState, isOpen: false })
        resolve()
      }
      setModalState({
        contentName: 'パスワード変更フォーム',
        isOpen: true,
        onCancel,
        onOk,
      })
    })
  }

  // パスワード変更成功モーダル
  const setPassChangeSuccessModal = async () => {
    return await new Promise<void>((resolve) => {
      const onOk = async () => {
        close()
        resolve()
      }
      const onCancel = () => {
        close()
        resolve()
      }
      setModalState({
        contentName: 'パスワード変更成功',
        isOpen: true,
        onCancel,
        onOk,
      })
    })
  }

  // パスワード変更失敗モーダル
  const setPassChangeFailModal = async () => {
    return await new Promise<void>((resolve) => {
      const onOk = async () => {
        setPassChangeModal()
        resolve()
      }
      const onCancel = () => {
        close()
        resolve()
      }
      setModalState({
        contentName: 'パスワード変更失敗',
        isOpen: true,
        onCancel,
        onOk,
      })
    })
  }

  const AuthModals: React.FC = () => {
    return (
      <ReactModal isOpen={modalState.isOpen!}>
        {modalState.contentName}
        <button onClick={modalState.onCancel}>キャンセル</button>
        <button onClick={modalState.onOk}>OK</button>
      </ReactModal>
    )
  }

  return {
    login,
    AuthModals,
  }
}
