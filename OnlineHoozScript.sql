USE [master]
GO
/****** Object:  Database [db_a77897_hooz]    Script Date: 14-09-2021 12:08:46 ******/
CREATE DATABASE [db_a77897_hooz]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'db_a77897_hooz_Data', FILENAME = N'H:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\db_a77897_hooz_DATA.mdf' , SIZE = 8192KB , MAXSIZE = 1024000KB , FILEGROWTH = 10%)
 LOG ON 
( NAME = N'db_a77897_hooz_Log', FILENAME = N'H:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\db_a77897_hooz_Log.LDF' , SIZE = 3072KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [db_a77897_hooz] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [db_a77897_hooz].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [db_a77897_hooz] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [db_a77897_hooz] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [db_a77897_hooz] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [db_a77897_hooz] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [db_a77897_hooz] SET ARITHABORT OFF 
GO
ALTER DATABASE [db_a77897_hooz] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [db_a77897_hooz] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [db_a77897_hooz] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [db_a77897_hooz] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [db_a77897_hooz] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [db_a77897_hooz] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [db_a77897_hooz] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [db_a77897_hooz] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [db_a77897_hooz] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [db_a77897_hooz] SET  ENABLE_BROKER 
GO
ALTER DATABASE [db_a77897_hooz] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [db_a77897_hooz] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [db_a77897_hooz] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [db_a77897_hooz] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [db_a77897_hooz] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [db_a77897_hooz] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [db_a77897_hooz] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [db_a77897_hooz] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [db_a77897_hooz] SET  MULTI_USER 
GO
ALTER DATABASE [db_a77897_hooz] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [db_a77897_hooz] SET DB_CHAINING OFF 
GO
ALTER DATABASE [db_a77897_hooz] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [db_a77897_hooz] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [db_a77897_hooz] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [db_a77897_hooz] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [db_a77897_hooz] SET QUERY_STORE = OFF
GO
USE [db_a77897_hooz]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 14-09-2021 12:08:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Jobs]    Script Date: 14-09-2021 12:08:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Jobs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[Descriptions] [nvarchar](200) NULL,
	[ImagesUrl] [nvarchar](max) NULL,
	[Status] [nvarchar](max) NULL,
	[IsAnonymous] [bit] NOT NULL,
	[Address] [nvarchar](max) NULL,
	[Latitude] [nvarchar](max) NULL,
	[Longitude] [nvarchar](max) NULL,
	[CreatedBy] [datetime2](7) NOT NULL,
	[JobStatus] [nvarchar](max) NULL,
 CONSTRAINT [PK_Jobs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[JobTag]    Script Date: 14-09-2021 12:08:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobTag](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TagName] [nvarchar](max) NULL,
	[JobId] [int] NOT NULL,
	[TagMasterId] [int] NOT NULL,
 CONSTRAINT [PK_JobTag] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Message]    Script Date: 14-09-2021 12:08:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Message](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SenderId] [int] NOT NULL,
	[RecipientId] [int] NOT NULL,
	[Content] [nvarchar](max) NULL,
	[IsRead] [bit] NOT NULL,
	[DateRead] [datetime2](7) NULL,
	[MessageSent] [datetime2](7) NOT NULL,
	[SenderDeleted] [bit] NOT NULL,
	[RecipientDeleted] [bit] NOT NULL,
	[RecipientUsername] [nvarchar](max) NULL,
	[SenderUsername] [nvarchar](max) NULL,
 CONSTRAINT [PK_Message] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RolesIdentity]    Script Date: 14-09-2021 12:08:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RolesIdentity](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_RolesIdentity] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SocialAuthentication]    Script Date: 14-09-2021 12:08:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SocialAuthentication](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NOT NULL,
	[LoginProvider] [nvarchar](max) NULL,
	[ImageUrl] [nvarchar](max) NULL,
	[LoginTime] [datetime2](7) NOT NULL,
	[Status] [int] NOT NULL,
	[Status_Message] [nvarchar](max) NULL,
	[Success] [bit] NOT NULL,
	[CoverImageUrl] [nvarchar](max) NULL,
	[AboutUs] [nvarchar](max) NULL,
	[Latitude] [nvarchar](max) NULL,
	[Longitude] [nvarchar](max) NULL,
	[MobileNumber] [nvarchar](max) NULL,
	[Name] [nvarchar](max) NULL,
	[UserAddress] [nvarchar](max) NULL,
	[WebSiteUrl] [nvarchar](max) NULL,
 CONSTRAINT [PK_SocialAuthentication] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TagMaster]    Script Date: 14-09-2021 12:08:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TagMaster](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TagName] [nvarchar](max) NULL,
 CONSTRAINT [PK_TagMaster] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tags]    Script Date: 14-09-2021 12:08:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tags](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TagName] [nvarchar](max) NULL,
	[UserId] [int] NOT NULL,
	[IsApproved] [bit] NOT NULL,
	[TagMasterId] [int] NOT NULL,
 CONSTRAINT [PK_Tags] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 14-09-2021 12:08:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](30) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[MobileNumber] [nvarchar](max) NULL,
	[WebSiteUrl] [nvarchar](max) NULL,
	[Tags] [nvarchar](max) NULL,
	[IsUserOnline] [bit] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedOn] [datetime2](7) NOT NULL,
	[ModifiedOn] [datetime2](7) NULL,
	[SocialAuthenticationId] [int] NOT NULL,
	[Status] [int] NULL,
	[Status_Message] [nvarchar](max) NULL,
	[Success] [bit] NOT NULL,
	[Latitude] [nvarchar](max) NULL,
	[Longitude] [nvarchar](max) NULL,
	[UserAddress] [nvarchar](max) NULL,
	[CoverImageUrl] [nvarchar](max) NULL,
	[ImageUrl] [nvarchar](max) NULL,
	[AboutUs] [nvarchar](max) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210718075200_Initials', N'3.1.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210720055741_LoginDateEntry', N'3.1.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210722155043_AddUserProfileData', N'3.1.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210723063305_AddUserWithStatus', N'3.1.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210723071537_AddUserWithLatLong', N'3.1.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210724095301_CoverImgField', N'3.1.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210724120224_Images', N'3.1.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210724151018_MobilevalidationRemoved', N'3.1.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210724151324_MobilevalidationRemoved1', N'3.1.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210724152151_MobilevalidationRemoved2', N'3.1.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210726075020_KeyToSocialAuth', N'3.1.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210726091952_TagMasterTable', N'3.1.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210726114909_AddedAbouUsFieldInUser', N'3.1.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210728151736_jdv', N'3.1.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210728165251_fbgf', N'3.1.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210802055156_dummy', N'3.1.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210804071849_AuthIdInJobTable', N'3.1.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210804074935_AuthIdInJobTable1', N'3.1.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210808150122_JobTags', N'3.1.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210808150739_JobTags1', N'3.1.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210809032207_JobTags5', N'3.1.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210809035109_JobTags6', N'3.1.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210809035323_JobTags12', N'3.1.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210809035757_JobTags13', N'3.1.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210809035917_JobTag44', N'3.1.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210809040533_JobTag46', N'3.1.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210809040739_JobTagAddes', N'3.1.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210812045817_AddressFields', N'3.1.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210814164301_CreatedSateJob', N'3.1.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210818143117_JoStatus', N'3.1.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210828053425_MESSAGES', N'3.1.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210828054231_MESSAGES', N'3.1.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210828055636_MESSAGES1', N'3.1.17')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210906073414_messageknownfor', N'3.1.17')
