CREATE TABLE [dbo].[UserAccounts] (
    [UserAccountId] INT            IDENTITY (1, 1) NOT NULL,
    [Username]      NVARCHAR (20)  NULL,
    [PasswordHash]  NVARCHAR (150) NOT NULL,
    CONSTRAINT [PK_UserAccount_UserAccountId] PRIMARY KEY CLUSTERED ([UserAccountId] ASC)
);

