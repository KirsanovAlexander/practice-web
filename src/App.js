import React, {useEffect} from 'react'
import {Preorder} from './models'

function App() {
  useEffect(() => {
    Preorder.find(21).then(result => console.log(result))
  
    Preorder.search({preorderTypeId: 1, perPage: 5, page: 2}).then(results => console.log(results))
  }, [])

  return <p>Hello!</p>
}

export default App
