# Books&Reviews - React app for book reviews

Simple app for users to review books, created with React.js, Node.js, and MongoDB.

## Table of contents

* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info

This was created as a personal project to build an app with full CRUD functionality. 

There is a section to create a user, which will be saved into the MongoDB. After creating a user you can add a book by choosing its title, review, and the user who is making the review. 

Once the book is added to the database, then you can check all the users and the books in their respective sections on the top menu.

You can modify the user's name and the reviews, including the book's title, review and score. All changes will reflect on the other elements. i.e. If you change the name of a user, all the books written by that user will also change the creator's name.

The app also lets you delete users and reviews. 

PENDING: Once you delete a user, the reviews by that user remain, so it is necessary to fix that.
	
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

Search for the http://localhost:3000 domain on your broser to see the project.
