import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import JoinPage from '../pages/JoinPage'
import TestPage from '../pages/TestPage'

const MainRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/join' element={<JoinPage />} />
        <Route path='/test/spring_test' element={<TestPage />} />


    </Routes>
  )
}

export default MainRouter