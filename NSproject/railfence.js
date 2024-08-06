function encrypt() {
    const message = document.getElementById('message').value;
    const rails = parseInt(document.getElementById('rails').value);
    const encryptedMessage = railFenceEncrypt(message, rails);
    document.getElementById('output').innerText = 'Encrypted Message: ' + encryptedMessage;
}

function decrypt() {
    const message = document.getElementById('message').value;
    const rails = parseInt(document.getElementById('rails').value);
    const decryptedMessage = railFenceDecrypt(message, rails);
    document.getElementById('output').innerText = 'Decrypted Message: ' + decryptedMessage;
}

function railFenceEncrypt(message, rails) {
    const fence = Array.from({ length: rails }, () => []);

    let rail = 0;
    let direction = 1;

    for (let char of message) {
        fence[rail].push(char);
        rail += direction;

        if (rail === rails - 1 || rail === 0) {
            direction = -direction;
        }
    }

    const encryptedMessage = fence.flat().join('');
    return encryptedMessage;
}

function railFenceDecrypt(message, rails) {
    const fence = Array.from({ length: rails }, () => []);

    let rail = 0;
    let direction = 1;

    for (let i = 0; i < message.length; i++) {
        fence[rail].push(i);
        rail += direction;

        if (rail === rails - 1 || rail === 0) {
            direction = -direction;
        }
    }

    let index = 0;
    const decryptedMessage = message.split('').map(() => message[fence.flat().indexOf(index++)]).join('');
    return decryptedMessage;
}
