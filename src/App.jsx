import Body from "./components/Body";
import "./App.css";
import { Provider } from "react-redux";
import appStore from "../src/Utils/Redux/appStore";
import { createBrowserRouter, RouterProvider } from 'react-router';
import Error from "./components/Error";
import Login from './components/Login';
import Browse from './components/Browse';
import AdminPanel from "./components/AdminPanel";
import AdminLogin from "./components/AdminLogin";
import Roadmap from "./components/Roadmap";
import SubjectSelector from "./components/SubjectSelector";
import Home from "./components/Home";


function App() {
  
  const AppRouter = createBrowserRouter([

    {

        path:'/',
        element:<Body/>,
        errorElement:<Error/>,
        children:[
          {
            path:'/',
            element:<Login/>
          },
          {
            path:'/home',
            element:<Home/>
          },
          {
            path: '/adminlogin',
            element: <AdminLogin/>
          },
          {
            path: '/admin',
            element: <AdminPanel/>
          },
          {
            path: '/browse',
            element:<Browse/>
          },
          {
            path: '/progress',
            element: <Roadmap/>
          },
          {
            path: '/quiz',
            element: <SubjectSelector/>
          }
        ]
   
    },


]);

  return (
    <>
      <Provider store={appStore}>
        <RouterProvider router={AppRouter}>
        
        </RouterProvider>
      </Provider>
    </>
  );
}

export default App;
