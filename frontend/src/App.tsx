// src/App.tsx
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <RouterProvider router={router} />
    </>
  )
}

export default App;