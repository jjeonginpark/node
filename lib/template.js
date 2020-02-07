module.exports = {
    HTML : function (title, list, body, control) {
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
            ${control}
            ${body}
        </body>
        </html>
        `;
    },
    list : function (filelist) {
        var list = '<ul>';
        filelist.forEach( file => {
            list += `<li><a href="/page/${file}">${file}</a></li>`;
        });
        list = list+'</ul>';
        return list;
    }
}

//module.exports = template;