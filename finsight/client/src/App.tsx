// In finsight/client/src/App.tsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Toaster } from 'react-hot-toast';

// Define our application's routes
const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    // Any other path will redirect to the login page
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} /> {/* 2. Add Toaster component */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
