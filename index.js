const fs = require('fs');
const { exec } = require('child_process');
const { processGitHubData } = require('./githubData');
const { generateIndex } = require('./generator');

if (!fs.existsSync('./build')) {
    fs.mkdirSync('./build');
}

fs.readdirSync('./doc').forEach(file => {
    fs.copyFileSync(`./doc/${file}`, `./build/${file}`);
});

const username = process.argv[2];
const token = process.argv[3];

function removeDir(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file, index) => {
            const cur = `${path}/${file}`;
            if (fs.lstatSync(cur).isDirectory()) {
                removeDir(cur);
            } else {
                fs.unlinkSync(cur);
            }
        });
        fs.rmdirSync(path);
    }
}

processGitHubData(username, token).then(() => {
    generateIndex();
    const command = `eleventy --input=./build --output=_site`;
    console.log(command);
    
    exec(command, (error, stdout, stderr) => {
        console.log(`error: ${error}`);
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        removeDir('./build');
    });
});
