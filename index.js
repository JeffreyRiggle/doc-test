const fs = require('fs');
const { exec } = require('child_process');
const { processGitHubData } = require('./githubData');

if (!fs.existsSync('./build')) {
    fs.mkdirSync('./build');
}

fs.readdirSync('./doc').forEach(file => {
    fs.copyFileSync(`./doc/${file}`, `./build/${file}`);
});

processGitHubData().then(() => {
    const command = `eleventy --input=./build --output=_site`;
    console.log(command);
    
    exec(command, (error, stdout, stderr) => {
        console.log(`error: ${error}`);
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
});
