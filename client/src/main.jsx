import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import StartMenu from "./components/StartMenu"
import SudokuMasterApp from "./components/SudokuMasterApp"
import Leaderboard from "./components/Leaderboard"
import NotFound from "./components/NotFound"
 
import { createBrowserRouter, RouterProvider } from 'react-router'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartMenu />,
    errorElement: <NotFound />
  },
  {
  path: "/Sudoku",
  element: <SudokuMasterApp />,
  errorElement: <NotFound />
},
{
  path: "/leaderboard",
  element: <Leaderboard />,
  errorElement: <NotFound />

}]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
