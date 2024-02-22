-- If Exists Table Drop
DROP TABLE IF EXISTS fact_telegram_group cascade;
-- ================
--   TABLE [fact_telegram_group]
-- ================
-- create fact_telegram_group table
CREATE TABLE fact_telegram_group(
	group_id INT PRIMARY KEY,
	group_name VARCHAR(100),
    group_link VARCHAR(100) NOT NULL
);-- If Exists Table Drop

-- If Exists Table Drop
DROP TABLE IF EXISTS dim_user cascade;
-- ================
--   TABLE [dim_user]
-- ================
-- create dim_user table
CREATE TABLE dim_user(
	userid serial PRIMARY KEY,
	name VARCHAR(40) NOT NULL,
    age INT NOT NULL,
	email VARCHAR(100) NOT NULL,
    timezone text NOT NULL,
    accesstoken text NOT NULL,
    createdat text NOT NULL,
    createdtime text NOT NULL,
    iskickoff boolean NOT NULL,
    ispaid boolean NOT NULL,
    lastloginat text NOT NULL,
    lastsignintime text NOT NULL,
    off_set INT NOT NULL,
    wallet text NOT NULL,
    description VARCHAR(200),
	group_id INT NOT NULL,
	userindex INT NOT NULL,
	FOREIGN KEY (group_id)
	    REFERENCES fact_telegram_group (group_id)
);


-- If Exists Table Drop
DROP TABLE IF EXISTS dim_milestone cascade;
-- ================
--   TABLE [dim_milestone]
-- ================
-- create dim_milestone table
CREATE TABLE dim_milestone(
	milestoneID serial PRIMARY KEY,
	start_date timestamp NOT NULL,
	end_date timestamp NOT NULL,
	amount_of_tokens decimal,
	days_amount INT NOT NULL,
	is_on_money boolean
);



-- If Exists Table Drop
DROP TABLE IF EXISTS fact_mood cascade;
-- ================
--   TABLE [fact_mood]
-- ================
-- create fact_mood table
CREATE TABLE fact_mood(
	moodID serial PRIMARY KEY,
	description VARCHAR(100) NOT NULL
);


-- If Exists Table Drop
DROP TABLE IF EXISTS user_to_milestone cascade;
-- ================
--   TABLE [user_to_milestone]
-- ================
-- create user_to_milestone table
CREATE TABLE user_to_milestone(
    milestoneID INT NOT NULL,
    userid INT UNIQUE NOT NULL,
    FOREIGN KEY (milestoneID)
		REFERENCES dim_milestone (milestoneID),
    FOREIGN KEY (userid)
		REFERENCES dim_user (userid)
);


-- If Exists Table Drop
DROP TABLE IF EXISTS fact_telegram_data cascade;
-- ================
--   TABLE [fact_telegram_data]
-- ================
-- create fact_telegram_data table
CREATE TABLE fact_telegram_data(
	telegramID INT PRIMARY KEY,
	userid INT NOT NULL,
	group_id INT NOT NULL,
    username VARCHAR(40) NOT NULL,
	first_name VARCHAR(40),
	FOREIGN KEY (userid)
		REFERENCES dim_user (userid),
	FOREIGN KEY (group_id)
		REFERENCES fact_telegram_group (group_id)
);


-- If Exists Table Drop
DROP TABLE IF EXISTS fact_selfie cascade;
-- ================
--   TABLE [fact_selfie]
-- ================
-- create fact_selfie table
CREATE TABLE fact_selfie(
	selfieID serial PRIMARY KEY,
	telegramID INT NOT NULL,
    sent_time timestamp NOT NULL,
	photo_path VARCHAR(250) NOT NULL,
	FOREIGN KEY (telegramID)
		REFERENCES fact_telegram_data(telegramID)
);





-- If Exists Table Drop
DROP TABLE IF EXISTS dim_reward cascade;
-- ================
--   TABLE [dim_reward]
-- ================
-- create dim_reward table
CREATE TABLE dim_reward(
	rewardID serial PRIMARY KEY,
	userid INT NOT NULL,
	reward_amount INT NOT NULL,
	reward_date timestamp,
	FOREIGN KEY (userid)
		REFERENCES dim_user (userid)
);


-- If Exists Table Drop
DROP TABLE IF EXISTS fact_get_up cascade;
-- ================
--   TABLE [fact_get_up]
-- ================
-- create fact_get_up table
CREATE TABLE fact_get_up(
	athlete_id serial PRIMARY KEY,
	userid INT NOT NULL,
    get_up_time timestamp NOT NULL,
	FOREIGN KEY (userid)
		REFERENCES dim_user (userid)
);

