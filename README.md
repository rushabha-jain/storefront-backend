# Storefront Backend Project

## Getting Started

### Pre-requisites:

- Node
- Postgres Database

## Steps to start the application

1. Create database `store_front` in postgres
2. Move to our project folder and create .env file
3. Add following environment variables in .env

- `POSTGRES_HOST`(Database Host)
- `POSTGRES_USER` (Database User)
- `POSTGRES_TEST_DB` (Name of test database)
- `POSTGRES_PASSWORD` (Password to access the database)
- `POSTGRES_DB` (Name of dev database)
- `BCRYPT_PASSWORD` (Pepper for password hashing)
- `SALT_ROUNDS` (No. of times hashing of password should be done)
- `TOKEN_SECRET` (JWT Secret which would be used create signature)
- `TEST_ENV` (name of your test environment(test))
- `NODE_ENV` (environment of your app(dev/test))

4. Run `db-migrate --env dev up` (Setup schema for dev)
5. Run `npm i`(Insall the dependencies)
6. Make `NODE_ENV=test` in `.env` file and Run `npm run test` (Test the application)
7. Run `npm run build` (Build the application)
8. Make `NODE_ENV=dev` in `.env` file and Run `npm run start` (Start the server)
