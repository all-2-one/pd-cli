export default function myBanner() {
    return {
        name: 'my-banner',
        generateBundle(_, info) {
            info['index.js'].code = `#! /usr/bin/env node \n${info['index.js'].code}`
        }
    }
}