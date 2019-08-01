window.using_electron = true;

// const MountainClient = require('../../src/mountainclient-js').MountainClient;
const { spawn } = require('child_process');

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const path = require('path');
const tmp = require('tmp');

// window.electron_new_mountainclient = function () {
//     return new MountainClient({ fs: fs });
// }

window.ProcessRunner = function (pythonCode) {
    console.log('ProcessRunner')
    let tmpDir = tmp.dirSync({ template: 'tmp-mountainbrowser-XXXXXX', unsafeCleanup: true});;
    let exePath = tmpDir.name + '/entry.py';
    fs.writeFileSync(exePath, pythonCode);

    console.log('running', exePath);
    let m_process = spawn('python', [exePath]);
    m_process.stderr.on('data', (data) => {
        console.error('FROM PROCESS:', data.toString());
    });
    let m_buf = '';
    this.sendMessage = function (msg) {
        m_process.stdin.write(JSON.stringify(msg) + '\n');
    }
    this.onReceiveMessage = function (handler) {
        m_process.stdout.on('data', (data) => {
            m_buf = m_buf + data.toString();
            while (true) {
                let ind = m_buf.indexOf('\n');
                if (ind >= 0) {
                    let txt = m_buf.slice(0, ind);
                    m_buf = m_buf.slice(ind + 1);
                    let msg = JSON.parse(txt);
                    handler(msg);
                }
                else {
                    break;
                }
            }
        });
    }
    this.close = function() {
        // remove the temporary directory
        if (fs.existsSync(tmpDir.name)) {
            //removeDir(dirPath.name);
            tmpDir.removeCallback();
        }
        this.sendMessage({name: "quit"});
    }
}
