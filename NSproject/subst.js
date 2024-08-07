function substitutionCipher(text, shift) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);

        if (charCode >= 65 && charCode <= 90) {
            result += String.fromCharCode((charCode - 65 + shift) % 26 + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            result += String.fromCharCode((charCode - 97 + shift) % 26 + 97);
        } else {
            result += text.charAt(i);
        }
    }
    return result;
}

function encrypt() {
    const inputText = document.getElementById('inputText').value;
    const shift = 3;
    const encryptedText = substitutionCipher(inputText, shift);
    document.getElementById('outputText').value = encryptedText;
}

function decrypt() {
    const inputText = document.getElementById('inputText').value;
    const shift = 23; // Decryption shift is the inverse of encryption shift
    const decryptedText = substitutionCipher(inputText, shift);
    document.getElementById('outputText').value = decryptedText;
}
