# Clout Auth Server

> A simple plug and play Node micro-service to provide an authentication layer for any project.

## Docker

### Running this locally

1) Install Docker on your manchine.

2) Clone this repository
    ```bash
    git clone git@github.com:clout-stack/clout-auth-server.git
    ```

3) start the build server
    ```bash
    cd clout-auth-server
    docker-compose up
    ```

### Building for production

### Running in production

1) Understand the variables and configure them to point to your production services

    | ENV variable      | Description |
    | ----------------- | :------------------------------------------------- |
    | NODE_ENV          | e.g ```production```, ```development```, ```test```|
    | NODE_PORT         | e.g ```80``` |
    | REDIS_HOST        | e.g ```redislabs.com``` |
    | MONGODB_HOST      | e.g. ```redislabs.com``` |
    | MONGODB_USER      | e.g. ```USERNAME``` |
    | MONGODB_PASS      | e.g. ```PASSWORD``` |
    | SESSION_SECRET    | e.g. ```SECRET``` |
    | JWT_SECRET_KEY    | e.g. ```SECRET``` |
    | JWT_EXPIRES_IN    | e.g. ```7``` |
    | NODE_DEBUG        | e.g. ```clout-js:*``` |

2) Run clout-auth-server container in your machine

## Clout PaaS

To use Clout PaaS, ensure you have;

- an account
- clout-cli

You can deploy this application to clout PaaS following these steps.

1) Create a ```clout.json``` file with the following contents
    ```json
    {
        "depends_on": ["mysql", "redis"],
        "environment": {
            "NODE_DEBUG": "",
            "NODE_ENV": "production",
            "SESSION_SECRET": "mysecret",
            "JWT_SECRET_KEY": "mysecretjwt",
            "JWT_EXPIRES_IN": "7"
        }
    }
    ```

2) Deploy this application to clout PaaS
    ```bash
    clout publish --project-dir .
    ```
