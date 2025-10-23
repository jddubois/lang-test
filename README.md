This repo is an attempt at setting up a minimal example of monaco-languageclient.

You can build via
```
npm i
npm run build
```

I copied the example from [here](https://github.com/TypeFox/monaco-languageclient/blob/main/docs/guides/examples.md#example-1-json-editor-extended-mode) almost exactly (in apps/frontend/src/main.ts). The only changes are to fix type errors, make it point to the correct element on the page.

Note that my dependencies are minimal-

```
  "dependencies": {
    "monaco-languageclient": "^10.1.0",
    "vscode-ws-jsonrpc": "^3.5.0",
    "@codingame/monaco-vscode-json-default-extension": "^22.1.0",
    // added this in order to avoid other build issues
    "vscode": "npm:@codingame/monaco-vscode-extension-api@^22.1.0"
  }
```

I hope you can find something obviously wrong here! Thanks for your help.
