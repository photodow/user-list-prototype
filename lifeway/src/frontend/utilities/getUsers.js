export default () => {
  return fetch(`${process.env.API_DEV_HOST || ''}/api/users`)
    .then(r => r.json());
};
