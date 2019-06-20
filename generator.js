const fs = require('fs');

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
            <title>Something</title>
        </head>
        <body>
            ${generateLinks()}
        </body>
    </html>
    `;

    fs.writeFileSync(`./build/index.html`, content);
};

module.exports = {
    generateIndex
};