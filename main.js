var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var templateHTML = (title, list, body) => {
    return `
    <!doctype html>
    <html>
    <head>
        <title>WEB - ${title}</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1><a href="/">WEB2</a></h1>
        ${list}
        <p><a href="/create">create</a></a>
        ${body}
    </body>
    </html>
    `;
}
var templateList = (filelist) => {
    var list = '<ul>';
    filelist.forEach( file => {
        list += `<li><a href="/?id=${file}">${file}</a></li>`;
    });
    list = list+'</ul>';
    return list;
}
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
        if(queryData.id === undefined){
            fs.readdir('./data', (err, filelist) => {
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = templateList(filelist);
                var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
                response.writeHead(200);
                response.end(template);
            });
        }else{
            fs.readdir('./data', (err, filelist) => {
                var list = templateList(filelist);
                fs.readFile(`data/${queryData.id}`, (err, description) => {
                    var title = queryData.id;
                    var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    } else if (pathname === '/create') {
        fs.readdir('./data', (err, filelist) => {
            var title = 'WEB - create';
            var list = templateList(filelist);
            var template = templateHTML(title, list, `
            <form action="http://localhost:3000/create_process" method="post">
                <p><input type="text" name="title" placeholder="title" /></p>
                <p><textarea name="description" placeholder="description" ></textarea></p>
                <p><input type="submit" /></p>
            </form>
            `);
            response.writeHead(200);
            response.end(template);
        });
    } else if (pathname === '/create_process') {
        var body = '';
        request.on('data',(data) => {
            body = body + data;
        });
        request.on('end', () => {
            var post = qs.parse(body);
            console.log(post);
        });
        response.writeHead(200);
        response.end('success');

    }else {
        response.writeHead(404);
        response.end('Not Found');
    }
    
});
app.listen(3000);