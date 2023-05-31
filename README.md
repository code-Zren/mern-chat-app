# mern-chat-app
A simple MERN Stack Chat-App

To use this chat-app, first download the 2 folders,

First we will run **Server folder**, 
in your terminal (Server Folder), input "npm install" to install those packages
then make a .env file on the root folder and it has 3 configurations,

MONGO_URL= "YOUR MONGO URL"
PORT=5000
JWT_TOKEN=thisisanaccesstoken (or you can make your own token)
  
then in your terminal (server folder), input "npm run dev" and your server/backend will now work.
  
Second, on the **Client Folder**,
in your terminal (Client Folder), input "npm install" to install those packages
then "npm start" and our app is good to go.
  
Finally, in the "Face Chat" App, just sign-up first, (you can make two accounts so that you can make a conversation between those accounts),
you can make a conversation in real time, and this app has components of 
-	Login and account functionality
-	Contact list
-	Chat history
-	Contact headers and options
-	Chat composer
-	Notification
-	File upload
-	Avatar
-	Conference/Group Chat
  
 Note: After Logging In, if there is an error, just refresh the site and you're good to go, sometimes it gets error because of those style packages I installed,
 I will fix those some other time and change the styles from chakra-ui to react-boostrap instead.

