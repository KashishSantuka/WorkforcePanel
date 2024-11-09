import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  let auth = localStorage.getItem("token");

  console.log("PrivateRoutes - Auth token:", auth);

return (
    auth ? <Outlet/> : <Navigate to='/'/>
  )
}

export default PrivateRoutes

// import { Navigate, Outlet } from 'react-router-dom';

// const PrivateRoutes = () => {
//   const auth = localStorage.getItem("token");

  // Check if token exists and is valid (adjust condition as necessary)
  // if (!auth) {
    // If no token, redirect to login page
//     return <Navigate to="/" />;
//   }

//   return <Outlet />;
// };

// export default PrivateRoutes;

// import { Navigate, Outlet } from 'react-router-dom';

// const PrivateRoutes = () => {
//   const auth = localStorage.getItem("token");

//   // Log the token to check if it's being set correctly
//   console.log("Token from localStorage: ", auth);

//   if (!auth) {
//     // If token is not found, redirect to login page
//     return <Navigate to="/" />;
//   }

//   // If token exists, show protected content
//   return <Outlet />;
// };

// export default PrivateRoutes;

