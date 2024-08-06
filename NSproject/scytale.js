function encrypt() {
    const message = document.getElementById('message').value;
    const diameter = parseInt(document.getElementById('diameter').value, 10);

    if (!message || isNaN(diameter) || diameter < 2) {
        alert('Please enter a valid message and rod diameter (minimum 2).');
        return;
    }

    const encryptedMessage = scytaleEncrypt(message, diameter);
    document.getElementById('output').innerText = 'Encrypted Message: ' + encryptedMessage;
}

function decrypt() {
    const message = document.getElementById('message').value;
    const diameter = parseInt(document.getElementById('diameter').value, 10);

    if (!message || isNaN(diameter) || diameter < 2) {
        alert('Please enter a valid message and rod diameter (minimum 2).');
        return;
    }

    const decryptedMessage = scytaleDecrypt(message, diameter);
    document.getElementById('output').innerText = 'Decrypted Message: ' + decryptedMessage;
}

function scytaleEncrypt(message, diameter) {
    const numRows = Math.ceil(message.length / diameter);
    const matrix = Array.from({ length: numRows }, () => Array.from({ length: diameter }));

    let count = 0;
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < diameter; j++) {
            matrix[i][j] = message[count++] || ' ';
        }
    }

    let result = '';
    for (let j = 0; j < diameter; j++) {
        for (let i = 0; i < numRows; i++) {
            result += matrix[i][j];
        }
    }

    return result;
}

function scytaleDecrypt(message, diameter) {
    const numRows = Math.ceil(message.length / diameter);
    const matrix = Array.from({ length: numRows }, () => Array.from({ length: diameter }));

    let count = 0;
    for (let j = 0; j < diameter; j++) {
        for (let i = 0; i < numRows; i++) {
            matrix[i][j] = message[count++] || ' ';
        }
    }

    let result = '';
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < diameter; j++) {
            result += matrix[i][j];
        }
    }

    return result.trim();
}
