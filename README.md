# Installation
 ### Install
 ```yarn install```

 
 ### Environments
 create .env in project root
 ```
DATABASE_URL="file:./dev.sqlite"


# =========== API GATEWAY  =====================
API_GATEWAY_PORT=5678
API_GATEWAY_NAME=localhost
API_GATEWAY_URL=http://localhost:5678
GATEWAY_API_PREFIX=api

MARKETPLACE_SERVICE_NAME=marketplace_service
MARKETPLACE_SERVICE_HOST=127.0.0.1
MARKETPLACE_SERVICE_PORT=4201

# =========== Auth Service =================
DOMAIN=localhost
CHAIN_ID=5
THIRD_WEB_AUTH_KEY=${private wallet key}


REDIRECT_URL=/
# Used to encrypt the NextAuth.js JWT, and to hash email verification tokens.
# This is the default value for the secret option in NextAuth and Middleware.
NEXTAUTH_SECRET=${secret, can be anything here}
NEXTAUTH_URL=http://localhost:4200
JWT_KEY=${secret, can be anything here}
 ```
 
  # Start Database
 ```yarn migration```
 
 this will createt a `sqlite` database and generate typings for the schema

# Start frontend app
``` yarn nx run frontend-marketplace-app:serve```

# Start up Backend services
``` yarn nx run backend-marketplace-service:serve```

# Start API Gateway and reverse proxy
```yarn nx run backend-auth-service:serve```
```yarn nx run backend-api-gateway:serve```
this is the bridge that connect to all backend services and frontend app

application is running on port 4200
```http://localhost:4200/app/login```

Note: This is harcoded to only work with Goerli testnet.



