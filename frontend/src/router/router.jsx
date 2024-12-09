import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import User from '../components/User/User'
import AppLayout from '../components/Layout/Layout';
import { Posts } from '../components/Post/Posts';
import { Post } from '../components/Post/Post';
import { useSelector } from 'react-redux';

const PublicRoute = ({children}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  return isAuthenticated? <Navigate to="/user" />: children
}

const PrivateRoute = ({children}) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    return isAuthenticated? children: <Navigate to="/login" />
}

export const router = createBrowserRouter([
  {
    element: <AppLayout />, children: [
      {
        path: "/",  
        element: <PublicRoute><Login /></PublicRoute>, 
      },
      {
        path: "/login",  
        element: <PublicRoute><Login /></PublicRoute>, 
      },
      {
        path: "/register",  
        element:  <PublicRoute><Register /></PublicRoute>,
      },
      {
        path: "/user",  
        element: <PrivateRoute><User /></PrivateRoute>,
      },
      {
        path: "/posts",  
        element: <PrivateRoute><Posts /></PrivateRoute>,
      },
      {
        path: "/posts/:id",  
        element: <PrivateRoute><Post /></PrivateRoute>,
      },
    ]
  }
]);

export default router;