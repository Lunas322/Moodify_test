
import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import MainBody from './components/MainBody'
import Layout from './components/Layout'

import { useState } from 'react'
import Login from './components/login'
import SignUp from './components/SignUp'
import History from './components/History'
import MyPage from './components/Mypage'
import Music from './components/music'


function App() {
  const [emojis] = useState([{mood: '기쁨',Emoji:'😀',types: 'happy'},{mood: '슬픔',Emoji:'😢',types: 'sad'},{mood:'화남',Emoji:'😠',types:'anger'},{mood:'스트레스',Emoji:'😣',types:'stress'}])


  return (
    <>
 
    <Routes>
    <Route path="/" element={<Layout />}>
          <Route index element={<MainBody emojis={emojis}/>} />
          <Route path="emotion/:emojitype" element={<>
          <Music emojis={emojis}/>
          </>} />
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/SignUp' element={<SignUp/>}></Route>
          <Route path='/History' element={<History/>}></Route>
          <Route path='/Mypage' element={<MyPage/>}></Route>
        </Route>
    </Routes>

    </>
  )
}

export default App
