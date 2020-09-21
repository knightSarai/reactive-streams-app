<h1>Reactive Stream</h1>
<p>Streaming application (Twitch Like), built with ReactJS, JSON-Server, node-media-server, OBS as streaming client.
Also, Material-UI used as react component library.</p>

## how it works: 
<p> With every stream created by a user with react client, a key will be stored in the API server, and it will be pushed to the RTMP server when a user starts streaming, and then react will be able to show  the stream. </p>

## servers: 
***
### run backend servers first.
## 1. React server as front end client.
> in reactive-stream directory
### run
```
npm start
```
## 2. JSON-Server as an API.
> in db.json inside api directory 
### run inside the directory
```
npm start
```
## 3. Node-media-server as video streaming server.
> in rtmpserver directory 
### run
```
npm start
```

# Features:
* Dark mood inabled, and save user preference in browser localStorage.
* authentication by Google OAuth
* handle all the CRUD operations (GET, POST, PATCH, DELETE)