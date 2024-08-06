// Declare variables to store key pair
let publicKey, privateKey;
// Function to generate RSA key pair
async function generateRSAKeyPair() {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
    );
    // Store the key pair
    publicKey = keyPair.publicKey;
    privateKey = keyPair.privateKey;
}
// Function to convert key to PEM format
async function exportKeyToPEM(key, type) {
    const keyData = await window.crypto.subtle.exportKey("spki", key);
    const exportedKeyBuffer = new Uint8Array(keyData);
    const exportedAsString = String.fromCharCode.apply(null, exportedKeyBuffer);
    const exportedAsBase64 = window.btoa(exportedAsString);

    const pemHeader = `-----BEGIN ${type} KEY-----`;
    const pemFooter = `-----END ${type} KEY-----`;

    return `${pemHeader}\n${exportedAsBase64}\n${pemFooter}`;
}
// Function to import key from PEM format
async function importKeyFromPEM(pem, type) {
    const pemHeader = `-----BEGIN ${type} KEY-----`;
    const pemFooter = `-----END ${type} KEY-----`;

    const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
    const binaryString = window.atob(pemContents);
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return window.crypto.subtle.importKey(
        "spki",
        bytes.buffer,
        {
            name: "RSA-OAEP",
            hash: "SHA-256",
        },
        true,
        ["encrypt"]
    );
}

// Function to encrypt data with RSA public key
async function encrypt() {
    const plaintext = document.getElementById("plaintext").value;

    // Generate key pair if not generated yet
    if (!publicKey || !privateKey) {
        await generateRSAKeyPair();
    }

    const publicPEM = await exportKeyToPEM(publicKey, "PUBLIC");

    console.log("Public Key (PEM format):", publicPEM);

    const importedPublicKey = await importKeyFromPEM(publicPEM, "PUBLIC");

    const encryptedData = await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP",
        },
        importedPublicKey,
        new TextEncoder().encode(plaintext)
    );

    const encryptedArray = Array.from(new Uint8Array(encryptedData));
    const encryptedString = encryptedArray.map(byte => String.fromCharCode(byte)).join('');
    const encryptedBase64 = window.btoa(encryptedString);

    document.getElementById("encryptedText").value = encryptedBase64;
}

// Function to decrypt data with RSA private key
async function decrypt() {
    const encryptedData = document.getElementById("encryptedText").value;

    // Generate key pair if not generated yet
    if (!publicKey || !privateKey) {
        await generateRSAKeyPair();
    }

    const decryptedData = await window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP",
        },
        privateKey,
        new Uint8Array(Array.from(window.atob(encryptedData)).map(char => char.charCodeAt(0)))
    );

    const decryptedText = new TextDecoder().decode(decryptedData);

    console.log("Decrypted Text:", decryptedText);

    // Display the decrypted text in the "Decrypted Text" textarea
    document.getElementById("decryptedText").value = decryptedText;
}