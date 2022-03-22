import chokidar from 'chokidar'
import fs from 'fs'
import { execSync } from 'child_process'

let config = {}

try {
    config = JSON.parse(fs.readFileSync('./.watchandrunrc'));
} catch (error) {
    throw new Error('Please create a".watchandrunrc" file containing valid JSON in the root of your project.')
}

const { watchDir, command } = config

if (watchDir == null || command == null) {
    throw new Error('Please define "watchDir" and "command" property in ".watchandrunrc".')
}

chokidar.watch(watchDir).on('change', (path) => {
    execSync(command.replace('${fileName}', path))
});