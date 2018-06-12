## About

This is a simple CRUD application consisting of Docker containers in a microservice-style setup.

It consists of the following subfolders:

1.  **web**

    A statically-served front-end for the project, built using Vue-cli, the Webpack template, and Buefy.

2.  **gateway**

    An API gateway that ties together the 'book' and 'user' endpoints.

    E.g., requests to http://gatewaylocation.com/user are forwarded to http://userlocation.com/user and
    requests to http://gatewaylocation.com/book are forwarded to http://booklocation.com/book

3.  **User**

    A database server that provides a REST API to CRUD users.

4.  **Book**

    A database server that provides a REST API to CRUD books.

## Docker usage

`docker-build.sh` will build images for all the sub-projects. You can pass in a username with -u that will be prepended to the image names.

e.g.

```bash
./docker-build -u trambopoline
```

Running it is a little more involved:

```Bash
# user
docker run -i -e DB_CONNECT_STRING=$YourUserConnectionString -p 3002:3002 -d $yourUsername/user-book/book &
```

```Bash
# book
docker run -i -e DB_CONNECT_STRING=$YourBookConnectionString -p 3001:3001 -d $yourUsername/user-book/user &
```

```Bash
# gateway
docker run -i -e USER_ENDPOINT="$yourUserAddress:3001/user" -e BOOK_ENDPOINT="$yourBookAddress:3002/book" -p 3000:3000 -d $username/user-book/gateway &
```

```Bash
# web
docker run -i -e USER_URL="$yourGatewayAddress:3000/user" -e BOOK_URL="$yourGatewayAddress:3000/book" -p 80:8080 -d $username/user-book/web &
```

If you are fortunate enough to be running Docker natively, you should be able to just use `http://0.0.0.0` for all the `$your[thing]Address` variables above. If you're running non-natively, then you can sub in the value that you get by running `docker-machine ip`.

You will need to provide your own MongoDB connection string.
