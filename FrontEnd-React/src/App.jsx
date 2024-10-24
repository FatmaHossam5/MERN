import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import News from './Component/GetNews/News'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NewsDetails from './Component/NewsDetails/NewsDetails';

function App() {


  const routes = createBrowserRouter([
    {
      path: '/',
      element: <News />,
    },
    {
      path: '/details',
      element: <NewsDetails />,
    },
  ])
  return (
    <RouterProvider router={routes} />
  )
}

export default App
