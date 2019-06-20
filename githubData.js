const https = require('https');
const fs = require('fs');
let auth = '';

function getHeaders() {
    return {
        'User-Agent': 'testdocbuilder',
        'Authorization': auth
    };
}

function getFromServer(url) {
    let data = '';
    return new Promise((resolve, reject) => {
        https.get(url, { headers: getHeaders() }, res => {
            res.on('data', d => {
                data += d;
            });

            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on('error', e => {
            reject(e);
        });
    });
}

function getFromServerRaw(url) {
    let data = '';
    return new Promise((resolve, reject) => {
        https.get(url, { headers: getHeaders() }, res => {
            res.on('data', d => {
                data += d;
            });

            res.on('end', () => {
                resolve(data);
            });
        }).on('error', e => {
            reject(e);
        });
    });
}

async function processGitHubData(username, token) {
    auth = `Basic ${new Buffer(`${username}:${token}`).toString('base64')}`
    let repos = await getFromServer('https://api.github.com/users/jeffreyriggle/repos');
    for (const ind in repos) {
        const repo = repos[ind];
        console.log(`Checking contents for repo ${repo.name}`);
        let contents = await getFromServer(`https://api.github.com/repos/JeffreyRiggle/${repo.name}/contents`);
        
        for (const i in contents) {
            let v = contents[i];
            if (v.name === 'README.md') {
                console.log('Found README file copying contents');
                fs.mkdirSync(`./build/${repo.name}`);
                let content = await getFromServerRaw(v.download_url);
                fs.writeFileSync(`./build/${repo.name}/README.md`, content);
            }
        }
    }
}

module.exports = {
    processGitHubData
};
