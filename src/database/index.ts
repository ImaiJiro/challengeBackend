import { Client } from 'pg';
import { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB } from '@config';

export const client = new Client({
  connectionString: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?sslmode=require`,
  connectionTimeoutMillis: 0,
  database: POSTGRES_DB,
  host: POSTGRES_HOST,
  idle_in_transaction_session_timeout: 0,
  password: POSTGRES_PASSWORD,
  port: Number(POSTGRES_PORT),
});

client
  .connect()
  .then(() =>
    console.log(`
----------------------------------------------------------------
Connected to PostgresSQL database!
Host: ${POSTGRES_HOST}
Port: ${POSTGRES_PORT}
Database: ${POSTGRES_DB}
----------------------------------------------------------------
`),
  )
  .catch(err => console.error('Error connecting to PostgresSQL database', err.message));

// client.query(
//   `
// DROP TABLE IF EXISTS fact_telegram_group cascade;
// CREATE TABLE fact_telegram_group(
// 	group_id INT PRIMARY KEY,
// 	group_name VARCHAR(100),
//     group_link VARCHAR(100) NOT NULL
// );
// DROP TABLE IF EXISTS dim_user cascade;
// CREATE TABLE dim_user(
// 	userid serial PRIMARY KEY,
// 	name VARCHAR(40) NOT NULL,
//     age INT NOT NULL,
// 	email VARCHAR(100) NOT NULL,
//     timezone text NOT NULL,
//     accesstoken text NOT NULL,
//     createdat text NOT NULL,
//     createdtime text NOT NULL,
//     isKickOff boolean NOT NULL,
//     isPaid boolean NOT NULL,
//     lastloginat text NOT NULL,
//     lastsignintime text NOT NULL,
//     off_set INT NOT NULL,
//     wallet text NOT NULL,
//     description VARCHAR(200),
// 	group_id INT NOT NULL,
// 	userindex INT NOT NULL,
// 	FOREIGN KEY (group_id)
// 	    REFERENCES fact_telegram_group (group_id)
// );
// DROP TABLE IF EXISTS dim_milestone cascade;
// CREATE TABLE dim_milestone(
// 	milestoneID serial PRIMARY KEY,
// 	start_date timestamp NOT NULL,
// 	end_date timestamp NOT NULL,
// 	amount_of_tokens decimal,
// 	days_amount INT NOT NULL,
// 	is_on_money boolean
// );
// DROP TABLE IF EXISTS fact_mood cascade;
// CREATE TABLE fact_mood(
// 	moodID serial PRIMARY KEY,
// 	description VARCHAR(100) NOT NULL
// );
// DROP TABLE IF EXISTS user_to_milestone cascade;
// CREATE TABLE user_to_milestone(
//     milestoneID INT NOT NULL,
//     userid INT UNIQUE NOT NULL,
//     FOREIGN KEY (milestoneID)
// 		REFERENCES dim_milestone (milestoneID),
//     FOREIGN KEY (userid)
// 		REFERENCES dim_user (userid)
// );
// DROP TABLE IF EXISTS fact_telegram_data cascade;
// CREATE TABLE fact_telegram_data(
// 	telegramID INT PRIMARY KEY,
// 	userid INT NOT NULL,
// 	group_id INT NOT NULL,
//     username VARCHAR(40) NOT NULL,
// 	first_name VARCHAR(40),
// 	FOREIGN KEY (userid)
// 		REFERENCES dim_user (userid),
// 	FOREIGN KEY (group_id)
// 		REFERENCES fact_telegram_group (group_id)
// );
// DROP TABLE IF EXISTS fact_selfie cascade;
// CREATE TABLE fact_selfie(
// 	selfieID serial PRIMARY KEY,
// 	telegramID INT NOT NULL,
//     sent_time timestamp NOT NULL,
// 	photo_path VARCHAR(250) NOT NULL,
// 	FOREIGN KEY (telegramID)
// 		REFERENCES fact_telegram_data(telegramID)
// );
// DROP TABLE IF EXISTS dim_reward cascade;
// CREATE TABLE dim_reward(
// 	rewardID serial PRIMARY KEY,
// 	userid INT NOT NULL,
// 	reward_amount INT NOT NULL,
// 	reward_date timestamp,
// 	FOREIGN KEY (userid)
// 		REFERENCES dim_user (userid)
// );
// DROP TABLE IF EXISTS fact_get_up cascade;
// CREATE TABLE fact_get_up(
// 	athlete_id serial PRIMARY KEY,
// 	userid INT NOT NULL,
//     get_up_time timestamp NOT NULL,
// 	FOREIGN KEY (userid)
// 		REFERENCES dim_user (userid)
// );
// DROP TABLE IF EXISTS dim_milestone cascade;
// CREATE TABLE dim_milestone(
// 	milestoneID serial PRIMARY KEY,
// 	start_date timestamp NOT NULL,
// 	end_date timestamp NOT NULL,
// 	amount_of_tokens decimal,
// 	days_amount INT NOT NULL,
// 	is_on_money boolean
// );
// DROP TABLE IF EXISTS fact_mood cascade;
// CREATE TABLE fact_mood(
// 	moodID serial PRIMARY KEY,
// 	description VARCHAR(100) NOT NULL
// );
// DROP TABLE IF EXISTS user_to_milestone cascade;
// CREATE TABLE user_to_milestone(
//     milestoneID INT NOT NULL,
//     userid INT UNIQUE NOT NULL,
//     FOREIGN KEY (milestoneID)
// 		REFERENCES dim_milestone (milestoneID),
//     FOREIGN KEY (userid)
// 		REFERENCES dim_user (userid)
// );
// DROP TABLE IF EXISTS fact_telegram_data cascade;
// CREATE TABLE fact_telegram_data(
// 	telegramID INT PRIMARY KEY,
// 	userid INT NOT NULL,
// 	group_id INT NOT NULL,
//     username VARCHAR(40) NOT NULL,
// 	first_name VARCHAR(40),
// 	FOREIGN KEY (userid)
// 		REFERENCES dim_user (userid),
// 	FOREIGN KEY (group_id)
// 		REFERENCES fact_telegram_group (group_id)
// );
// DROP TABLE IF EXISTS fact_selfie cascade;
// CREATE TABLE fact_selfie(
// 	selfieID serial PRIMARY KEY,
// 	telegramID INT NOT NULL,
//     sent_time timestamp NOT NULL,
// 	photo_path VARCHAR(250) NOT NULL,
// 	FOREIGN KEY (telegramID)
// 		REFERENCES fact_telegram_data(telegramID)
// );
// DROP TABLE IF EXISTS dim_user cascade;
// CREATE TABLE dim_user(
// 	userid serial PRIMARY KEY,
// 	name VARCHAR(40) NOT NULL,
//     age INT NOT NULL,
// 	email VARCHAR(100) NOT NULL,
//     timezone text NOT NULL,
//     accesstoken text NOT NULL,
//     createdat text NOT NULL,
//     createdtime text NOT NULL,
//     isKickOff boolean NOT NULL,
//     isPaid boolean NOT NULL,
//     lastloginat text NOT NULL,
//     lastsignintime text NOT NULL,
//     off_set INT NOT NULL,
//     wallet text NOT NULL,
//     description VARCHAR(200),
// 	group_id INT NOT NULL,
// 	userindex INT NOT NULL,
// 	FOREIGN KEY (group_id)
// 	    REFERENCES fact_telegram_group (group_id)
// );
// DROP TABLE IF EXISTS dim_reward cascade;
// CREATE TABLE dim_reward(
// 	rewardID serial PRIMARY KEY,
// 	userid INT NOT NULL,
// 	reward_amount INT NOT NULL,
// 	reward_date timestamp,
// 	FOREIGN KEY (userid)
// 		REFERENCES dim_user (userid)
// );
// DROP TABLE IF EXISTS fact_get_up cascade;
// CREATE TABLE fact_get_up(
// 	athlete_id serial PRIMARY KEY,
// 	userid INT NOT NULL,
//     get_up_time timestamp NOT NULL,
// 	FOREIGN KEY (userid)
// 		REFERENCES dim_user (userid)
// );
// `,
//   [],
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   (err, _res) => {
//     if (err) console.error('Error executing query', err.message);
//   },
// );

export default client;
