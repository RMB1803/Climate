import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/button'
import Layout from './components/component/Layout'

function App() {

  return (
    <BrowserRouter>
      <Layout>Hello</Layout>
      {/* <Routes>
        <Route />
      </Routes> */}
    </BrowserRouter>
  )
}

export default App
