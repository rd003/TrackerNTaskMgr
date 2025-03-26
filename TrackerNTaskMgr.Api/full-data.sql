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

SET IDENTITY_INSERT [dbo].[TrackEntries] ON 
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (1, CAST(N'2025-03-18' AS Date), CAST(N'2025-03-18T03:00:00.0000000' AS DateTime2), CAST(N'2025-03-18T08:00:00.0000000' AS DateTime2), NULL, 205, CAST(N'2025-03-18T21:33:40.5766667' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (9, CAST(N'2025-03-19' AS Date), CAST(N'2025-03-18T22:30:00.0000000' AS DateTime2), CAST(N'2025-03-19T09:00:00.0000000' AS DateTime2), NULL, 180, CAST(N'2025-03-20T12:40:31.9200000' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (11, CAST(N'2025-03-20' AS Date), CAST(N'2025-03-20T00:00:00.0000000' AS DateTime2), CAST(N'2025-03-20T07:00:00.0000000' AS DateTime2), 30, 270, CAST(N'2025-03-20T17:42:40.1433333' AS DateTime2), CAST(N'2025-03-21T17:43:28.2533333' AS DateTime2))
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (12, CAST(N'2025-03-21' AS Date), CAST(N'2025-03-21T01:30:00.0000000' AS DateTime2), CAST(N'2025-03-21T07:00:00.0000000' AS DateTime2), 60, 360, CAST(N'2025-03-21T21:17:49.9733333' AS DateTime2), CAST(N'2025-03-21T22:10:46.6233333' AS DateTime2))
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (13, CAST(N'2025-03-22' AS Date), CAST(N'2025-03-22T02:00:00.0000000' AS DateTime2), CAST(N'2025-03-22T07:00:00.0000000' AS DateTime2), NULL, 300, CAST(N'2025-03-22T07:36:00.1600000' AS DateTime2), CAST(N'2025-03-23T13:39:45.7533333' AS DateTime2))
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (17, CAST(N'2025-03-23' AS Date), CAST(N'2025-03-23T03:15:00.0000000' AS DateTime2), CAST(N'2025-03-23T07:45:00.0000000' AS DateTime2), 15, 270, CAST(N'2025-03-23T13:42:40.6800000' AS DateTime2), CAST(N'2025-03-23T17:42:07.2466667' AS DateTime2))
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (18, CAST(N'2025-02-10' AS Date), CAST(N'2025-02-09T22:45:00.0000000' AS DateTime2), CAST(N'2025-02-10T05:45:00.0000000' AS DateTime2), NULL, 270, CAST(N'2025-03-23T20:46:05.3833333' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (19, CAST(N'2025-02-11' AS Date), CAST(N'2025-02-10T22:00:00.0000000' AS DateTime2), CAST(N'2025-02-11T07:00:00.0000000' AS DateTime2), NULL, 360, CAST(N'2025-03-23T20:46:05.6366667' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (20, CAST(N'2025-02-12' AS Date), CAST(N'2025-02-11T22:15:00.0000000' AS DateTime2), CAST(N'2025-02-12T07:00:00.0000000' AS DateTime2), NULL, 315, CAST(N'2025-03-23T20:46:05.6466667' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (21, CAST(N'2025-02-13' AS Date), CAST(N'2025-02-12T21:15:00.0000000' AS DateTime2), CAST(N'2025-02-13T04:45:00.0000000' AS DateTime2), NULL, 240, CAST(N'2025-03-23T20:46:05.6500000' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (22, CAST(N'2025-02-14' AS Date), CAST(N'2025-02-14T00:20:00.0000000' AS DateTime2), CAST(N'2025-02-14T07:20:00.0000000' AS DateTime2), NULL, 240, CAST(N'2025-03-23T20:46:05.6633333' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (23, CAST(N'2025-02-15' AS Date), CAST(N'2025-02-14T23:00:00.0000000' AS DateTime2), CAST(N'2025-02-15T08:00:00.0000000' AS DateTime2), NULL, 300, CAST(N'2025-03-23T20:46:05.6700000' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (24, CAST(N'2025-02-16' AS Date), CAST(N'2025-02-15T23:35:00.0000000' AS DateTime2), CAST(N'2025-02-16T05:20:00.0000000' AS DateTime2), NULL, 225, CAST(N'2025-03-23T20:46:05.6766667' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (25, CAST(N'2025-02-17' AS Date), CAST(N'2025-02-16T22:35:00.0000000' AS DateTime2), CAST(N'2025-02-17T08:20:00.0000000' AS DateTime2), NULL, 375, CAST(N'2025-03-23T20:46:05.6833333' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (26, CAST(N'2025-02-18' AS Date), CAST(N'2025-02-17T22:20:00.0000000' AS DateTime2), CAST(N'2025-02-18T04:50:00.0000000' AS DateTime2), NULL, 375, CAST(N'2025-03-23T20:46:05.6900000' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (27, CAST(N'2025-02-19' AS Date), CAST(N'2025-02-18T23:15:00.0000000' AS DateTime2), CAST(N'2025-02-19T06:15:00.0000000' AS DateTime2), NULL, 375, CAST(N'2025-03-23T20:46:05.6933333' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (28, CAST(N'2025-02-20' AS Date), CAST(N'2025-02-20T00:20:00.0000000' AS DateTime2), CAST(N'2025-02-20T07:20:00.0000000' AS DateTime2), NULL, 390, CAST(N'2025-03-23T20:46:05.7000000' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (29, CAST(N'2025-02-21' AS Date), CAST(N'2025-02-21T01:00:00.0000000' AS DateTime2), CAST(N'2025-02-21T07:00:00.0000000' AS DateTime2), NULL, 450, CAST(N'2025-03-23T20:46:05.7066667' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (30, CAST(N'2025-02-22' AS Date), CAST(N'2025-02-21T23:30:00.0000000' AS DateTime2), CAST(N'2025-02-22T08:00:00.0000000' AS DateTime2), NULL, 435, CAST(N'2025-03-23T20:46:05.7133333' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (31, CAST(N'2025-02-23' AS Date), CAST(N'2025-02-22T23:15:00.0000000' AS DateTime2), CAST(N'2025-02-23T07:45:00.0000000' AS DateTime2), NULL, 330, CAST(N'2025-03-23T20:46:05.7200000' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (32, CAST(N'2025-02-24' AS Date), CAST(N'2025-02-23T23:12:00.0000000' AS DateTime2), CAST(N'2025-02-24T08:12:00.0000000' AS DateTime2), NULL, 330, CAST(N'2025-03-23T20:46:05.7266667' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (33, CAST(N'2025-02-25' AS Date), CAST(N'2025-02-24T23:45:00.0000000' AS DateTime2), CAST(N'2025-02-25T06:45:00.0000000' AS DateTime2), NULL, 450, CAST(N'2025-03-23T20:46:05.7333333' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (34, CAST(N'2025-02-26' AS Date), CAST(N'2025-02-26T00:00:00.0000000' AS DateTime2), CAST(N'2025-02-26T06:45:00.0000000' AS DateTime2), NULL, 450, CAST(N'2025-03-23T20:46:05.7400000' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (35, CAST(N'2025-02-27' AS Date), CAST(N'2025-02-26T22:45:00.0000000' AS DateTime2), CAST(N'2025-02-27T07:15:00.0000000' AS DateTime2), NULL, 390, CAST(N'2025-03-23T20:46:05.7500000' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (36, CAST(N'2025-02-28' AS Date), CAST(N'2025-02-28T01:15:00.0000000' AS DateTime2), CAST(N'2025-02-28T06:45:00.0000000' AS DateTime2), NULL, 450, CAST(N'2025-03-23T20:46:05.7566667' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (37, CAST(N'2025-03-01' AS Date), CAST(N'2025-02-28T23:00:00.0000000' AS DateTime2), CAST(N'2025-03-01T07:15:00.0000000' AS DateTime2), NULL, 420, CAST(N'2025-03-23T20:46:05.7633333' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (38, CAST(N'2025-03-02' AS Date), CAST(N'2025-03-02T00:15:00.0000000' AS DateTime2), CAST(N'2025-03-02T07:15:00.0000000' AS DateTime2), NULL, 255, CAST(N'2025-03-23T20:46:05.7733333' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (39, CAST(N'2025-03-03' AS Date), CAST(N'2025-03-03T00:00:00.0000000' AS DateTime2), CAST(N'2025-03-03T08:00:00.0000000' AS DateTime2), NULL, 540, CAST(N'2025-03-23T20:46:05.8133333' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (40, CAST(N'2025-03-04' AS Date), CAST(N'2025-03-03T23:00:00.0000000' AS DateTime2), CAST(N'2025-03-04T07:45:00.0000000' AS DateTime2), NULL, 200, CAST(N'2025-03-23T20:46:05.8200000' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (41, CAST(N'2025-03-05' AS Date), CAST(N'2025-03-05T00:15:00.0000000' AS DateTime2), CAST(N'2025-03-05T07:15:00.0000000' AS DateTime2), NULL, 420, CAST(N'2025-03-23T20:46:05.8300000' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (42, CAST(N'2025-03-06' AS Date), CAST(N'2025-03-06T01:15:00.0000000' AS DateTime2), CAST(N'2025-03-06T08:45:00.0000000' AS DateTime2), NULL, 375, CAST(N'2025-03-23T20:46:05.8366667' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (43, CAST(N'2025-03-07' AS Date), CAST(N'2025-03-06T23:00:00.0000000' AS DateTime2), CAST(N'2025-03-07T07:45:00.0000000' AS DateTime2), NULL, 435, CAST(N'2025-03-23T20:46:05.8466667' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (44, CAST(N'2025-03-08' AS Date), CAST(N'2025-03-07T23:04:00.0000000' AS DateTime2), CAST(N'2025-03-08T05:19:00.0000000' AS DateTime2), NULL, 390, CAST(N'2025-03-23T20:46:05.8533333' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (45, CAST(N'2025-03-09' AS Date), CAST(N'2025-03-09T01:00:00.0000000' AS DateTime2), CAST(N'2025-03-09T08:00:00.0000000' AS DateTime2), NULL, 120, CAST(N'2025-03-23T20:46:05.8633333' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (46, CAST(N'2025-03-10' AS Date), CAST(N'2025-03-10T00:15:00.0000000' AS DateTime2), CAST(N'2025-03-10T08:00:00.0000000' AS DateTime2), NULL, 255, CAST(N'2025-03-23T20:46:05.8666667' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (47, CAST(N'2025-03-11' AS Date), CAST(N'2025-03-10T23:45:00.0000000' AS DateTime2), CAST(N'2025-03-11T07:45:00.0000000' AS DateTime2), NULL, 450, CAST(N'2025-03-23T20:46:05.8766667' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (48, CAST(N'2025-03-12' AS Date), CAST(N'2025-03-11T21:00:00.0000000' AS DateTime2), CAST(N'2025-03-12T05:30:00.0000000' AS DateTime2), NULL, 450, CAST(N'2025-03-23T20:46:05.8866667' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (49, CAST(N'2025-03-13' AS Date), CAST(N'2025-03-13T01:15:00.0000000' AS DateTime2), CAST(N'2025-03-13T07:15:00.0000000' AS DateTime2), NULL, 90, CAST(N'2025-03-23T20:46:05.9000000' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (50, CAST(N'2025-03-14' AS Date), CAST(N'2025-03-14T04:45:00.0000000' AS DateTime2), CAST(N'2025-03-14T07:15:00.0000000' AS DateTime2), NULL, 285, CAST(N'2025-03-23T20:46:05.9133333' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (51, CAST(N'2025-03-15' AS Date), CAST(N'2025-03-14T22:15:00.0000000' AS DateTime2), CAST(N'2025-03-15T08:15:00.0000000' AS DateTime2), NULL, 240, CAST(N'2025-03-23T20:46:05.9200000' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (52, CAST(N'2025-03-16' AS Date), CAST(N'2025-03-16T01:15:00.0000000' AS DateTime2), CAST(N'2025-03-16T08:15:00.0000000' AS DateTime2), NULL, 120, CAST(N'2025-03-23T20:46:05.9300000' AS DateTime2), NULL)
GO
INSERT [dbo].[TrackEntries] ([TrackEntryId], [EntryDate], [SleptAt], [WokeUpAt], [NapInMinutes], [TotalWorkInMinutes], [Created], [Updated]) VALUES (53, CAST(N'2025-03-17' AS Date), CAST(N'2025-03-17T01:00:00.0000000' AS DateTime2), CAST(N'2025-03-17T08:30:00.0000000' AS DateTime2), NULL, 270, CAST(N'2025-03-23T20:46:05.9466667' AS DateTime2), NULL)
GO
SET IDENTITY_INSERT [dbo].[TrackEntries] OFF
GO
INSERT [dbo].[TrackEntryRemarks] ([TrackEntryId], [Remarks]) VALUES (9, N'It was not a productive day at all')
GO
INSERT [dbo].[TrackEntryRemarks] ([TrackEntryId], [Remarks]) VALUES (11, N'I have installed additional ram to a laptop. It took quiet a time. I am not counting that time in productivity')
GO
INSERT [dbo].[TrackEntryRemarks] ([TrackEntryId], [Remarks]) VALUES (49, N'Chhoti Holi')
GO
INSERT [dbo].[TrackEntryRemarks] ([TrackEntryId], [Remarks]) VALUES (50, N'Holi')
GO
