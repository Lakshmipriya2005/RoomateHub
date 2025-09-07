import { useState } from 'react'
import Page from './page'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Page />
    </>
  )
}

export default App
