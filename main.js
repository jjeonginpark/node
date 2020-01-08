var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;

    if(pathName === '/'){
        if(queryData.id === undefined){
            fs.readdir('./data', (err, filelist) => {
                console.log(filelist);
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = '<ul>';
                filelist.forEach( file => {
                    list += `<li><a href="/?id=${file}">${file}</a></li>`;
                });
                list = list+'</ul>';
                
                console.log(list);
                var template = `
                <!doctype html>
                <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    ${list}
                    <h2>${title}</h2>
                    <p>${description}</p>
                </body>
                </html>
                `;
                response.writeHead(200);
                response.end(template);
            });
            
        }else{
            fs.readdir('./data', (err, filelist) => {
                console.log(filelist);
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = '<ul>';
                filelist.forEach( file => {
                    list += `<li><a href="/?id=${file}">${file}</a></li>`;
                });
                list = list+'</ul>';

                fs.readFile(`data/${queryData.id}`, (err, description) => {
                    var title = queryData.id;
                    var template = `
                    <!doctype html>
                    <html>
                    <head>
                        <title>WEB1 - ${title}</title>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1><a href="/">WEB</a></h1>
                        ${list}node
                        <h2>${title}</h2>
                        <p>${description}</p>
                    </body>
                    </html>
                    `;
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    }else{
        response.writeHead(404);
        response.end('Not Found');
    }
    
});
app.listen(3000);