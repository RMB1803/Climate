import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Layout from './components/component/Layout'
import { ThemeProvider } from './context/theme-provider'
import WeatherDashboard from './pages/WeatherDashboard.tsx'
import CityPage from './pages/CityPage.tsx'

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme='dark'>
          <Layout>
            <Routes>
              <Route path='/' element={<WeatherDashboard />} />
              <Route path='/city/:cityName' element={<CityPage />}/>
            </Routes> 
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
