# Interview Scheduler

## Description

Mainly using React alongside with many tools, I manage to build and test a Scheduler application that allows users to book and cancel appointments with interviewers. We combine a concise API with a WebSocket server to build a realtime experience.

## Features

- Application can arrange appointments from Monday to Friday depending on available spots.

![Main Page](public/images/1.png)

- The sidebar constains the days and they show the number of slots available for the day.

- Users can switch between days and get appointment by pressing the empty icon on available hours.

![New Appoinment is created](public/images/2.png)

- After creating or deleting appoinments, available spots will be updated accordingly on the app.

- To book a interview its necessary to type a student name and picking an interviewer, otherwise app will throw an error.

![Warning section appears](public/images/5.png)
![Could not save the appointment](public/images/4.png)

- Name or the interviewer on the appointments can be edited later on.

![Beginning of Editing](public/images/6.png)
![Editing](public/images/7.png)
![Saving](public/images/8.png)
![Edited](public/images/9.png)

- Existing interviews can also be canceled later on.

![Warning](public/images/10.png)
![Deleting](public/images/11.png)
![Deleted](public/images/12.png)

- (Extra Screenshots that shows Jest and Cypress tests)

![Cypress](public/images/14.png)
![Jest](public/images/13.png)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
