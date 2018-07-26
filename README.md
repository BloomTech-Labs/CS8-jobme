# CS8-jobme

RESTful API for Jobme. In addition to serving static pages from the React client build folder at [the root directory](https://jobitduder.herokuapp.com/), it also serves the JSON data that comprises the backend at [the api directory](https://jobitduder.herokuapp.com/api/) using the following endpoints.

## API Endpoints

| Type | Path (/api)             | Body          | Token Type | Response          |
| ---- | ----------------------- | -----------------  | ---------- | ----------------- |
| GET  | /employers              | --                 | --         | List of Employers |
| POST | /employers/register     | (New Employer)     | --         | New Employer      |
| POST | /employers/login        | email, password    | --         | Success, Token    |
| GET  | /employers/profile      | --                 | Employer   | Employer          |
| PUT  | /employers/profile      | (Changes)            | Employer   | Employer          |
| PUT  | /employers/password     | oldPassword, newPassword| Employer   | Employer          |
| GET  | /seekers                | --                 | --         | List of Seekers   |
| POST | /seekers/register       | (New Seeker)         | --         | New Seeker        |
| POST | /seekers/login          | email, password        | --         | Success, Token    |
| GET  | /seekers/profile        | --                 | Seeker     | Seeker            |
| PUT  | /seekers/profile        | (Changes)            | Seeker     | Seeker            |
| PUT  | /seekers/:seekerId/like | jobId             | Employer   | Match             |
| GET  | /jobs                   | --                 | Either     | Jobs              |
| POST | /jobs                   |(New Job)         | Employer   | New Job           |
| PUT  | /jobs/:jobId/like       | --                 | Seeker     | Match             |
| GET  | /jobs/matches           | --                 | Either     | Matched Jobs      |
| POST | /billing                | total, cart, source | Either     | Sucess/Error      |

**Example From Client:**

```javascript
axios
  .post("https://jobitduder/herokuapp.com/api/employers/register", {
    email,
    password,
    companyName,
    companyUrl,
    description,
    industry
  })
  .then(response => {
    dispatch({ type: REGISTER_SUCCESS, employer: response.data });
  })
  .catch(err => {
    dispath({ type: REGISTER_ERROR, message: err.data });
  });
```

## Route Details

### Log-In

- [POST] request to `/employers/login` and `/seekers/login` requires an JSON request body containing email address and a password.
- Response body will consist of `{ success, token }`.

### Register New Employer

- [POST] request to `/employers/register` takes the following string fields from a JSON document in request body (\*required):
  - email\*
  - password\*
  - companyName\*
  - companyUrl\*
  - description\*
  - industry\*
- Response body will contain new `{ employer }` document to confirm success

### Register New Seeker

- [POST] request to `/seekers/register` takes the following string fields from a JSON document in request body (\*required):
  - email\*
  - password\*
  - firstName\*
  - lastName\*
  - desiredTitle
  - summary\*
  - topSkills\*
  - education\*
  - experience\*
  - additionalSkills
  - familiarWith
- Response body will contain new `{ seeker }` document to confirm success

### Making Changes to Users
- Seekers and employers can both receive changes via a [PUT] request to `jobSeekers/profile` and `employers/profile` repectively. Password changes can be made via a [PUT] request to `jobSeekers/password` or `employers/password`. Password changes take two fields, `oldPassword`, and `newPassword`. If the oldPassword matches the one on the appropriate user document, the document is returned in the response.

### Charging for Services
- Charges can be made via a [POST] request to `/api/billing/` with the following items
  - source - your token id from Stripe
  - cart - any item intended to be purchased
  - amount - the total amount in cents to be charged
- Response will contain information from stripe, as well as the updated user document with purchases added.

### Log-Out
- User will log out locally by destroying token on localStorage. No action needs to be take from the API. If no logout, Tokens will automatically expire on the server after 12 hours.

### Create a New Job
- [POST] request to `/jobs/` requires a signed JWT retrieved from successful [POST] to /employers/login. 
- Request takes the following string fields from a JSON document in request body (\*required):
  - titleAndSalary
  - topSkills
  - additionalSkills
  - familiarWith
  - description
- Response body will contain new `{ job }` document to confirm success

### Like a Job
- [PUT] request to `/jobs/like/:jobId` requires a signed JWT retrieved from successful [POST] to /seekers/login. 
- Nothing is needed in the body. 
- Response body contains a boolean value for `match`, indicating whether the seeker has already been liked for the job.

### Like a Seeker for a Job
- [PUT] request to `/seekers/like/:seekerId` requires a signed JWT retrieved from successful [POST] to `/employers/login`. 
- Request body must be a JSON document containing a field `jobId` that is the ObjectId of a job associated with the authenticated employer.
- Response body contains a boolean value for `match`, indicating whether the job has already been liked by the seeker.

### View Job Matches
- [GET] request to `/jobs/matches` requires a signed JWT retrieved from a successful [POST] to either `/employers/login` or `/seekers/login`.
- Response body for employer contains a list of employer's jobs populated with matched seeker documents
- Response body for seeker contains a list of matched jobs
