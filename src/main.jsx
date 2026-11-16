import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header'
import DespensaView from './despensa/components/DespensaView'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header>
      <DespensaView />
    </Header>
  </StrictMode>,
)
