let accessToken = null;

/*
OAuth2 = Delegated Authorization
- Let this app access some of my data, but don’t give it my password.

- Example: Imagine logging into Spotify with Google instead of typing your Google password.
  You never give Spotify your Google password — you just grant limited access to your data.
  This prevents a security nightmare where every app asks:
  “Type your Google password here.”
  OAuth solves that by using tokens instead of passwords.

- Who is who in this example:

  👤 Resource Owner → You, the user who owns the data (your Google account)
  🖥 Client → Spotify, the app requesting access to your Google data
  🏢 Authorization Server → Google login service (where you authenticate and grant permission)
  📦 Resource Server → Google APIs (like Gmail, Google Calendar) that actually hold the data
*/

it('GET access token from auth server', () => {

    it('GET access token from auth server', () => {

   /*
This request simulates the OAuth2 "client talking to the authorization server" step:

- 👤 Resource Owner: The GitHub user who granted permission (you)
- 🖥 Client: Your Cypress test app (the GitHub OAuth App you registered)
- 🏢 Authorization Server: GitHub (/login/oauth/access_token)
- 📦 Resource Server: GitHub API (not called yet in this step)

What happens here:

1. The client sends its client_id, client_secret, and the authorization code obtained 
   after the user granted access. 

   ⚠️ Important for testing:
   - The authorization code is short-lived and must be renewed each time you run the tests.
   - To get a new code manually, open in a browser:
     https://github.com/login/oauth/authorize?client_id=Ov23li66K6PnQmbi7EY4
   - Authorize the app and copy the new code from the redirected URL.

2. GitHub (authorization server) verifies the code and client credentials.

3. GitHub returns an access token, which the client can use to access the resource server 
   (e.g., user repos) without needing the user's password.

This avoids asking the user for their password directly, keeping OAuth2 secure.
*/

    cy.request({
        method: "POST",
        url: "https://github.com/login/oauth/access_token",
        qs: {
            client_id: "Ov23li66K6PnQmbi7EY4",       // identifies the client app -> taken from github settings, oauth apps. create new if needed
            client_secret: "388db14c47959ab3dd3f7cee68d7073e296a20e8", // secret for the client app -> taken from github settings, oauth apps. create new if needed
            code: "87ddd761933bae731e45"              // temporary code issued after user authorization
        }
    })
    .then((response) => {
        expect(response.status).eq(200) // response contains access_token
        const responseParams = response.body.split("&")
        accessToken = responseParams[0].split("=")[1]  // store the OAuth2 access token
    })
})
    cy.request({
        method: "POST",
        url: "https://github.com/login/oauth/access_token",
        qs: {
            client_id: "Ov23li66K6PnQmbi7EY4",       // identifies the app (client) requesting access
            client_secret: "388db14c47959ab3dd3f7cee68d7073e296a20e8", // secret for the client app
            code: "87ddd761933bae731e45"              // temporary authorization code from GitHub (user granted permission)
        }
    })
        .then((response) => {
            expect(response.status).eq(200) // response contains access_token
            const responseParams = response.body.split("&")
            accessToken = responseParams[0].split("=")[1]  // store the OAuth2 access token
        })
})


it('GET response from resource server with accessToken', () => {

    /*
    This request simulates the OAuth2 "client talking to the resource server" step:

    - 👤 Resource Owner: The GitHub user who granted permission (you)
    - 🖥 Client: Your Cypress test app (the GitHub OAuth App you registered)
    - 🏢 Authorization Server: GitHub (already issued the access token in previous step)
    - 📦 Resource Server: GitHub API (/user/repos), which stores the user's data

    What happens here:
    1. The client includes the access token in the Authorization header.
    2. The resource server (GitHub API) validates the token.
    3. If valid, the resource server returns the requested data (user repositories).
    4. The client can now use this data without ever having the user's password.

    This step demonstrates how OAuth2 provides secure, delegated access:
    the client can fetch user data safely using a token issued by the authorization server.
    */

    cy.request({
        method: "GET",
        url: "https://api.github.com/user/repos",      // resource server endpoint
        headers: {
            Authorization: "Bearer " + accessToken      // OAuth2 token gives permission to access user data
        }
    })
    .then((response) => {
        expect(response.status).eq(200) // successful access using OAuth2 token
    })
})