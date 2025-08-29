# TrackerNTaskMgr

It is an activity tracker and task managemement application, tailored to my specific need.

## Tech stack

- C#/Dotnet 9 Web API 
- Mongo Db (database) (Initially I have used sql server, later I have migrated it completely to mongo db)
- Rd003.JwtAuth (A [untility library](https://www.nuget.org/packages/Rd003.JwtAuth/1.0.0), created by me, for creating JWT tokens)
- BCrypt.Net-Next for password hashing
- Angular 20
- Angular material 20

## My manual work flow

### 1. Activity tracking

- I was tracking a few activities like my sleep time, wake up time, total sleep time, total work time. Then I calculate it at the end of the week and compare it to the previous week. I was doing all this stuff manually. I was lazy enough to explore the softwares those already exists.

### 2. Task management

- I was also managing my taks. I learn things constantly, I have a list of things to expore. I also note down ideas of blog post and youtube videos to produce. I had a text file in my desktop. I was dumping everything there.
- My workflow was like:

```txt
 Need to learn
   - Some tech (resource url 1, resource url 2 ....) (pending/in-progress) 
   - Some another tech (resource url 1, resource url 2 ....) (pending/in-progress) (urgent)

 Blogs
   - Write a blog on appsettings.json (pending)
   - Write a blog post on 'xyz' (in-progress) 
   - Some random blog post. (schedule date: 'date', deadline: 'date'). (* reason: I can not do auto scheduling in my blog) 
   - Write a blog post on 'abc' (posted to my blog, need to copy it on medium.com)

In spare time
  - Do xyz
  - Do abc
```

I can manage it manually. But I want urgent tasks upfront. I want to see taks `sort by deadline`. I want to filter them. I want to sort them by schedule date. That when I thoght, may be I should automate this process. I thaught, I would host the backend on `IIS Server`, create and Angular PWA and I am good to go.

## This software was very useful to me but I don't use it now (may be I will use it in future) 

While developing this app, I have spiked my interest in hardware and linux. I have upgraded my old laptop with a ram and SATA SSD, istalled linux mint on it. Now days, I log into two machines (linux and windows). Honestly I do most of my development work in linux machine. I could host the backend in `Apache sever` and use the PWA in linux machine too. But I have two problems : 
  
  1. My linux machine is kind of old, It has only 8 gb ram. I don't want to waste a ram on running a http server full time. I already use docker a lot, which consumes enough ram.
  2. The second problem is database synchronization. I need to synchronize the data in both machines.
  
The software I made with enthusiasm is no longer useful for me.

I have had few solutions for this:

1. Purchase a cheap VPS (eg. digital ocean or hostinger has generous offers) and host everything there. Which seems most viable option.
2. Use the azure appservice and azure static web app's free tier.  Because free tier is enough for my use cases.
3. Use a free azure sql, neon postgres or mongo db atlas free tier. Host a dabase there and use the software in both machines. Still i need to run a http server in linux machine, that I dont want.

May be I will go with option 2.

## Still have issues to resolve before moving it to production server

### Problems

- I am not using refresh tokens, I need to login at every 15 min.
- I am storing jwt in local storage that is a security concern.
- This project was meant to use in my machine only, that is why I don't want to invest too much time.

### solutions

 - Implement refresh token functionalility
 - Send both tokens (access and refresh) in http only cookies
 - Now you don't need to store tokens anywhere, they will be automatically sent with every http request. You need to change the authentication flow completely (that is a very tedious task).

## How to run it

1. Make sure you have installed git and mongo db is running locally or in a docker. If you are using mongo db atlas then you need to change the connection string defined in appsettings.json.
2. Clone the repository by executing this command `git clone https://github.com/rd003/TrackerNTaskMgr.git` .
3. Visit to directory `cd TrackerNTaskMgr` 
3. To run a backend project, run `cd TrackerNTaskMgr.Api/`
4. `dotnet run` to run a project
5. Keep backend app running, open the project directory in another terminal. Run, `cd client`
6. Run `npm i`, to install all the dependencies.
7. Run `ng serve` to run app.
   
## Screenshots

![1](/screenshots/1.png)
---
![2](/screenshots/2.png)
---
![3](/screenshots/3.png)
---
![4](/screenshots/4.png)
---
![5](/screenshots/5.png)
---
![6](/screenshots/6.png)

---

Thanks...
