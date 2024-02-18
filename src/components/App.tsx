import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@mui/material';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { theme } from '../config/theming';
import { getApolloClient } from '../graphql/apollo/apollo';
import useLocalStorage from '../hooks/useLocalStorage';
import Homepage from './pages/offline/Homepage';
import './App.scss';
import AutoLoginProvider from './providers/AutoLoginProvider';

const onlineRouter = createBrowserRouter([
  {
    path: "/",
    element: <div>dashboard</div>
  },
]);

const App = () => {
  const { get } = useLocalStorage();

  return (
    <ApolloProvider client={getApolloClient(get('bearer-token', ''))}>
      <ThemeProvider theme={theme}>
        <AutoLoginProvider offlineComponent={<Homepage />}>
          <RouterProvider router={onlineRouter} />
        </AutoLoginProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
