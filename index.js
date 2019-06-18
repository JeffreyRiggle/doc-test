const { exec } = require('child_process');

const command = `eleventy --input=./doc --output=_site`;
console.log(command);

exec(command, (error, stdout, stderr) => {
    console.log(`error: ${error}`);
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});