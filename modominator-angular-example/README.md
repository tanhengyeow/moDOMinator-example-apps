# modominator-react-example (custom)

This example uses [moDOMinator-chrome-extension](https://github.com/tanhengyeow/moDOMinator-chrome-extension) as a custom tool to scan for web vulnerabilities.

New DOM elements that are rendered will be scanned for web vulnerabilities. Web vulnerablities that succeed will be reported in the browser console or shown as a browser alert.

# Run locally

```
1. npm install
```

```
2. npm start
```

```
3. Go to your browser and type **localhost:4200** in the address bar to see the page.

The following page will be loaded in your browser:

![angular-readme](/images/angular-readme.PNG)
```

```
4. To test script, type in the following input:
<img src="a.jpg" onerror="alert('Hi! I am script and I bypassed angular security')">
```
