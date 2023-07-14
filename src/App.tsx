import React, { useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Preorder as PreorderModel } from './models'
import { Page } from './components'
import { Preorders, Preorder, Configurations, Environments, Datacenters, PreorderTypes} from './pages'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Page><Preorders /></Page>,
  },
  {
    path: "preorders/:id",
    element: <Page><Preorder /></Page>,
  },
  {
    path: '/preorders',
    element: <Page><Preorders /></Page>,
  },
  {
      path: '/configurations',
      element: <Page><Configurations /></Page>,
    },
  {
    path: '/environments',
    element: <Page><Environments /></Page>,
  },
  {
    path: '/data-centers',
    element: <Page><Datacenters /></Page>,
  },
  {
    path: '/preorderTypes',
    element: <Page><PreorderTypes /></Page>,
  },

]);

function App() {
  useEffect(() => {
    PreorderModel.find(21).then(result => console.log(result))

    PreorderModel.search({ preorderTypeId: 1, perPage: 5, page: 2 }).then(results => console.log(results))
  }, [])

  return <RouterProvider router={router} />
}

export default App
