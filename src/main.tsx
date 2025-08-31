import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css'
import App from './App.tsx'
import MovieDetail from './MovieDetail.tsx'

const router = createBrowserRouter([
  { path: "/", Component: App },
  { path: "/movies/:movieId", Component: MovieDetail },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
