export default function getUsers () {
  return fetch(`${process.env.REACT_APP_API_DEV_HOST || ''}/api/users`)
    .then(r => r.json());
};
