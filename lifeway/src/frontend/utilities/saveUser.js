export default function saveUser (user) {
  return fetch(`${process.env.REACT_APP_API_DEV_HOST || ''}/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(r => r.json());
};

// curl -X POST --location "http://localhost:8080/api/user" -H "Content-Type: application/json"  -d '{ "name": "Testing testing", "email": "asdf asdf asd", "phone": "" }'
