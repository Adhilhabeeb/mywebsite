import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThreeBox from './Experence/Canvas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ThreeBox/>
    </>
  )
}

export default App