DROP TABLE IF EXISTS dim_milestone cascade;
-- ================
--   TABLE [dim_milestone]
-- ================
-- create dim_milestone table
CREATE TABLE dim_milestone(
	milestoneID serial PRIMARY KEY,
	start_date timestamp NOT NULL,
	end_date timestamp NOT NULL,
	amount_of_tokens decimal,
	days_amount INT NOT NULL,
	is_on_money boolean
);



-- If Exists Table Drop
DROP TABLE IF EXISTS fact_mood cascade;
-- ================
--   TABLE [fact_mood]
-- ================
-- create fact_mood table
CREATE TABLE fact_mood(
	moodID serial PRIMARY KEY,
	description VARCHAR(100) NOT NULL
);


-- If Exists Table Drop
DROP TABLE IF EXISTS user_to_milestone cascade;
-- ================
--   TABLE [user_to_milestone]
-- ================
-- create user_to_milestone table
CREATE TABLE user_to_milestone(
    milestoneID INT NOT NULL,
    userid INT UNIQUE NOT NULL,
    FOREIGN KEY (milestoneID)
		REFERENCES dim_milestone (milestoneID),
    FOREIGN KEY (userid)
		REFERENCES dim_user (userid)
);


-- If Exists Table Drop
DROP TABLE IF EXISTS fact_telegram_data cascade;
-- ================
--   TABLE [fact_telegram_data]
-- ================
-- create fact_telegram_data table
CREATE TABLE fact_telegram_data(
	telegramID INT PRIMARY KEY,
	userid INT NOT NULL,
	group_id INT NOT NULL,
    username VARCHAR(40) NOT NULL,
	first_name VARCHAR(40),
	FOREIGN KEY (userid)
		REFERENCES dim_user (userid),
	FOREIGN KEY (group_id)
		REFERENCES fact_telegram_group (group_id)
);


-- If Exists Table Drop
DROP TABLE IF EXISTS fact_selfie cascade;
-- ================
--   TABLE [fact_selfie]
-- ================
-- create fact_selfie table
CREATE TABLE fact_selfie(
	selfieID serial PRIMARY KEY,
	telegramID INT NOT NULL,
    sent_time timestamp NOT NULL,
	photo_path VARCHAR(250) NOT NULL,
	FOREIGN KEY (telegramID)
		REFERENCES fact_telegram_data(telegramID)
);


-- If Exists Table Drop
DROP TABLE IF EXISTS dim_user cascade;
-- ================
--   TABLE [dim_user]
-- ================
-- create dim_user table
CREATE TABLE dim_user(
	userid serial PRIMARY KEY,
	name VARCHAR(40) NOT NULL,
    age INT NOT NULL,
	email VARCHAR(100) NOT NULL,
    timezone text NOT NULL,
    accesstoken text NOT NULL,
    createdat text NOT NULL,
    createdtime text NOT NULL,
    iskickoff boolean NOT NULL,
    ispaid boolean NOT NULL,
    lastloginat text NOT NULL,
    lastsignintime text NOT NULL,
    off_set INT NOT NULL,
    wallet text NOT NULL,
    description VARCHAR(200),
	group_id INT NOT NULL,
	userindex INT NOT NULL,
	photourl text NOT NULL,
	FOREIGN KEY (group_id)
	    REFERENCES fact_telegram_group (group_id)
);


-- If Exists Table Drop
DROP TABLE IF EXISTS dim_reward cascade;
-- ================
--   TABLE [dim_reward]
-- ================
-- create dim_reward table
CREATE TABLE dim_reward(
	rewardID serial PRIMARY KEY,
	userid INT NOT NULL,
	reward_amount NUMERIC NOT NULL,
	reward_date timestamp,
	FOREIGN KEY (userid)
		REFERENCES dim_user (userid)
);


-- If Exists Table Drop
DROP TABLE IF EXISTS fact_get_up cascade;
-- ================
--   TABLE [fact_get_up]
-- ================
-- create fact_get_up table
CREATE TABLE fact_get_up(
	athlete_id serial PRIMARY KEY,
	userid INT NOT NULL,
    get_up_time JSONB[],
	FOREIGN KEY (userid)
		REFERENCES dim_user (userid)
);

-- If Exists Table Drop
DROP TABLE IF EXISTS fact_telegram_group cascade;
-- ================
--   TABLE [fact_telegram_group]
-- ================
-- create fact_telegram_group table
CREATE TABLE fact_telegram_group(
	group_id INT PRIMARY KEY,
	group_name VARCHAR(100),
    group_link VARCHAR(100) NOT NULL
);