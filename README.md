# illusion-of-client-security-JS
A hands-on, interactive Node.js application built to demonstrate a critical cybersecurity principle: Client-side security measures are inherently vulnerable and can be easily bypassed. Real security must be enforced on the server.

**1- Client Bypass - Proving Client-Side is Untrustworthy:**
  - Enter the correct password by inspecting the source of index.html and viewing client-side.js which has the password.
  - Observe that both the client only is granted access, and the secret message is not displayed.

**2- The Defense - Proving Server-Side is Secure:**
  - After bypassing the client, click the button: "Ask the Server for the Real Secret".
    - <img width="640" height="589" alt="image" src="https://github.com/user-attachments/assets/8fc00a11-4835-4cde-8071-7fea59298c6b" />
    - <img width="533" height="201" alt="image" src="https://github.com/user-attachments/assets/7e0078f6-bb4b-41bb-b056-595f01cf6d55" />
  - The server will deny the request with a 401 Unauthorized error, even though the client-side UI is unlocked.
  - This proves the server is the final authority. Without the correct password, it refuses to send the sensitive data.
