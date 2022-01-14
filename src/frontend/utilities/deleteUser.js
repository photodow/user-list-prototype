export default function deleteUser (id) {
  return fetch(`${process.env.REACT_APP_API_DEV_HOST || ''}/api/user/${id}`,
    { method: 'DELETE' })
    .then(r => r.text());
};