GO
SET IDENTITY_INSERT [dbo].[Message] ON 

INSERT [dbo].[Message] ([Id], [SenderId], [RecipientId], [Content], [IsRead], [DateRead], [MessageSent], [SenderDeleted], [RecipientDeleted], [RecipientUsername], [SenderUsername]) VALUES (1, 135, 136, N'Hi! Are u there', 0, NULL, CAST(N'2021-08-28T12:16:49.7160320' AS DateTime2), 0, 0, NULL, NULL)
INSERT [dbo].[Message] ([Id], [SenderId], [RecipientId], [Content], [IsRead], [DateRead], [MessageSent], [SenderDeleted], [RecipientDeleted], [RecipientUsername], [SenderUsername]) VALUES (3, 137, 138, N'Hi brother', 0, NULL, CAST(N'2021-08-27T23:51:43.6321530' AS DateTime2), 0, 0, NULL, NULL)
INSERT [dbo].[Message] ([Id], [SenderId], [RecipientId], [Content], [IsRead], [DateRead], [MessageSent], [SenderDeleted], [RecipientDeleted], [RecipientUsername], [SenderUsername]) VALUES (4, 141, 138, N'Hi brother', 0, NULL, CAST(N'2021-08-27T23:52:21.7391673' AS DateTime2), 0, 0, NULL, NULL)
INSERT [dbo].[Message] ([Id], [SenderId], [RecipientId], [Content], [IsRead], [DateRead], [MessageSent], [SenderDeleted], [RecipientDeleted], [RecipientUsername], [SenderUsername]) VALUES (5, 141, 138, N'Hi brother', 0, NULL, CAST(N'2021-08-28T05:12:02.3632466' AS DateTime2), 0, 0, NULL, NULL)
INSERT [dbo].[Message] ([Id], [SenderId], [RecipientId], [Content], [IsRead], [DateRead], [MessageSent], [SenderDeleted], [RecipientDeleted], [RecipientUsername], [SenderUsername]) VALUES (6, 143, 138, N'Hi brother', 0, NULL, CAST(N'2021-08-28T05:20:14.6361842' AS DateTime2), 0, 0, NULL, NULL)
INSERT [dbo].[Message] ([Id], [SenderId], [RecipientId], [Content], [IsRead], [DateRead], [MessageSent], [SenderDeleted], [RecipientDeleted], [RecipientUsername], [SenderUsername]) VALUES (7, 143, 138, N'hi', 0, NULL, CAST(N'2021-08-30T06:17:55.8057203' AS DateTime2), 0, 0, NULL, NULL)
INSERT [dbo].[Message] ([Id], [SenderId], [RecipientId], [Content], [IsRead], [DateRead], [MessageSent], [SenderDeleted], [RecipientDeleted], [RecipientUsername], [SenderUsername]) VALUES (9, 140, 138, N'Hi brother', 0, NULL, CAST(N'2021-09-06T13:09:36.8365505' AS DateTime2), 0, 0, NULL, NULL)
INSERT [dbo].[Message] ([Id], [SenderId], [RecipientId], [Content], [IsRead], [DateRead], [MessageSent], [SenderDeleted], [RecipientDeleted], [RecipientUsername], [SenderUsername]) VALUES (10, 140, 138, N'Hi brother', 0, NULL, CAST(N'2021-09-06T13:44:30.5514867' AS DateTime2), 0, 0, NULL, NULL)
INSERT [dbo].[Message] ([Id], [SenderId], [RecipientId], [Content], [IsRead], [DateRead], [MessageSent], [SenderDeleted], [RecipientDeleted], [RecipientUsername], [SenderUsername]) VALUES (11, 140, 138, N'Hi brother', 0, NULL, CAST(N'2021-09-06T13:46:18.3896365' AS DateTime2), 0, 0, NULL, NULL)
INSERT [dbo].[Message] ([Id], [SenderId], [RecipientId], [Content], [IsRead], [DateRead], [MessageSent], [SenderDeleted], [RecipientDeleted], [RecipientUsername], [SenderUsername]) VALUES (12, 140, 138, N'Hi brother', 0, NULL, CAST(N'2021-09-06T13:46:27.2064562' AS DateTime2), 0, 0, NULL, NULL)
INSERT [dbo].[Message] ([Id], [SenderId], [RecipientId], [Content], [IsRead], [DateRead], [MessageSent], [SenderDeleted], [RecipientDeleted], [RecipientUsername], [SenderUsername]) VALUES (13, 140, 138, N'Hi brother', 0, NULL, CAST(N'2021-09-06T13:46:30.9691317' AS DateTime2), 0, 0, NULL, NULL)
INSERT [dbo].[Message] ([Id], [SenderId], [RecipientId], [Content], [IsRead], [DateRead], [MessageSent], [SenderDeleted], [RecipientDeleted], [RecipientUsername], [SenderUsername]) VALUES (14, 143, 138, N'hi', 0, NULL, CAST(N'2021-09-09T22:55:41.5620354' AS DateTime2), 0, 0, NULL, NULL)
INSERT [dbo].[Message] ([Id], [SenderId], [RecipientId], [Content], [IsRead], [DateRead], [MessageSent], [SenderDeleted], [RecipientDeleted], [RecipientUsername], [SenderUsername]) VALUES (15, 143, 138, N'hi', 0, NULL, CAST(N'2021-09-11T09:05:23.0545361' AS DateTime2), 0, 0, NULL, NULL)
INSERT [dbo].[Message] ([Id], [SenderId], [RecipientId], [Content], [IsRead], [DateRead], [MessageSent], [SenderDeleted], [RecipientDeleted], [RecipientUsername], [SenderUsername]) VALUES (16, 143, 138, N'hello', 0, NULL, CAST(N'2021-09-11T09:07:29.0448568' AS DateTime2), 0, 0, NULL, NULL)
INSERT [dbo].[Message] ([Id], [SenderId], [RecipientId], [Content], [IsRead], [DateRead], [MessageSent], [SenderDeleted], [RecipientDeleted], [RecipientUsername], [SenderUsername]) VALUES (17, 143, 138, N'hey', 0, NULL, CAST(N'2021-09-11T09:08:26.2832747' AS DateTime2), 0, 0, NULL, NULL)
INSERT [dbo].[Message] ([Id], [SenderId], [RecipientId], [Content], [IsRead], [DateRead], [MessageSent], [SenderDeleted], [RecipientDeleted], [RecipientUsername], [SenderUsername]) VALUES (18, 143, 138, N'jh', 0, NULL, CAST(N'2021-09-11T09:09:37.1790931' AS DateTime2), 0, 0, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Message] OFF
GO
SET IDENTITY_INSERT [dbo].[SocialAuthentication] ON 

