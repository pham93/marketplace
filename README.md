# Installation
 ### Install
 ```yarn install```
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
