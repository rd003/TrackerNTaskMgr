# TrackerNTaskMgr

It is an activity tracker and task management application, tailored to my specific need.

## Key features

- Track your activities like sleep time, wake up time, total hour of sleep, total hour of work. So you can track these things and compare it to past weeks.

- Manage your tasks
  - It is useful if you have a list of topics you need to explore with optional resource url (a link of blog post or a youtube video)
  - Have optional subtasks with optional resource urls.
  - Tags (eg. dotnet,azure,angular,blog,youtube)
  - Categorize tasks by category (eg. Topics to learn, blog post to produce, youtube video to produce)
  - Add deadlines and schedule date to a specific task
  - Get high priority tasks in the dashboard
  - Filter task by status, priority and deadline

## Tech stack

- Dotnet 9 Web API 
- Mongo Db  (migrated from `sql server` you can get that version [from this branch](https://github.com/rd003/TrackerNTaskMgr/tree/sql-server-dapper) )
- Rd003.JwtAuth (I have created this nuget package to simplify jwt generation process)
- Angular 20
- Angular material 20

## Architecture

```txt
┌─────────────────┐    HTTP/HTTPS    ┌─────────────────┐
│   Angular 20    │ ───────────────▶ │  .NET 9 Web API │
│   (Frontend)    │                  │    (Backend)    │
│  - Components   │                  │  - Controllers  │
│  - Services     │                  │  - Services     │
│  - Material UI  │                  │  - Models       │
└─────────────────┘                  └─────────────────┘
                                              │
                                              │ MongoDB Driver
                                              ▼
                                     ┌─────────────────┐
                                     │    MongoDB      │
                                     │   (Database)    │
                                     │  - Collections  │
                                     │  - Documents    │
                                     └─────────────────┘
```

## Installation

1. Make sure you have installed git and mongo db is running locally or in a docker. If you are using mongo db atlas then you need to change the connection string defined in appsettings.json.
2. Clone the repository by executing this command `git clone https://github.com/rd003/TrackerNTaskMgr.git` .
3. Visit to directory `cd TrackerNTaskMgr` 
4. To run a backend project, run `cd TrackerNTaskMgr.Api/`
5. `dotnet run` to run a project
6. Keep backend app running, open the project directory in another terminal. Run, `cd client`
7. Run `npm i`, to install all the dependencies.
8. Run `ng serve` to run app.
9. Login credentials (username: user, password: 123)
   
## Screenshots

![1](/screenshots/1.png)

![2](/screenshots/2.png)

![3](/screenshots/3.png)

![4](/screenshots/4.png)

![5](/screenshots/5.png)

![6](/screenshots/6.png)

## Future enhancements

 - Implement a refresh token
 - Send both tokens (access and refresh) in http only cookies