INSERT [dbo].[SocialAuthentication] ([Id], [UserName], [Email], [LoginProvider], [ImageUrl], [LoginTime], [Status], [Status_Message], [Success], [CoverImageUrl], [AboutUs], [Latitude], [Longitude], [MobileNumber], [Name], [UserAddress], [WebSiteUrl]) VALUES (135, N'Ksh1929', N'bhargav.kshitiz55kk@gmail.com', N'Google', N'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg', CAST(N'2021-08-13T22:55:35.3340347' AS DateTime2), 200, N'User added to database successfully', 1, N'https://i.pinimg.com/originals/0c/f6/c3/0cf6c362a7cf6bc8e4e404811176f5c1.png', NULL, NULL, NULL, NULL, N'Kshitiz Bhargav', NULL, NULL)
INSERT [dbo].[SocialAuthentication] ([Id], [UserName], [Email], [LoginProvider], [ImageUrl], [LoginTime], [Status], [Status_Message], [Success], [CoverImageUrl], [AboutUs], [Latitude], [Longitude], [MobileNumber], [Name], [UserAddress], [WebSiteUrl]) VALUES (136, N'eit9360', N'vkp92.com17@gmail.com', N'Google', N'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg', CAST(N'2021-08-13T22:58:50.1318334' AS DateTime2), 200, N'User added to database successfully', 1, N'http://res.cloudinary.com/livsolution/image/upload/v1629553220/sfawolhbnhstckjbrtl5.jpg', N'Nothing about me', N'', N'', N'9654804062', N'eitec learn', N'Dubai - United Arab Emirates', N'')
INSERT [dbo].[SocialAuthentication] ([Id], [UserName], [Email], [LoginProvider], [ImageUrl], [LoginTime], [Status], [Status_Message], [Success], [CoverImageUrl], [AboutUs], [Latitude], [Longitude], [MobileNumber], [Name], [UserAddress], [WebSiteUrl]) VALUES (137, N'cod7605', N'codervjm@gmail.com', N'Google', N'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg', CAST(N'2021-08-14T11:29:52.3174363' AS DateTime2), 200, N'User added to database successfully', 1, N'https://i.pinimg.com/originals/0c/f6/c3/0cf6c362a7cf6bc8e4e404811176f5c1.png', NULL, NULL, NULL, NULL, N'codervk', NULL, NULL)
INSERT [dbo].[SocialAuthentication] ([Id], [UserName], [Email], [LoginProvider], [ImageUrl], [LoginTime], [Status], [Status_Message], [Success], [CoverImageUrl], [AboutUs], [Latitude], [Longitude], [MobileNumber], [Name], [UserAddress], [WebSiteUrl]) VALUES (138, N'vio4085', N'vik11@gmail.com', N'Google', N'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg', CAST(N'2021-08-14T11:31:39.2218760' AS DateTime2), 200, N'User added to database successfully', 1, N'https://i.pinimg.com/originals/0c/f6/c3/0cf6c362a7cf6bc8e4e404811176f5c1.png', NULL, NULL, NULL, NULL, N'viop', NULL, NULL)
INSERT [dbo].[SocialAuthentication] ([Id], [UserName], [Email], [LoginProvider], [ImageUrl], [LoginTime], [Status], [Status_Message], [Success], [CoverImageUrl], [AboutUs], [Latitude], [Longitude], [MobileNumber], [Name], [UserAddress], [WebSiteUrl]) VALUES (139, N'Len3102', N'oxleno@gmail.com', N'Google', N'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg', CAST(N'2021-08-14T03:42:55.9787158' AS DateTime2), 200, N'User added to database successfully', 1, N'http://res.cloudinary.com/livsolution/image/upload/v1628937901/u8ekjmmmf2fpuk2jv4dn.jpg', NULL, NULL, NULL, NULL, N'Lenox Lewis', NULL, NULL)
INSERT [dbo].[SocialAuthentication] ([Id], [UserName], [Email], [LoginProvider], [ImageUrl], [LoginTime], [Status], [Status_Message], [Success], [CoverImageUrl], [AboutUs], [Latitude], [Longitude], [MobileNumber], [Name], [UserAddress], [WebSiteUrl]) VALUES (140, N'San6315', N'pandeysanu228@gmail.com', N'Google', N'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg', CAST(N'2021-08-14T08:22:08.3485470' AS DateTime2), 200, N'User added to database successfully', 1, N'https://i.pinimg.com/originals/0c/f6/c3/0cf6c362a7cf6bc8e4e404811176f5c1.png', N'', N'', N'', N'7503188441', N'Sanu Pandey', NULL, N'
')
INSERT [dbo].[SocialAuthentication] ([Id], [UserName], [Email], [LoginProvider], [ImageUrl], [LoginTime], [Status], [Status_Message], [Success], [CoverImageUrl], [AboutUs], [Latitude], [Longitude], [MobileNumber], [Name], [UserAddress], [WebSiteUrl]) VALUES (141, N'Vic2387', N'vicky.cbspd@gmail.com', N'Google', N'http://res.cloudinary.com/livsolution/image/upload/v1628966896/bvotsgqqpui4hwsrrnu1.jpg', CAST(N'2021-08-14T11:11:27.8045263' AS DateTime2), 200, N'User added to database successfully', 1, N'http://res.cloudinary.com/livsolution/image/upload/v1628966331/tkhgy82jjgu0sruq69tc.jpg', N'most states, Warner Bros and Universal Pictures had decided to start releasing their films wherever possible. As Delhi opened, the decision was taken to release the', N'', N'', N'9654804062', N'Vicky Kumar', NULL, N'')
INSERT [dbo].[SocialAuthentication] ([Id], [UserName], [Email], [LoginProvider], [ImageUrl], [LoginTime], [Status], [Status_Message], [Success], [CoverImageUrl], [AboutUs], [Latitude], [Longitude], [MobileNumber], [Name], [UserAddress], [WebSiteUrl]) VALUES (142, N'Nit5129', N'nitukumari35115@gmail.com', N'Google', N'http://res.cloudinary.com/livsolution/image/upload/v1629002161/frnnzbamvdaovlqdj1lh.jpg', CAST(N'2021-08-14T21:25:05.0773491' AS DateTime2), 200, N'User added to database successfully', 1, N'http://res.cloudinary.com/livsolution/image/upload/v1629002184/fv0gf8z3x6y02nffbjgo.jpg', NULL, NULL, NULL, NULL, N'Nitu Kumari', NULL, NULL)
INSERT [dbo].[SocialAuthentication] ([Id], [UserName], [Email], [LoginProvider], [ImageUrl], [LoginTime], [Status], [Status_Message], [Success], [CoverImageUrl], [AboutUs], [Latitude], [Longitude], [MobileNumber], [Name], [UserAddress], [WebSiteUrl]) VALUES (143, N'Sob4262', N'sobhasingh389@gmail.com', N'Google', N'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg', CAST(N'2021-08-14T21:57:47.5878550' AS DateTime2), 200, N'User added to database successfully', 1, N'https://i.pinimg.com/originals/0c/f6/c3/0cf6c362a7cf6bc8e4e404811176f5c1.png', N'', N'', N'', N'9635825896', N'Sobha Singh', NULL, N'')
INSERT [dbo].[SocialAuthentication] ([Id], [UserName], [Email], [LoginProvider], [ImageUrl], [LoginTime], [Status], [Status_Message], [Success], [CoverImageUrl], [AboutUs], [Latitude], [Longitude], [MobileNumber], [Name], [UserAddress], [WebSiteUrl]) VALUES (144, N'Hri2433', N'hritik500500@gmail.com', N'Google', N'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg', CAST(N'2021-08-20T21:53:40.5225205' AS DateTime2), 200, N'User added to database successfully', 1, N'https://i.pinimg.com/originals/0c/f6/c3/0cf6c362a7cf6bc8e4e404811176f5c1.png', NULL, NULL, NULL, NULL, N'Hritik Bhargav', NULL, NULL)
INSERT [dbo].[SocialAuthentication] ([Id], [UserName], [Email], [LoginProvider], [ImageUrl], [LoginTime], [Status], [Status_Message], [Success], [CoverImageUrl], [AboutUs], [Latitude], [Longitude], [MobileNumber], [Name], [UserAddress], [WebSiteUrl]) VALUES (145, N'Vic4855', N'vickyxdev@gmail.com', N'Google', N'http://res.cloudinary.com/livsolution/image/upload/v1629914119/ux2lyeckyrdkl2jwm1li.jpg', CAST(N'2021-08-25T10:14:04.9783770' AS DateTime2), 200, N'User added to database successfully', 1, N'http://res.cloudinary.com/livsolution/image/upload/v1629914134/n6dlruuitwk33dlfizp9.jpg', N'', N'', N'', N'8700661200', N'Vicky Kumar', NULL, N'')
INSERT [dbo].[SocialAuthentication] ([Id], [UserName], [Email], [LoginProvider], [ImageUrl], [LoginTime], [Status], [Status_Message], [Success], [CoverImageUrl], [AboutUs], [Latitude], [Longitude], [MobileNumber], [Name], [UserAddress], [WebSiteUrl]) VALUES (146, N'Akh7686', N'akkitripathi@gmail.com', N'Google', N'http://res.cloudinary.com/livsolution/image/upload/v1630164899/clkpfgk4gdom5xg5wcko.jpg', CAST(N'2021-08-28T08:23:08.1797922' AS DateTime2), 200, N'User added to database successfully', 1, N'http://res.cloudinary.com/livsolution/image/upload/v1630164980/y2lm38swkbh7lalomhgp.jpg', NULL, NULL, NULL, NULL, N'Akhilesh Tripathi', NULL, NULL)
INSERT [dbo].[SocialAuthentication] ([Id], [UserName], [Email], [LoginProvider], [ImageUrl], [LoginTime], [Status], [Status_Message], [Success], [CoverImageUrl], [AboutUs], [Latitude], [Longitude], [MobileNumber], [Name], [UserAddress], [WebSiteUrl]) VALUES (147, N'Raj4841', N'rajmishra9t@gmail.com', N'Google', N'http://res.cloudinary.com/livsolution/image/upload/v1630169303/wpls6vxdmx66kzmggzlf.jpg', CAST(N'2021-08-28T09:26:00.1880979' AS DateTime2), 200, N'User added to database successfully', 1, N'http://res.cloudinary.com/livsolution/image/upload/v1630169337/dwfgmhpupwko3cn547aj.jpg', NULL, NULL, NULL, NULL, N'Rajneesh Mishra', NULL, NULL)
SET IDENTITY_INSERT [dbo].[SocialAuthentication] OFF
GO
SET IDENTITY_INSERT [dbo].[TagMaster] ON 

INSERT [dbo].[TagMaster] ([Id], [TagName]) VALUES (1, N'Electician')
INSERT [dbo].[TagMaster] ([Id], [TagName]) VALUES (2, N'Plumber')
INSERT [dbo].[TagMaster] ([Id], [TagName]) VALUES (3, N'Developer')
INSERT [dbo].[TagMaster] ([Id], [TagName]) VALUES (4, N'Barber')
INSERT [dbo].[TagMaster] ([Id], [TagName]) VALUES (5, NULL)
SET IDENTITY_INSERT [dbo].[TagMaster] OFF
GO
SET IDENTITY_INSERT [dbo].[Tags] ON 

INSERT [dbo].[Tags] ([Id], [TagName], [UserId], [IsApproved], [TagMasterId]) VALUES (45, N'Plumber', 141, 1, 2)
INSERT [dbo].[Tags] ([Id], [TagName], [UserId], [IsApproved], [TagMasterId]) VALUES (46, N'Barber', 143, 1, 4)
INSERT [dbo].[Tags] ([Id], [TagName], [UserId], [IsApproved], [TagMasterId]) VALUES (47, N'Electician', 136, 1, 1)
INSERT [dbo].[Tags] ([Id], [TagName], [UserId], [IsApproved], [TagMasterId]) VALUES (48, N'Barber', 136, 1, 4)
INSERT [dbo].[Tags] ([Id], [TagName], [UserId], [IsApproved], [TagMasterId]) VALUES (49, N'Barber', 146, 1, 4)
INSERT [dbo].[Tags] ([Id], [TagName], [UserId], [IsApproved], [TagMasterId]) VALUES (50, N'Electician', 146, 1, 1)
INSERT [dbo].[Tags] ([Id], [TagName], [UserId], [IsApproved], [TagMasterId]) VALUES (51, N'Plumber', 146, 1, 2)
SET IDENTITY_INSERT [dbo].[Tags] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [UserName], [Name], [MobileNumber], [WebSiteUrl], [Tags], [IsUserOnline], [IsActive], [IsDeleted], [CreatedOn], [ModifiedOn], [SocialAuthenticationId], [Status], [Status_Message], [Success], [Latitude], [Longitude], [UserAddress], [CoverImageUrl], [ImageUrl], [AboutUs]) VALUES (118, N'Ksh1929', N'Kshitiz Bhargav', NULL, NULL, NULL, 0, 0, 0, CAST(N'2021-08-13T22:55:35.9880490' AS DateTime2), NULL, 135, NULL, NULL, 0, NULL, NULL, NULL, N'https://i.pinimg.com/originals/0c/f6/c3/0cf6c362a7cf6bc8e4e404811176f5c1.png', N'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg', NULL)
INSERT [dbo].[Users] ([Id], [UserName], [Name], [MobileNumber], [WebSiteUrl], [Tags], [IsUserOnline], [IsActive], [IsDeleted], [CreatedOn], [ModifiedOn], [SocialAuthenticationId], [Status], [Status_Message], [Success], [Latitude], [Longitude], [UserAddress], [CoverImageUrl], [ImageUrl], [AboutUs]) VALUES (119, N'eit9360', N'eitec learn', NULL, NULL, NULL, 0, 0, 0, CAST(N'2021-08-13T22:58:50.1564213' AS DateTime2), NULL, 136, NULL, NULL, 0, NULL, NULL, NULL, N'http://res.cloudinary.com/livsolution/image/upload/v1629553220/sfawolhbnhstckjbrtl5.jpg', N'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg', NULL)
INSERT [dbo].[Users] ([Id], [UserName], [Name], [MobileNumber], [WebSiteUrl], [Tags], [IsUserOnline], [IsActive], [IsDeleted], [CreatedOn], [ModifiedOn], [SocialAuthenticationId], [Status], [Status_Message], [Success], [Latitude], [Longitude], [UserAddress], [CoverImageUrl], [ImageUrl], [AboutUs]) VALUES (120, N'cod7605', N'codervk', NULL, NULL, NULL, 0, 0, 0, CAST(N'2021-08-14T11:29:53.3754456' AS DateTime2), NULL, 137, NULL, NULL, 0, NULL, NULL, NULL, N'https://i.pinimg.com/originals/0c/f6/c3/0cf6c362a7cf6bc8e4e404811176f5c1.png', N'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg', NULL)
INSERT [dbo].[Users] ([Id], [UserName], [Name], [MobileNumber], [WebSiteUrl], [Tags], [IsUserOnline], [IsActive], [IsDeleted], [CreatedOn], [ModifiedOn], [SocialAuthenticationId], [Status], [Status_Message], [Success], [Latitude], [Longitude], [UserAddress], [CoverImageUrl], [ImageUrl], [AboutUs]) VALUES (121, N'vio4085', N'viop', NULL, NULL, NULL, 0, 0, 0, CAST(N'2021-08-14T11:31:39.9601549' AS DateTime2), NULL, 138, NULL, NULL, 0, NULL, NULL, NULL, N'https://i.pinimg.com/originals/0c/f6/c3/0cf6c362a7cf6bc8e4e404811176f5c1.png', N'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg', NULL)
INSERT [dbo].[Users] ([Id], [UserName], [Name], [MobileNumber], [WebSiteUrl], [Tags], [IsUserOnline], [IsActive], [IsDeleted], [CreatedOn], [ModifiedOn], [SocialAuthenticationId], [Status], [Status_Message], [Success], [Latitude], [Longitude], [UserAddress], [CoverImageUrl], [ImageUrl], [AboutUs]) VALUES (122, N'Len3102', N'Lenox Lewis', NULL, NULL, NULL, 0, 0, 0, CAST(N'2021-08-14T03:42:56.6717617' AS DateTime2), NULL, 139, NULL, NULL, 0, NULL, NULL, NULL, N'http://res.cloudinary.com/livsolution/image/upload/v1628937901/u8ekjmmmf2fpuk2jv4dn.jpg', N'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg', NULL)
INSERT [dbo].[Users] ([Id], [UserName], [Name], [MobileNumber], [WebSiteUrl], [Tags], [IsUserOnline], [IsActive], [IsDeleted], [CreatedOn], [ModifiedOn], [SocialAuthenticationId], [Status], [Status_Message], [Success], [Latitude], [Longitude], [UserAddress], [CoverImageUrl], [ImageUrl], [AboutUs]) VALUES (123, N'San6315', N'Sanu Pandey', NULL, NULL, NULL, 0, 0, 0, CAST(N'2021-08-14T08:22:09.0410692' AS DateTime2), NULL, 140, NULL, NULL, 0, NULL, NULL, NULL, N'https://i.pinimg.com/originals/0c/f6/c3/0cf6c362a7cf6bc8e4e404811176f5c1.png', N'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg', NULL)
INSERT [dbo].[Users] ([Id], [UserName], [Name], [MobileNumber], [WebSiteUrl], [Tags], [IsUserOnline], [IsActive], [IsDeleted], [CreatedOn], [ModifiedOn], [SocialAuthenticationId], [Status], [Status_Message], [Success], [Latitude], [Longitude], [UserAddress], [CoverImageUrl], [ImageUrl], [AboutUs]) VALUES (124, N'Vic2387', N'Vicky Kumar', NULL, NULL, NULL, 0, 0, 0, CAST(N'2021-08-14T11:11:28.2922015' AS DateTime2), NULL, 141, NULL, NULL, 0, NULL, NULL, NULL, N'http://res.cloudinary.com/livsolution/image/upload/v1628966331/tkhgy82jjgu0sruq69tc.jpg', N'http://res.cloudinary.com/livsolution/image/upload/v1628966896/bvotsgqqpui4hwsrrnu1.jpg', NULL)
INSERT [dbo].[Users] ([Id], [UserName], [Name], [MobileNumber], [WebSiteUrl], [Tags], [IsUserOnline], [IsActive], [IsDeleted], [CreatedOn], [ModifiedOn], [SocialAuthenticationId], [Status], [Status_Message], [Success], [Latitude], [Longitude], [UserAddress], [CoverImageUrl], [ImageUrl], [AboutUs]) VALUES (125, N'Nit5129', N'Nitu Kumari', NULL, NULL, NULL, 0, 0, 0, CAST(N'2021-08-14T21:25:05.5679780' AS DateTime2), NULL, 142, NULL, NULL, 0, NULL, NULL, NULL, N'http://res.cloudinary.com/livsolution/image/upload/v1629002184/fv0gf8z3x6y02nffbjgo.jpg', N'http://res.cloudinary.com/livsolution/image/upload/v1629002161/frnnzbamvdaovlqdj1lh.jpg', NULL)
INSERT [dbo].[Users] ([Id], [UserName], [Name], [MobileNumber], [WebSiteUrl], [Tags], [IsUserOnline], [IsActive], [IsDeleted], [CreatedOn], [ModifiedOn], [SocialAuthenticationId], [Status], [Status_Message], [Success], [Latitude], [Longitude], [UserAddress], [CoverImageUrl], [ImageUrl], [AboutUs]) VALUES (126, N'Sob4262', N'Sobha Singh', NULL, NULL, NULL, 0, 0, 0, CAST(N'2021-08-14T21:57:47.5955538' AS DateTime2), NULL, 143, NULL, NULL, 0, NULL, NULL, NULL, N'https://i.pinimg.com/originals/0c/f6/c3/0cf6c362a7cf6bc8e4e404811176f5c1.png', N'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg', NULL)
INSERT [dbo].[Users] ([Id], [UserName], [Name], [MobileNumber], [WebSiteUrl], [Tags], [IsUserOnline], [IsActive], [IsDeleted], [CreatedOn], [ModifiedOn], [SocialAuthenticationId], [Status], [Status_Message], [Success], [Latitude], [Longitude], [UserAddress], [CoverImageUrl], [ImageUrl], [AboutUs]) VALUES (127, N'Hri2433', N'Hritik Bhargav', NULL, NULL, NULL, 0, 0, 0, CAST(N'2021-08-20T21:53:41.0423907' AS DateTime2), NULL, 144, NULL, NULL, 0, NULL, NULL, NULL, N'https://i.pinimg.com/originals/0c/f6/c3/0cf6c362a7cf6bc8e4e404811176f5c1.png', N'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg', NULL)
INSERT [dbo].[Users] ([Id], [UserName], [Name], [MobileNumber], [WebSiteUrl], [Tags], [IsUserOnline], [IsActive], [IsDeleted], [CreatedOn], [ModifiedOn], [SocialAuthenticationId], [Status], [Status_Message], [Success], [Latitude], [Longitude], [UserAddress], [CoverImageUrl], [ImageUrl], [AboutUs]) VALUES (128, N'Vic4855', N'Vicky Kumar', NULL, NULL, NULL, 0, 0, 0, CAST(N'2021-08-25T10:14:05.0773374' AS DateTime2), NULL, 145, NULL, NULL, 0, NULL, NULL, NULL, N'http://res.cloudinary.com/livsolution/image/upload/v1629914134/n6dlruuitwk33dlfizp9.jpg', N'http://res.cloudinary.com/livsolution/image/upload/v1629914119/ux2lyeckyrdkl2jwm1li.jpg', NULL)
INSERT [dbo].[Users] ([Id], [UserName], [Name], [MobileNumber], [WebSiteUrl], [Tags], [IsUserOnline], [IsActive], [IsDeleted], [CreatedOn], [ModifiedOn], [SocialAuthenticationId], [Status], [Status_Message], [Success], [Latitude], [Longitude], [UserAddress], [CoverImageUrl], [ImageUrl], [AboutUs]) VALUES (129, N'Akh7686', N'Akhilesh Tripathi', NULL, NULL, NULL, 0, 0, 0, CAST(N'2021-08-28T08:23:08.3892889' AS DateTime2), NULL, 146, NULL, NULL, 0, NULL, NULL, NULL, N'http://res.cloudinary.com/livsolution/image/upload/v1630164980/y2lm38swkbh7lalomhgp.jpg', N'http://res.cloudinary.com/livsolution/image/upload/v1630164899/clkpfgk4gdom5xg5wcko.jpg', NULL)
INSERT [dbo].[Users] ([Id], [UserName], [Name], [MobileNumber], [WebSiteUrl], [Tags], [IsUserOnline], [IsActive], [IsDeleted], [CreatedOn], [ModifiedOn], [SocialAuthenticationId], [Status], [Status_Message], [Success], [Latitude], [Longitude], [UserAddress], [CoverImageUrl], [ImageUrl], [AboutUs]) VALUES (130, N'Raj4841', N'Rajneesh Mishra', NULL, NULL, NULL, 0, 0, 0, CAST(N'2021-08-28T09:26:00.1980822' AS DateTime2), NULL, 147, NULL, NULL, 0, NULL, NULL, NULL, N'http://res.cloudinary.com/livsolution/image/upload/v1630169337/dwfgmhpupwko3cn547aj.jpg', N'http://res.cloudinary.com/livsolution/image/upload/v1630169303/wpls6vxdmx66kzmggzlf.jpg', NULL)
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
/****** Object:  Index [IX_Jobs_UserId]    Script Date: 14-09-2021 12:09:05 ******/
CREATE NONCLUSTERED INDEX [IX_Jobs_UserId] ON [dbo].[Jobs]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_JobTag_JobId]    Script Date: 14-09-2021 12:09:05 ******/
CREATE NONCLUSTERED INDEX [IX_JobTag_JobId] ON [dbo].[JobTag]
(
	[JobId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_JobTag_TagMasterId]    Script Date: 14-09-2021 12:09:05 ******/
CREATE NONCLUSTERED INDEX [IX_JobTag_TagMasterId] ON [dbo].[JobTag]
(
	[TagMasterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Message_RecipientId]    Script Date: 14-09-2021 12:09:05 ******/
CREATE NONCLUSTERED INDEX [IX_Message_RecipientId] ON [dbo].[Message]
(
	[RecipientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Message_SenderId]    Script Date: 14-09-2021 12:09:05 ******/
CREATE NONCLUSTERED INDEX [IX_Message_SenderId] ON [dbo].[Message]
(
	[SenderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Tags_TagMasterId]    Script Date: 14-09-2021 12:09:05 ******/
CREATE NONCLUSTERED INDEX [IX_Tags_TagMasterId] ON [dbo].[Tags]
(
	[TagMasterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Tags_UserId]    Script Date: 14-09-2021 12:09:05 ******/
CREATE NONCLUSTERED INDEX [IX_Tags_UserId] ON [dbo].[Tags]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Users_SocialAuthenticationId]    Script Date: 14-09-2021 12:09:05 ******/
CREATE NONCLUSTERED INDEX [IX_Users_SocialAuthenticationId] ON [dbo].[Users]
(
	[SocialAuthenticationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Jobs] ADD  DEFAULT ('0001-01-01T00:00:00.0000000') FOR [CreatedBy]
GO
ALTER TABLE [dbo].[SocialAuthentication] ADD  DEFAULT ('0001-01-01T00:00:00.0000000') FOR [LoginTime]
GO
ALTER TABLE [dbo].[SocialAuthentication] ADD  DEFAULT ((0)) FOR [Status]
GO
ALTER TABLE [dbo].[SocialAuthentication] ADD  DEFAULT (CONVERT([bit],(0))) FOR [Success]
GO
ALTER TABLE [dbo].[Tags] ADD  DEFAULT ((0)) FOR [TagMasterId]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((0)) FOR [SocialAuthenticationId]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (CONVERT([bit],(0))) FOR [Success]
GO
ALTER TABLE [dbo].[Jobs]  WITH CHECK ADD  CONSTRAINT [FK_Jobs_SocialAuthentication_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[SocialAuthentication] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Jobs] CHECK CONSTRAINT [FK_Jobs_SocialAuthentication_UserId]
GO
ALTER TABLE [dbo].[JobTag]  WITH CHECK ADD  CONSTRAINT [FK_JobTag_Jobs_JobId] FOREIGN KEY([JobId])
REFERENCES [dbo].[Jobs] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[JobTag] CHECK CONSTRAINT [FK_JobTag_Jobs_JobId]
GO
ALTER TABLE [dbo].[JobTag]  WITH CHECK ADD  CONSTRAINT [FK_JobTag_TagMaster_TagMasterId] FOREIGN KEY([TagMasterId])
REFERENCES [dbo].[TagMaster] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[JobTag] CHECK CONSTRAINT [FK_JobTag_TagMaster_TagMasterId]
GO
ALTER TABLE [dbo].[Message]  WITH CHECK ADD  CONSTRAINT [FK_Message_SocialAuthentication_RecipientId] FOREIGN KEY([RecipientId])
REFERENCES [dbo].[SocialAuthentication] ([Id])
GO
ALTER TABLE [dbo].[Message] CHECK CONSTRAINT [FK_Message_SocialAuthentication_RecipientId]
GO
ALTER TABLE [dbo].[Message]  WITH CHECK ADD  CONSTRAINT [FK_Message_SocialAuthentication_SenderId] FOREIGN KEY([SenderId])
REFERENCES [dbo].[SocialAuthentication] ([Id])
GO
ALTER TABLE [dbo].[Message] CHECK CONSTRAINT [FK_Message_SocialAuthentication_SenderId]
GO
ALTER TABLE [dbo].[Tags]  WITH CHECK ADD  CONSTRAINT [FK_Tags_SocialAuthentication_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[SocialAuthentication] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Tags] CHECK CONSTRAINT [FK_Tags_SocialAuthentication_UserId]
GO
ALTER TABLE [dbo].[Tags]  WITH CHECK ADD  CONSTRAINT [FK_Tags_TagMaster_TagMasterId] FOREIGN KEY([TagMasterId])
REFERENCES [dbo].[TagMaster] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Tags] CHECK CONSTRAINT [FK_Tags_TagMaster_TagMasterId]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_SocialAuthentication_SocialAuthenticationId] FOREIGN KEY([SocialAuthenticationId])
REFERENCES [dbo].[SocialAuthentication] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_SocialAuthentication_SocialAuthenticationId]
GO
USE [master]
GO
ALTER DATABASE [db_a77897_hooz] SET  READ_WRITE 
GO
