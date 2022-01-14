export default function getUser (id) {
  return fetch(`${process.env.REACT_APP_API_DEV_HOST || ''}/api/user/${id}`)
    .then(r => r.json());
};
