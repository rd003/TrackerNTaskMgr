use master
go

drop database if exists TrackerNTaskMgt
go

create database TrackerNTaskMgt
go

use TrackerNTaskMgt
go

create table TaskStatuses
(
  TaskStatusId tinyint,
  TaskStatusName nvarchar(30) not null,
  TaskStatusEmoji nvarchar(20),
  Created datetime2 not null default getdate(),
  Updated datetime2,
  Deleted datetime2

  constraint PK_TaskStatus_TaskStatusId primary key (TaskStatusId)
);
go

create Unique Index UQ_TaskStatusName 
on TaskStatuses(TaskStatusName)
include(Deleted)
where Deleted is null;
go

create table TaskPriorities
(
  TaskPriorityId tinyint,
  TaskPriorityName nvarchar(15),
  TaskPriorityOrder tinyint not null,
  TaskPriorityEmoji nvarchar(20),
  Created datetime2 not null default getdate(),
  Updated datetime2,
  Deleted datetime2

  constraint PK_TaskPriority_TaskPriorityId primary key (TaskPriorityId)
);

go

create Unique Index UQ_TaskPriorityName 
on TaskPriorities(TaskPriorityName)
include(Deleted)
where Deleted is null;
go

create table TaskHeaders
(
  TaskHeaderId int identity(1,1),
  TaskHeaderTitle nvarchar(30) not null,
  Created datetime2 not null default getdate(),
  Updated datetime2,
  Deleted datetime2

  constraint PK_TaskHeader_TaskHeaderId primary key (TaskHeaderId)
);
go

create Index IX_TaskHeaderTitle
on TaskHeaders(TaskHeaderTitle)
include(Deleted)
where Deleted is null;
go

create table Tasks
(
  TaskId int identity(1,1),
  TaskHeaderId int not null,
  TaskTitle nvarchar(50) not null,
  TaskUri varchar(300),
  TaskPriorityId tinyint not null,
  TaskStatusId tinyint not null,
  Deadline datetime2,
  ScheduledAt datetime2,
  Created datetime2 not null default getdate(),
  Updated datetime2,
  Deleted datetime2

  constraint PK_Task_TaskId primary key (TaskId),
  constraint FK_Task_TaskHeader_TaskHeaderId 
            foreign key (TaskHeaderId) 
            references TaskHeaders(TaskHeaderId),
  constraint FK_Tasks_TaskPriorities_TaskPriorityId
             foreign key (TaskPriorityId)
			 references TaskPriorities(TaskPriorityId),
  constraint FK_Tasks_TaskStatuses_TaskStatusId
             foreign key (TaskStatusId)
			 references TaskStatuses(TaskStatusId)
);
go

create index IX_TaskHeaderId on Tasks(TaskHeaderId);
go
create index IX_TaskPriorityId on Tasks(TaskPriorityId);
go
create index IX_TaskStatusId on Tasks(TaskStatusId);
go
create index IX_TaskTitle on Tasks(TaskTitle);
go

create table SubTasks
(
  SubTaskId int identity(1,1),
  TaskId int not null,
  SubTaskTitle nvarchar(50) not null,
  SubTaskUri varchar(300),
  Created datetime2 not null default getdate(),
  Updated datetime2,
  Deleted datetime2

  constraint PK_SubTask_SubTaskId primary key (SubTaskId),
  constraint FK_Tasks_Subtasks_TaskId
             foreign key (TaskId)
			 references Tasks(TaskId)
);
go

create index IX_TaskId on SubTasks(TaskId);
go

create table Tags
(
  TagId int identity(1,1),
  TagName nvarchar(20) not null unique,
  Created datetime2 not null default getdate(),
  Updated datetime2,
  Deleted datetime2

  constraint PK_Tags_TagId primary key (TagId) 
);
go

create table TaskTags
(
  TaskId int not null,
  TagId int not null,
  Created datetime2 not null default getdate(),
  Updated datetime2,
  Deleted datetime2

  constraint PK_TaskTag_TaskId_TagId primary key (TaskId,TagId),
  constraint FK_TaskTags_Tasks_TaskId
             foreign key (TaskId)
			 references Tasks(TaskId),
  constraint FK_TaskTags_Tags_TagId
             foreign key (TagId)
			 references Tags(TagId)
);
go

create index IX_TaskId on TaskTags(TaskId);
go

create index IX_TagId on TaskTags(TagId);
go

create table UserAccounts
(
  UserAccountId int identity(1,1),
  Username nvarchar(20),
  PasswordHash nvarchar(150) not null
  constraint PK_UserAccount_UserAccountId primary key (UserAccountId)
);
go

create table TrackEntries
(
  TrackEntryId int identity(1,1),
  EntryDate datetime2 not null,
  SleptAt datetime2 not null,
  WokeUpAt datetime2 not null,
  NapInMinutes smallint,
  TotalSleep as DATEDIFF(minute,SleptAt,WokeUpAt)+ ISNULL(NapInMinutes,0) PERSISTED,
  TotalWorkInMinutes smallint not null,
  Created datetime2 not null default getdate(),
  Updated datetime2,
  Deleted datetime2

  constraint PK_TrackEntry_TrackEntryId primary key (TrackEntryId)
);
go

create table TrackEntryRemarks
(
  TrackEntryId int not null,
  Remarks nvarchar(1000) not null

  constraint PK_TrackId primary key (TrackEntryId),
  constraint FK_TrackRemarks_TrackEntries_TrackEntryId
             foreign key (TrackEntryId)
			 references TrackEntries(TrackEntryId)
);
go

-- seeding some data

insert into TaskStatuses
(TaskStatusId,TaskStatusName,TaskStatusEmoji)
values
(1,N'Pending',N'⏳'),
(2,N'InProgress',N'🚧'),
(3,N'Scheduled',N'📅'),
(4,N'Completed',N'✅')
go

insert into TaskPriorities
(TaskPriorityId,TaskPriorityName,TaskPriorityOrder,TaskPriorityEmoji)
values
(1,N'Low',1,N'😎'),
(2,N'Medium',2,N'👍'),
(3,N'High',3,N'⚡');
go