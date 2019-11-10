# modominator-react-example

Include [moDOMinator](https://github.com/tanhengyeow/moDOMinator) into components that you wish to scan for web vulnerabilities.

In this example, the following code is added into `App.js`:
```
import { scanElements } from "modominator";

...

scanSelectedElements() {
  // Select DOM elements to scan.
  const elements = document.querySelectorAll("input");

  // Scans list of DOM elements for web vulnerabilities.
  scanElements(elements);
}

componentDidMount() {
  this.scanSelectedElements();
}
```

Select all DOM elements that you wish to scan and pass an array of DOM elements as parameters into the `scanElements` function.

Web vulnerablities that succeed will be reported in the browser console or shown as a browser alert.

# Run locally

```
1. npm install
```

```
2. npm start
```

The following page will load in your browser:

![react-readme](/images/react-readme.PNG)
