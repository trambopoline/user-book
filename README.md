## Usage

You will need to provide a valid MongoDB connection string in both the `/user/.env` and `/book/.env` files, in this style:

```
DB_CONNECT_SECRETS= "mongodb+srv://<username>:<password>@<databaseLocation>/user?retryWrites=true";
```
```
DB_CONNECT_SECRETS= "mongodb+srv://<username>:<password>@<databaseLocation>/book?retryWrites=true";
```

## Installation

Install by running the install script from the root directory:

```
./install.sh
```

It just runs an `npm install` for all the subproject `package.json`'s

## Run it

Development mode

```
./startup.sh -d
```

or production mode

```
./startup.sh -p
```
