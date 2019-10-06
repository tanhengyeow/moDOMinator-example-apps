# modominator-react-example (custom)

This example uses [moDOMinator-chrome-extension](https://github.com/tanhengyeow/moDOMinator-chrome-extension) as a custom tool to scan for web vulnerabilities.

New DOM elements that are rendered will be scanned for web vulnerabilities. Web vulnerablities that succeed will be reported in the browser console or shown as a browser alert.

TODO: Save the alerts in the browser extension UI.

# Setting up Google Chrome extension

1. Download the moDOMinator Google Chrome extension from [here](https://github.com/tanhengyeow/moDOMinator-chrome-extension).
2. Follow the given instructions to build the extension.
3. In Google Chrome, type **chrome://extensions** in your address bar.
4. Ensure **Developer mode** is turned on. This option can be found at the top right of the page.

![chrome-developermode](/images/chrome-developermode.PNG)

5. Click **"Load unpacked"** and select the downloaded folder.

![chrome-select-folder](/images/react-custom-selectfolder.PNG)

6. The extension would be added to your browser and would appear in the browser's toolbar at the top right.

![chrome-toolbar](/images/react-custom-toolbar.PNG)

# Start the example application

```
7. npm install
```
```
8. npm start
```
The following page would be loaded:

![react-custom-beforeclick](/images/react-custom-beforeclick.PNG)

9. Clicking the button would trigger the attack.

![react-custom-popup](/images/react-custom-popup.PNG)