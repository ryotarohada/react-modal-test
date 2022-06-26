import { useState } from 'react'
import { useLogin } from './hooks/useLogin'
import { useModal } from './hooks/useModal'
import { sleep } from './lib/sleep'

function App() {
  const { Modal, isOpen, open, close } = useModal()
  const { login, AuthModals } = useLogin()

  return (
    <div className='App'>
      <button onClick={() => login('pass_warn')}>login</button>
      <AuthModals></AuthModals>
    </div>
  )
}

export default App
