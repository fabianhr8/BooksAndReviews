# librosResenas - React app for book reviews

Simple app for creating users who can review books, created with JS React, Node.js, and MongoDB.

## Table of contents

* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info

This was created as a personal project to build an app with full CRUD functionality. It is still under development, since right now it only has a Create and Read functionality.

There is a section to create a user, which will be saved into the MongoDB. After creating a user you can add a book by choosing its title, review, and the user who is making the review. Once the book is added to the database, then you can check all the users and the books in their respective sections on the top menu.
	
## Technologies

Project is created with:
* React version: 17.0.2
* Node.js version: 12.22.1
* MongoDB version: 3.6.8
	
## Setup

First, you need to have Node.js and MongoDB installed.

Then, after creating a React app, replace the files and folders with the ones on this repository, in the way that they are inside their respective folders.

Install the libraries under the .json file.

Run the MongoDB by using the command:
```
$ sudo service mongodb start
```
Now run the server by using the command:
```
$ nodemon server.js
```

Then your backend will be working. Now, to run the frontend of the project, on the main folder use:

```
$ npm start
```

Enter for the http://localhost:3000 local domain on your browser to see the project.
