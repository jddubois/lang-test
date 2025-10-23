// Import required extensions for JSON support
import '@codingame/monaco-vscode-json-default-extension';

// Import Monaco Language Client components
import { EditorApp } from 'monaco-languageclient/editorApp';
import { configureDefaultWorkerFactory } from 'monaco-languageclient/workerFactory';
import { MonacoVscodeApiWrapper } from 'monaco-languageclient/vscodeApiWrapper';
import { LanguageClientWrapper } from 'monaco-languageclient/lcwrapper';

// VSCode API for file system operations
import * as vscode from 'vscode';
import { LogLevel } from '@codingame/monaco-vscode-api';

async function createJsonEditor() {
    const languageId = 'json';
    // Sample JSON content
    const code = `{
    "$schema": "http://json.schemastore.org/coffeelint",
    "line_endings": "unix"
}`;
    const codeUri = '/workspace/hello.json';

    // Monaco VSCode API configuration
    const vscodeApiConfig = {
        $type: 'extended',
        viewsConfig: {
            $type: 'EditorService'
        },
        logLevel: LogLevel.Debug,
        userConfiguration: {
            json: JSON.stringify({
                'workbench.colorTheme': 'Default Dark Modern',
                'editor.wordBasedSuggestions': 'off'
            })
        },
        monacoWorkerFactory: configureDefaultWorkerFactory
    };

    // Language client configuration
    const languageClientConfig = {
        languageId,
        connection: {
            options: {
                $type: 'WebSocketUrl',
                url: 'ws://localhost:30000/sampleServer'
            }
        },
        clientOptions: {
            documentSelector: [languageId],
            workspaceFolder: {
                index: 0,
                name: 'workspace',
                uri: vscode.Uri.file('/workspace')
            }
        }
    };

    // Create the monaco-vscode api Wrapper
    const apiWrapper = new MonacoVscodeApiWrapper(vscodeApiConfig as any);
    await apiWrapper.start();

    // Create language client wrapper
    const lcWrapper = new LanguageClientWrapper(languageClientConfig as any);
    await lcWrapper.start();

    // Create the editor app
    const editorApp = new EditorApp({
        codeResources: {
            original: {
                text: code,
                uri: codeUri
            }
        }
    });

    // Start the editor
    const htmlContainer = document.getElementById('monaco-editor-root')!;
    await editorApp.start(htmlContainer);

    console.log('JSON editor with language client is ready!');
}
createJsonEditor().catch(console.error);