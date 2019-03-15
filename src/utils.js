const path = require('path')
const vscode = require('vscode')
const fs = require('fs');

const loadHtml = (context, relaPath) => {
    const absPath = path.join(context.extensionPath, relaPath)
    const absDir = path.dirname(absPath)
    return fs.readFileSync(absPath, 'utf-8').replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
        return $1 + vscode.Uri.file(path.resolve(absDir, $2)).with({
            scheme: 'vscode-resource'
        }).toString() + '"';
    })

}

module.exports = loadHtml