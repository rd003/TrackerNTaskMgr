USE [TrackerNTaskMgt]
GO

INSERT [dbo].[TaskStatuses] ([TaskStatusId], [TaskStatusName], [TaskStatusEmoji], [Created], [Updated], [Deleted]) VALUES (1, N'Pending', N'⏳', CAST(N'2025-03-12T18:55:35.7300000' AS DateTime2), NULL, NULL)
GO
INSERT [dbo].[TaskStatuses] ([TaskStatusId], [TaskStatusName], [TaskStatusEmoji], [Created], [Updated], [Deleted]) VALUES (2, N'InProgress', N'🚧', CAST(N'2025-03-12T18:55:35.7300000' AS DateTime2), NULL, NULL)
GO
INSERT [dbo].[TaskStatuses] ([TaskStatusId], [TaskStatusName], [TaskStatusEmoji], [Created], [Updated], [Deleted]) VALUES (3, N'Scheduled', N'📅', CAST(N'2025-03-12T18:55:35.7300000' AS DateTime2), NULL, NULL)
GO
INSERT [dbo].[TaskStatuses] ([TaskStatusId], [TaskStatusName], [TaskStatusEmoji], [Created], [Updated], [Deleted]) VALUES (4, N'Completed', N'✅', CAST(N'2025-03-12T18:55:35.7300000' AS DateTime2), NULL, NULL)
GO

INSERT [dbo].[TaskPriorities] ([TaskPriorityId], [TaskPriorityName], [TaskPriorityOrder], [TaskPriorityEmoji], [Created], [Updated], [Deleted]) VALUES (1, N'Low', 1, N'😎', CAST(N'2025-03-12T19:23:17.8566667' AS DateTime2), NULL, NULL)
GO
INSERT [dbo].[TaskPriorities] ([TaskPriorityId], [TaskPriorityName], [TaskPriorityOrder], [TaskPriorityEmoji], [Created], [Updated], [Deleted]) VALUES (2, N'Medium', 2, N'👍', CAST(N'2025-03-12T19:23:17.8566667' AS DateTime2), NULL, NULL)
GO
INSERT [dbo].[TaskPriorities] ([TaskPriorityId], [TaskPriorityName], [TaskPriorityOrder], [TaskPriorityEmoji], [Created], [Updated], [Deleted]) VALUES (3, N'High', 3, N'⚡', CAST(N'2025-03-12T19:23:17.8566667' AS DateTime2), NULL, NULL)
GO

