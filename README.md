<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/34fame/auth-sandbox">
    <img src="assets/login.png" alt="Logo" width="164" height="164">
  </a>

  <h3 align="center">Authentication Sandbox Project</h3>

  <p align="center">
    A single project demonstrating real-world authentication across numerous platforms.
    <br />
  </p>
</p>

---

## Overview

The purpose of this project is to provide working demonstration of real-world authentication and authorization across multiple platforms.

Quasar is a great platform for writing your code once and then deploying in multiple ways across multiple platforms. The problem I "discovered" was that once you add an authentication framework, these ease of deploying to multiple platforms becomes less trivial.

### Basic Architecture

The Client talks directly to Auth0 to authenticate the user. Based on the Auth0 configuration, the user is directed to a "Universal Login" page where she is provided a variety of methods to register and login, including, but not limited to, social methods such as Google, Facebook and Amazon. Once authenticated the user's session is redirected back to the Client along with access and identity tokens.

The Client talks directly to Firebase and its services that are best suited for direct communication. If the Firebase resources being access are not public, the Client must have an authenticated session to access those.

The Client talks to the Server using homegrown API calls. In this project there is only a single API endpoint. It is used to request an access token from Firebase which the Client then uses to authenticate to Firebase. The Client includes the Auth0 access token in all calls to the Server.

The Server talks to Auth0 to authorize API calls from the Client. As mentioned before, the Client sends the Auth0 access token with all calls to the Server. The Server, using Auth0 libraries, authorizes those calls as long as they provide the appropriate access token. This prevents anonymous use of the Server APIs.

The Server talks directly to Firebase using the Firebase Admin SDK. This gives the Server access to services based on the permissions granted to the service account that is being used by Firebase. Typically the Server would provide API endpoints to the Client for performing actions in Firebase.

### Libraries/Plugins

#### Client

| Library/Plugin                 | Purpose                                                 |
| ------------------------------ | ------------------------------------------------------- |
| auth0-js                       | Auth0 library for JavaScript                            |
| @auth0/cordova                 | Auth0 library for Cordova                               |
| cordova-plugin-customurlscheme | Cordova plugin allows you to start app using a URL      |
| cordova-plugin-ionic-webview   | Quasar recommended plugin for iOS platform              |
| cordova-safariviewcontroller   | Cordova plugin to display the web content in native app |

#### Server

| Library            | Purpose                                                            |
| ------------------ | ------------------------------------------------------------------ |
| express-jwt        | Auth0 library that provides Express middleware for validating JWTs |
| firebase-admin     | Firebase Admin Node.js SDK                                         |
| firebase-functions | Firebase SDK for defining Cloud Functions                          |
| jwks-rsa           | A library to retrieve RSA signing keys from a JWKS endpoint        |

## Local Setup

When running locally there are a few things that must updated. You need to know your computer's local IP address for this part. You can use `ifconfig` or `ipconfig` at a command prompt to figure that out.

**NOTE:** Making any changes NOT listed below could cause the issues. Stick with these exact instructions first and then you can make changes to fit your specific needs.

### Prerequisites

-  Auth0 Account: You will need to setup a (free) Auth0 developer account. More details on its configuration for those less familiar.
-  Firebase Account: You will need to setup a (free) Firebase account. More details on its configure to come later for those less familiar.
-  Android Studio: Required to run Android emulators for development and testing. See Quasar documentation for more details.
-  XCode: Required to run iOS emulators for development and testing. This can only be done on MacOS. See Quasar documentation for more details.

**NOTE:** Using Firebase is not necessary for demonstrating authentication. It is included in this project because I commonly use its services in my apps so I needed to make sure I was establishing sessions properly. If you strip out all of the Firebase code you can still run this application and validate authentication. In fact, if you aren't using Firebase you don't need the Server either.

### Clone Repo

```sh
git clone https://github.com/34fame/auth-sandbox
```

The project has a `client` and a `server` directory. The `client` directory contains the Quasar app with numerous modes configured. The `server` directory contains the Firebase Cloud Functions code.

The root directory of the project provides helpful scripts to simplify running and deploying everything.

### Packages

#### Global

You will need to have the following packages installed globally. If you already have them installed then you can ignore them.

You need to the Quasar CLI to manage Quasar projects (e.g. run and build Client)

You need Firebase Tools to manage Firebase projects (e.g. run and deploy Server).

You need Cordova to manage Cordova projects (e.g. install plugins).

**NOTE:** The Quasar team suggests using npm for global package management and yarn for project package management. It is assumed that this practice is being followed.

```sh
npm i -g @quasar/cli firebase-tools cordova
```

#### Local

Because this repo is a "monorepo" (contains both client and server code) you will need to install local packages in multiple places.

Starting in the project root directory (e.g. auth-sandbox).

```sh
> yarn

> cd client
> yarn

> cd ../server/functions
> yarn
```

### Client File Changes

| File                               | Actions                                                            |
| ---------------------------------- | ------------------------------------------------------------------ |
| `./client/.quasar.env-sample.json` | Copy (or move) this as `./client/.quasar.env.json`                 |
| `./client/.quasar.env.json`        | Replace `%local-ip-address%` with your computer's local IP address |
|                                    | Replace `%firebase...%` with values from your Firebase project     |
|                                    | Replace `%auth0...%` with values from your Auth0 account           |
| `./client/quasar.conf.js`          | Set `devServer.host` to your computer's local IP address           |

### Server File Changes

| File                     | Actions                                                            |
| ------------------------ | ------------------------------------------------------------------ |
| `./server/firebase.json` | Set `emulators.functions.host` to your computer's local IP address |

### Firebase Setup

Your Firebase environment requires some one-time commands. If you have never used the Firebase CLI then you'll first need to authenticate to Firebase from a command prompt.

```sh
firebase login
```

Once logged in you need to connect the local project to your Firebase project. This must be done in both the Client and Server projects.

#### Client

```sh
# Run in ./client directory
firebase init
```

-  Select or create Firebase project
-  Select `Hosting`
   -  Public directory: `dist/spa`
   -  Rewrite URLs to index.htm: `Y`

Answer `N` to anything else.

#### Server

```sh
# Run in ./server/functions directory
firebase init
```

-  Select or create a Firebase project
-  Select `Functions` and `Emulators`. Otherwise the defaults are fine.
   -  You only need the `Functions` emulator

## Running Locally

These commands are all run from the root of the project. Each script starts the Client and the Server in parallel. You can of course run them separately.

### Web (SPA) Mode

To run in the browser (SPA):

```sh
yarn run local:web
```

### Android (Cordova) Mode

To run in Android emulator:

```sh
yarn run local:android
```

The Client script will open Android Studio (if not already running) and open the project. Typically Android Studio will run several processes which could take a minute or so to complete. After everything seems to be done you can start the emulator of your choice.

**NOTE: ** You should be able to run the Client script without loading Android Studio by removing the `-i` argument; however, I could never get this to work.

### iOS (Cordova) Mode

To run in iOS emulator (only on MacOS):

```sh
yarn run local:ios
```

This Client script will open your default iOS emulator, install the application and launch it. If you have problems you can add the `-i` paramater to the Client script which will load XCode and basically work the same as the Android emulator.
