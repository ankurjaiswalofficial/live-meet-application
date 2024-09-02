import React from 'react'
import Header from './components/header/Header'
import Main from './components/main/Main'

const Base = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
            <Header/>
            <Main/>
        </div>
  )
}

export default Base
