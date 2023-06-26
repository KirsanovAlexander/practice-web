import React, {useEffect} from 'react'
import {Preorder} from './models'

function App() {
  useEffect(() => {
    Preorder.find(21).then(result => console.log(result))
  }, [])

  return <p>Hello!</p>
}

export default App
