Ambiented Assisted Living (aal)
===

This repository holds the frontend and application layer of an interactive wall currently developed at the DAI.

## Setup

### play

1. Download play (http://downloads.typesafe.com/play/2.2.1/play-2.2.1.zip).
2. Extract the .zip and place it somewhere, create an `alias` to the `play` command. For this open your `.bashrc/.zsrrc` and add the line: `alias play="~/...where you put it.../play-2.2.1/play"`.
3. Download and install Java 7 SDK.

To run the project just execute `play run`. It normally runs on port 9000. http:localhost:9000/index should work.

### database

1. Install PostgreSQL, make sure it runs on port 5432.
2. Use Postgres' commandline utility `psql` and issue command `create database aal;` there.
3. Make sure user `postgres` has full access rights on database `aal` that you created in the previous step.

### angular

1. install nodejs, osx: `brew install node`, on ubuntu it's better to compile from source, the normal packages are pretty outdated.
2. `npm install -g bower` to install bower
3. inside `aal/public/angular/` execute `bower install` to install all the needed frontend-packages **you will have to repeat this everytime a new library is added**.

The angular-page is currently at http://localhost:9000/index.html . Play must be running for this ;).

### jiac

1. Create 'lib' folder inside the aal root folder.
2. Download https://dl.dropboxusercontent.com/u/1188793/agentCore-5.1.4-with-modified-dependencies.jar into this folder.
