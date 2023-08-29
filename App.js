import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './src/components/Header';
import Body from './src/components/Body';
import About from './src/components/About';
import Contact from './src/components/Contact';
import Error from './src/components/Error';
import RestaurentMenu from './src/components/RestaurentMenu';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
//code splitting
//chunking
//dynamic bundling
//lazy loading
//dynamic import
//on-demand loading
const Grocery = lazy(() => import('./src/components/Grocery'));

const AppClient = () => {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
};
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppClient />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/grocery',
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      { path: '/contact', element: <Contact /> },
      { path: '/restaurents/:resId', element: <RestaurentMenu /> },
    ],
    errorElement: <Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
