# StackUnderflow: The janky undergrad clone of StackOverflow

## Use this repository in 10 easy steps 

1. Install MySQL and create a database.
2. Clone the repo.
3. [Create an Azure Active Directory App Registration](https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-app-registration)
4. Modify that app registrations manifest file to allow redirects from:
   1. `http://localhost:3000/`
   2. `http://localhost:3000/*`
   3. `http://localhost:3000/question/*`
   4. `http://localhost:3000/search`
5. Create a file called `.env.local` in the project root directory.
6. Fill in the following details:
   ```
   NEXT_PUBLIC_SPA_CLIENT_ID=<your app registration client ID>
   MYSQL_HOST=127.0.0.1 [or the IP address of whatever computer is running your database]
   MYSQL_DATABASE=<your database name here>
   MYSQL_USERNAME=<your username here>
   MYSQL_PASSWORD=<your password here>
   ```
7. Run `npm install`
8. Run `npm run reset_tables`
9. Run `npm run dev`
10. Enjoy.
