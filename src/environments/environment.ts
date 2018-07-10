// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyB6gNiBfwzrptKROyB13_s2TpWFyc5BGIM",
    authDomain: "mu-canteen-admin.firebaseapp.com",
    databaseURL: "https://mu-canteen-admin.firebaseio.com",
    projectId: "mu-canteen-admin",
    storageBucket: "mu-canteen-admin.appspot.com",
    messagingSenderId: "859503932406"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
