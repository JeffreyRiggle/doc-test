const https = require('https');

function getFromServer(url) {
    let data = '';
    return new Promise((resolve, reject) => {
        https.get(url, { headers: {'User-Agent': 'testdocbuilder'}}, res => {
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
        https.get(url, { headers: {'User-Agent': 'testdocbuilder'}}, res => {
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

async function processGitHubData() {
    let repos = await getFromServer('https://api.github.com/users/jeffreyriggle/repos');
    for (const repo in repos) {
        let contents = await getFromServer(`https://api.github.com/repos/JeffreyRiggle/${repo.name}/contents`);
        
        for (const v in contents) {
            if (v.name === 'README.md') {
                fs.mkdirSync(`./build/${repo.name}`);
                let content = getFromServerRaw(v.download_url);
                fs.writeFileSync(`./build/${repo.name}/README.md`, content);
            }
        }
    }
}

module.exports = {
    processGitHubData
};
