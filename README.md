# identity-dump
Use your Mailgun account credentials to start sending mails.<br />
<br />
Get up and running<br />
1. git clone https://github.com/tarun-bathwal/identity-dump.git <br />
2. cd identity-dump<br />
3. npm install<br />
4. create a .env file in the root folder and enter the following code in it:<br />
mailgunkey=your_mailgun_key<br />
mailgundomain=your_mailgun_domain<br />
If you don't perform this step, then the server doesn't work<br />
If you don't have a valid mailgunkey or mailgundomain, the server won't be able to send you the email, though it will still create an entry in the required file. So, even if you don't have mailgun key and domain, enter any string without quotes in the .env file<br />
4. npm run test // this command runs the tests. All the 6 tests must pass correctly. Data is written in testuser.txt file in the root folder. On every test run, testuser.txt is deleted and created new, so it will have only one entry at max.<br />
5. npm run start // this starts the development server. You can now use POSTMAN to hit the APIs. Data is written and read from the users.txt file in the root folder.<br />
6. Access the APIs at localhost:3000/ <br />
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

