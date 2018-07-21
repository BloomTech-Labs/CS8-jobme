# CS8-jobme

RESTful API for Jobme. Serves JSON data and static pages from the local `client/build`.

## API Endpoints

| Type | Path                    | Body         | Token Type | Response          |
| ---- | ----------------------- | ------------ | ---------- | ----------------- |
| GET  | /employers              | N/A          | N/A        | List of Employers |
| POST | /employers/register     | New Employer | N/A        | New Employer      |
| POST | /employers/login        | Credentials  | N/A        | Success, Token    |
| GET  | /employers/profile      | N/A          | Employer   | Employer          |
| GET  | /seekers                | N/A          | N/A        | List of Seekers   |
| POST | /seekers/register       | New Seeker   | N/A        | New Seeker        |
| POST | /seekers/login          | Credentials  | N/A        | Success, Token    |
| GET  | /seekers/profile        | N/A          | Seeker     | Seeker            |
| POST | /seekers/:seekerId/like | Job ID       | Employer   | Match (Boolean)   |
| GET  | /jobs                   | N/A          | Either     | Jobs              |
| POST | /jobs                   | New Job      | Employer   | New Job           |
| GET  | /jobs/:jobId/like       | N/A          | Seeker     | Match (Boolean)   |

## Route Details

### Log-In

- [POST] request to `employers/login` and `seekers/login` requires an email address and a password.  
- Response will consist of `{ success, token }`.

### Register New User

- [POST] request to `employers/register` requires the following fields:
  - email
  - password
  - companyName
  - companyUrl
  - description
  - industry
- Response will return `{ employer }` document to confirm success

### Log-Out

- User will log out locally by destroying token on localStorage.


- **Sample Call (React/Redux/Axios):**

  ```javascript
  axios.post('https://jobitduder/herokuapp.com/api/employers/register', {
      email,
      password,
      companyName,
      companyUrl,
      description,
      industry,
    }).then(response => {
        dispatch({ type: REGISTER_SUCCESS, employer: response.data })
    }).catch(err => {
        dispath({ type: REGISTER_ERROR, message:err.data })
    })
  });
  ```
