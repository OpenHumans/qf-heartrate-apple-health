import axios from 'axios';
import {
  CLIENT_ID,
  CLIENT_SECRET,
  OPEN_HUMANS_BASE,
  REDIRECTOR_BASE,
} from '../common/config';

const transformRequest = (jsonData = {}) =>
  Object.entries(jsonData)
    .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    .join('&');

const handleOAuthRedirector = redirectorCode => {
  const codeFromRedirect = redirectorCode
    .split('code=')[1]
    .replace('&origin=external', '');
  const tokenResponsePromise = axios.post(
    `${OPEN_HUMANS_BASE}oauth2/token/`,
    {
      grant_type: 'authorization_code',
      code: codeFromRedirect,
      redirect_uri: REDIRECTOR_BASE,
    },
    {
      transformRequest: jsonData => transformRequest(jsonData),
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return tokenResponsePromise;
};

export {handleOAuthRedirector};
