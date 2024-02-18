import './Homepage.scss';
import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { loggedIn, userConnected } from '../../../graphql/apollo/apollo';
import { useLoginLazyQuery, useMeLazyQuery } from '../../../graphql/generated';
import useLocalStorage from '../../../hooks/useLocalStorage';

const Homepage = () => {
  const [dto, setDto] = useState({ email: '', password: '' });
  const [login, { loading: isLogging }] = useLoginLazyQuery();
  const [ fetchCurrentUser ] = useMeLazyQuery();
  const { set } = useLocalStorage();

  const handleOnConnect = async () => {
    const { data } = await login({ variables: dto });

    if (!data) {
      return;
    }

    set('bearer-token', data.login);

    const { data: fetchedCurrentUser } = await fetchCurrentUser();

    if (fetchedCurrentUser) {
      loggedIn(true);
      console.log('fetchedCurrentUser', fetchedCurrentUser.me);
      userConnected(fetchedCurrentUser.me);
    }
  }

  return (
    <div className="container">
      <Typography variant="h3" component="h2" sx={{ mb: 2, mt: 2 }}>React UI Boilerplate</Typography>
      <TextField
        label="E-mail"
        variant="outlined"
        sx={{ mb: 2, width: '100%', maxWidth: 400 }}
        onChange={({ target: { value: email } }) => setDto({ ...dto, email })}
      />
      <TextField
        label="Mot de passe"
        type="password"
        variant="outlined"
        sx={{ mb: 2, width: '100%', maxWidth: 400 }}
        onChange={({ target: { value: password } }) => setDto({ ...dto, password })}
      />
      <Button variant="contained" disabled={isLogging} onClick={handleOnConnect}>Se connecter</Button>
    </div>
  );
}

export default Homepage;
