function encrypt() {
    const message = document.getElementById('message').value;
    const key = document.getElementById('key').value;

    if (!message || !key) {
        alert('Please enter both a message and a key.');
        return;
    }

    const encryptedMessage = disruptedEncrypt(message, key);
    document.getElementById('output').innerText = 'Encrypted Message: ' + encryptedMessage;
}

function decrypt() {
    const message = document.getElementById('message').value;
    const key = document.getElementById('key').value;

    if (!message || !key) {
        alert('Please enter both a message and a key.');
        return;
    }

    const decryptedMessage = disruptedDecrypt(message, key);
    document.getElementById('output').innerText = 'Decrypted Message: ' + decryptedMessage;
}

function disruptedEncrypt(message, key) {
    const keyArray = Array.from(key);
    const sortedKeyArray = [...keyArray].sort();

    const indexes = keyArray.map((_, i) => i);
    const sortedIndexes = indexes.sort((a, b) => keyArray[a].localeCompare(keyArray[b]));

    let result = '';
    for (let i = 0; i < message.length; i++) {
        const row = Math.floor(i / key.length);
        const col = sortedIndexes[i % key.length];
        const index = row * key.length + col;
        result += message[index];
    }

    return result;
}

function disruptedDecrypt(message, key) {
    const keyArray = Array.from(key);
    const sortedKeyArray = [...keyArray].sort();

    const indexes = keyArray.map((_, i) => i);
    const sortedIndexes = indexes.sort((a, b) => keyArray[a].localeCompare(keyArray[b]));

    const numRows = Math.ceil(message.length / key.length);

    const matrix = Array.from({ length: numRows }, () => Array.from({ length: key.length }));

    let count = 0;
    for (const index of sortedIndexes) {
        for (let i = 0; i < numRows; i++) {
            matrix[i][index] = message[count++];
        }
    }

    let result = '';
    for (let i = 0; i < numRows; i++) {
        for (const index of indexes) {
            result += matrix[i][index] || '';
        }
    }

    return result;
}