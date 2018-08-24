# identity-dump
Use your Mailgun account credentials to start sending mails.<br />
<br />
Get up and running<br />
1. git clone https://github.com/tarun-bathwal/identity-dump.git <br />
2. cd identity-dump<br />
3. npm install<br />
  //MAKE SURE YOU EDIT THE ./controllers/users.js file to include your own mailgun api key and mailgun domain to get the email     services started.<br />
4. npm run test // this command runs the tests. All the 6 tests must pass correctly.<br />
5. npm run start // this starts the development server. You can now use POSTMAN to hit the APIs.<br />
<br />
<br />
APIs
<br />
POST /write<br />
KEYS ( payload ) : name email birthday<br />
send as x-www-form-urlencoded ( from postman ) <br />
name is of type string, email is of type email, birthday is a date of format 'YYYY-MM-DD'<br />
on success, it returns<br />
{<br />
  "message":"successfully written to text file"<br />
}<br />
<br />
GET /all<br />
Since this is get request, no keys are required. Authorization has not been included for this api.<br />
on success, it returns all the users.<br />
<br />
GET /latest<br />
Since this is get request, no keys are required. Authorization has not been included for this api.<br />
on success, it returns a JSON of the latest user that was added through the POST/write API.<br />
<br />
GET /{number}<br />
Since this is get request, no keys are required. However, you need to pass a valid natural number in request parameter. For example, GET /2 returns the second user from the list of all users. Authorization has not been included for this api.<br />
<br />

