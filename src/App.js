import React, {useEffect} from 'react'
import {Preorder} from './models'

function App() {
  useEffect(() => {
    const item = Preorder.find(21)
    console.log(item)
  }, [])

  return <p>Hello!</p>
}

export default App
