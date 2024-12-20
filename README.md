# NskrTodo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.0.

## NodeJS Setup
Project requires NodeJS v20.
Use Fast Node Manager (FNM) to install nodejs. 
Setup ``--use-on-cd`` feature (https://www.freecodecamp.org/news/fnm-fast-node-manager/) for better experience with changing versions for different projects.

## Installing packages

```bash
npm install
```

## Environment
Application uses Firebase for Authentication and CloudFirestore, before start a project you'll need to setup Firebase project (https://console.firebase.google.com/)
And then replace fields in [environment.ts](src/environments/environment.ts)

```
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'YOUR_API_KEY',
    appId: 'YOUR_APP_ID',
    authDomain: 'YOUR_AUTH_DOMAIN', 
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
  },
};
```

## Development server

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
npm run build
```

For production build run:
```bash
npm run build:prod
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Deploy
[Deploy pipeline to Firebase Hosting](.github/workflows/firebase-deploy.yml)
