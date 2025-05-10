use TrackerNTaskMgt
go

create type typSubTaskUpdate as table
(
    [SubTaskId] [INT],
    [SubTaskTitle] [nvarchar](50) NOT NULL,
    [SubTaskUri] [varchar](300) NULL
)

