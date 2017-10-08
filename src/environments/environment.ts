// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: 'AIzaSyA4dB6hOmU5uSE9jJVIQOylozNgrKQTDtc',
    authDomain: 'hisp-development.firebaseapp.com',
    databaseURL: 'https://hisp-development.firebaseio.com',
    projectId: 'hisp-development',
    storageBucket: 'hisp-development.appspot.com',
    messagingSenderId: '1052791465048'
  }
};
