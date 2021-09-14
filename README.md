# Sentry + NextJS: Minified Crash Not Logged Demo

### Rebuild the project from scratch

In an empty working directory...

1. Run the following commands one at a time in Terminal to do a vanilla installation of NextJS. (See [NextJS Docs](https://nextjs.org/docs/api-reference/create-next-app)):
```bash
npx create-next-app sentry-nextjs-crash-demo
cd sentry-nextjs-crash-demo
rm next.config.js
```
_(`sentry-nextjs-crash-demo` is just an app name and can be anything.)_

2. Run the following commands one at a time in Terminal to install Sentry for NextJS. (See [Sentry Docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)):
```
npm install --save @sentry/nextjs
npx @sentry/wizard -i nextjs
```
_(You'll need a NextJS Project in Sentry to send events to, which the terminal with prompt you to choose during setup.)_

3. Replace everything in `pages/index.js` with the following, which create two buttons that cause intentional runtime errors. We'll use these in a moment to test error logging in Sentry:
```javascript
import { useState } from 'react'

const Debug = () => {
  const [value, setValue] = useState({ words: "to test error reporting." });

  return (
    <div>
      <p>
        <button onClick={() => thisIsNotReal()}>
          Cause Intentional ReferenceError
        </button>
        <span>to test error reporting.</span>
      </p>
      <p>
        <button onClick={() => setValue(undefined)}>
          Cause Intentional TypeError (App Crash)
        </button>
        <span>{value.words}</span>
      </p>
    </div>
  );
};

export default Debug;
```

### Run the project and demo the issue

1. Run the following commands one at a time in Terminal to run a production version of the application locally
```
npm run build
npm run start
```
_(Note 1: Must be run while still inside the `sentry-nextjs-crash-demo` folder)_
_(Note 2: There is a [known Sentry issue (#3968)](https://github.com/getsentry/sentry-javascript/issues/3968) where `npm run build` doesn't read from `.sentryclirc`. You may need to set your auth token as an environment variable with `export SENTRY_AUTH_TOKEN=` to get the build to succeed if this issue remains unresolved.)

2. Navigate to `localhost:3000`. (Open the Console to capture additional output.)
3. Click the top button to cause a `ReferenceError` that **will not crash the app**. You will see the error output in the console and properly reported in Sentry.
![Console output](https://user-images.githubusercontent.com/8572738/132714415-27983dd8-6e19-405d-81e4-96c4010b3742.png)
4. Click the top button to cause a `TypeError` that **will crash the app**. You will see the error output in the console, but **it will not be reported in Sentry.**
![Console output](https://user-images.githubusercontent.com/8572738/132714355-c6900256-409d-47d6-8402-418e31c80c2e.png)
