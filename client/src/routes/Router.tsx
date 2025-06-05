import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import NotFound from '../pages/NotFound';
import JobInventory from '../pages/JobInventory';
import JobSites from '../pages/JobSites';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <JobSites /> },

      { path: 'inventory/:id', element: <JobInventory /> },

      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
