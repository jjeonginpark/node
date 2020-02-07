/* 2단계 node express 깔고 라우팅 방식으로 코딩하기. */
const express = require('express');
const app = express();
const port = 3000;
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const sanitizeHtml = require('sanitize-html');
const template = require('./lib/template.js');
const path = require('path');

app.get('/', (request, response) => {
    fs.readdir('./data', (err, filelist) => {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = template.list(filelist);
        var html = template.HTML(title, list, 
            `<h2>${title}</h2><p>${description}</p>`, 
            `<a href="/create">create</a>`);
        response.send(html);
    });
});

app.get('/page/:pageId', (request, response) => {
    fs.readdir('./data', (err, filelist) => {
        var filteredId = path.parse(request.params.pageId).base;
        fs.readFile(`data/${filteredId}`, (err, description) => {
            var title = request.params.pageId;
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description, {
                allowedTags : ['h1'],
            });
            var list = template.list(filelist);
            var html = template.HTML(title, list, 
                `<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`,
                `<a href="/create">create</a>
                <a href="/update/${sanitizedTitle}">update</a>
                <form action="/delete_process" method="post">
                    <input type="hidden" name="id" value="${sanitizedTitle}">
                    <input type="submit" value="delete">
                </form>`
                );
            response.send(html);
        });
    });
});

app.get('/create', (request, response) => {
    fs.readdir('./data', (err, filelist) => {
        var title = 'WEB - create';
        var list = template.list(filelist);
        var html = template.HTML(title, list, `
        <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title" /></p>
            <p><textarea name="description" placeholder="description" ></textarea></p>
            <p><input type="submit" /></p>
        </form>`,'');
        response.send(html);
    });
})

app.post('/create_process', (request, response) =>{
    var body = '';
        request.on('data',(data) => {
            body = body + data;
        });
        request.on('end', () => {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, (err) => {
                response.redirect('/');
            });
    });
});

app.get('/update/:pageId', (request, response) => {
    fs.readdir('./data', (err, filelist) => {
        var list = template.list(filelist);
        var filteredId = path.parse(request.params.pageId).base;
        fs.readFile(`data/${filteredId}`, (err, description) => {
            var title = request.params.pageId;
            var html = template.HTML(title, list, 
                `<form action="/update_process" method="post">
                    <input type="hidden" name="id" value="${title}">
                    <p><input type="text" name="title" placeholder="title" value="${title}" /></p>
                    <p><textarea name="description" placeholder="description" >${description}</textarea></p>
                    <p><input type="submit" /></p>
                </form>`,
                `<a href="/create">create</a> <a href="/update/${title}">update</a>`
                );
            response.send(html);
        });
    });
})

app.post('/update_process', (request, response) =>{
    var body = '';
    request.on('data',(data) => {
        body = body + data;
    });
    request.on('end', () => {
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        var filteredId = path.parse(id).base;
        fs.rename(`data/${filteredId}`, `data/${title}`, (err) => {
            fs.writeFile(`data/${title}`, description, (err) => {
                response.redirect('/');
            });
        });
    });
});

app.post('/delete_process', (request, response) =>{
    var body = '';
    request.on('data',(data) => {
        body = body + data;
    });
    request.on('end', () => {
        var post = qs.parse(body);
        var id = post.id;
        var filereadId = path.parse(id).base;
        fs.unlink(`data/${filereadId}`, (err) => {
            response.redirect('/');
        });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

/*
1단계 Node.js 설치후 페이지 템플릿만들고, 수정, 삭제하는 기능을 넣음.

var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var sanitizeHtml = require('sanitize-html');

var template = require('./lib/template.js');
var path = require('path');


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    
    if(pathname === '/'){
        if(queryData.id === undefined){
            fs.readdir('./data', (err, filelist) => {
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = template.list(filelist);
                var html = template.HTML(title, list, 
                    `<h2>${title}</h2><p>${description}</p>`, 
                    `<a href="/create">create</a>`);
                response.writeHead(200);
                response.end(html);
            });
        }else{
            fs.readdir('./data', (err, filelist) => {
                var filteredId = path.parse(queryData.id).base;
                fs.readFile(`data/${filteredId}`, (err, description) => {
                    var title = queryData.id;
                    var sanitizedTitle = sanitizeHtml(title);
                    var sanitizedDescription = sanitizeHtml(description, {
                        allowedTags : ['h1'],
                    });
                    var list = template.list(filelist);
                    var html = template.HTML(title, list, 
                        `<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`,
                        `<a href="/create">create</a>
                        <a href="/update?id=${sanitizedTitle}">update</a>
                        <form action="delete_process" method="post">
                            <input type="hidden" name="id" value="${sanitizedTitle}">
                            <input type="submit" value="delete">
                        </form>`
                        );
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    } else if (pathname === '/create') {
        fs.readdir('./data', (err, filelist) => {
            var title = 'WEB - create';
            var list = template.list(filelist);
            var html = template.HTML(title, list, `
            <form action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="title" /></p>
                <p><textarea name="description" placeholder="description" ></textarea></p>
                <p><input type="submit" /></p>
            </form>`,'');
            response.writeHead(200);
            response.end(html);
        });
    } else if (pathname === '/create_process') {
        var body = '';
        request.on('data',(data) => {
            body = body + data;
        });
        request.on('end', () => {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, (err) => {
                response.writeHead(302, {'Location':`/?id=${title}`});
                response.end();
            });
        });
    } else if (pathname === '/update'){
        fs.readdir('./data', (err, filelist) => {
            var list = template.list(filelist);
            var filteredId = path.parse(queryData.id).base;
            fs.readFile(`data/${filteredId}`, (err, description) => {
                var title = queryData.id;
                var html = template.HTML(title, list, 
                    `<form action="/update_process" method="post">
                        <input type="hidden" name="id" value="${title}">
                        <p><input type="text" name="title" placeholder="title" value="${title}" /></p>
                        <p><textarea name="description" placeholder="description" >${description}</textarea></p>
                        <p><input type="submit" /></p>
                    </form>`,
                    `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
                    );
                response.writeHead(200);
                response.end(html);
            });
        });
    } else if (pathname === '/update_process') {
        var body = '';
        request.on('data',(data) => {
            body = body + data;
        });
        request.on('end', () => {
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            var filteredId = path.parse(id).base;
            fs.rename(`data/${filteredId}`, `data/${title}`, (err) => {
                fs.writeFile(`data/${title}`, description, (err) => {
                    response.writeHead(302, {'Location':`/?id=${title}`});
                    response.end();
                });
            });
        });
    } else if (pathname === '/delete_process') {
            var body = '';
            request.on('data',(data) => {
                body = body + data;
            });
            request.on('end', () => {
                var post = qs.parse(body);
                var id = post.id;
                fs.unlink(`data/?id=${id}`, (err) => {
                    response.writeHead(302, {'Location':`/`});
                    response.end();
                });
            });
    } else {
        response.writeHead(404);
        response.end('Not Found');
    }
});
app.listen(3000);
*/