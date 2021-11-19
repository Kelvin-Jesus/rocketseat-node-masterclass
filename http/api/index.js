const http = require('http')
const URL = require('url')
const fs = require('fs')
const path = require('path')

const data = require('./url.json')

const writeFile = callback => {
    return fs.writeFile(
        path.join(__dirname, 'url.json'), 
        JSON.stringify(data, null, 4),
        (err) => {
            if (err) throw err
            callback(JSON.stringify({ message: 'ok' }))
        }
    )
}

http.createServer((req, res) => {

    const { name, url, del } = URL.parse(req.url, true).query

    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    })

    // all resource
    if ( !name || !url )
        return res.end(JSON.stringify(data))
    
    if ( del ) {
        data.url = data.url.filter( i => String(i.url) !== String(url) )
        return writeFile( message => res.end(message) )
         
    }

    data.url.push({name, url})

    return writeFile( message => res.end(message) )

}).listen(3000, () => console.log('API is running'))