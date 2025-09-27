
import './App.css'
import Home from './PAGES/Home.jsx';
import Contact from './PAGES/Contact.jsx'
import Layout from './Layout.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './PAGES/About.jsx';
import Services from './PAGES/Services.jsx';
import ResearcherZone from './PAGES/ResearcherZone.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
const router=createBrowserRouter([{
  element:<Layout/>,
  path:'/',
  children:[
    {
      element:<Home/>,
      path:''
    },{
      element:<About/>,
      path:'/about'
    },
    {
      element:<Contact/>,
      path:'/contact'
    },
    {
      element:<Services/>,
      path:'/services',
    },
    {
      element: (
         <ProtectedRoute>
           <ResearcherZone />
         </ProtectedRoute>
      ),
      path: '/services/nft',
    }

  ]
}])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
