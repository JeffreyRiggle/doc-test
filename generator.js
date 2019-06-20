const fs = require('fs');

function generateHeader() {
    return `
        <header>
            <h3>
                <a href>Home</a>
                <a href>Projects</a>
                <a href>Blog</a>
            </h3>
        </header>
    `
}
function generateLinks() {
    let retVal = '<ul>';
    fs.readdirSync('./build').forEach(file => {
        retVal += `<li><a href="./${file}/README/index.html">${file}</a></li>`
    });

    return retVal + '</ul>';
}

const generateIndex = () => {
    let content = `
    <html>
        <head>
            <title>My Site</title>
            <style>
                body {
                    margin: 0;
                }
                header {
                    background-color: black;
                    padding: 12px;
                }
                header a {
                    color: green;
                    margin-right: 8px;
                }
                ul {
                    list-style: none;
                }
            </style>
        </head>
        <body>
            ${generateHeader()}
            ${generateLinks()}
        </body>
    </html>
    `;

    fs.writeFileSync(`./build/index.html`, content);
};

module.exports = {
    generateIndex
};