# Installation
 ### Install
 ```yarn install```

 
 ### Environments
 create .env in project root
 ```
 DATABASE_URL="file:./dev.sqlite"

JWT_KEY=${provide value here. This van be any passphrase}

#Services
GATEWAY_PORT=4200
GATEWAY_API_PREFIX=api

MARKETPLACE_SERVICE_NAME=marketplace_service
MARKETPLACE_SERVICE_HOST=127.0.0.1
MARKETPLACE_SERVICE_PORT=4201
 ```
 
  # Start Database
 ```yarn migration```
 
 this will createt a `sqlite` database and generate typings for the schema

# Start frontend app
``` yarn nx run frontend-marketplace-app:serve```

# Start up Backend services
``` yarn nx run backend-marketplace-service:serve```

# Sart API Gateway and reverse proxy
```yarn nx run backend-api-gateway:serve```
this is the bridge that connect to all backend services and frontend app

application is running on port 4200
```http://localhost:4200/app/login```

Note: This is harcoded to only work with Goerli testnet.



