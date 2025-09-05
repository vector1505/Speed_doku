import { useState } from 'react'
import './App.css'
import StartMenu from './components/StartMenu'
import SudokuMasterApp from './components/SudokuMasterApp'
import Leaderboard from './components/Leaderboard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <StartMenu />
    </>
  )
}

export default App
