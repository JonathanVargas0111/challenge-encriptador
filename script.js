function encriptarTexto(texto) {
    const reemplazos = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };
    let textoEncriptado = '';
    for (let char of texto) {
        textoEncriptado += reemplazos[char] || char;
    }
    return textoEncriptado;
}

function desencriptarTexto(texto) {
    const reemplazos = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };
    let textoDesencriptado = texto;
    for (let clave in reemplazos) {
        let regex = new RegExp(clave, 'g');
        textoDesencriptado = textoDesencriptado.replace(regex, reemplazos[clave]);
    }
    return textoDesencriptado;
}

function verificarTexto(texto) {
    const regex = /^[a-z\n\s]+$/;
    return regex.test(texto);
}

function procesarTexto(accion) {
    const inputTexto = document.getElementById('inputTexto').value;
    const btnEncriptar = document.getElementById('btnEncriptar');
    const btnDesencriptar = document.getElementById('btnDesencriptar');
    const statusMessage = document.getElementById('statusMessage');
    const noMessage = document.getElementById('noMessage');
    const outputTexto = document.getElementById('outputTexto');
    const copySection = document.querySelector('.copy-section');
    
    if (!verificarTexto(inputTexto)) {
        alert("El texto no cumple con los requisitos: solo letras minúsculas sin acentos ni caracteres especiales.");
        return;
    }

    btnEncriptar.disabled = true;
    btnDesencriptar.disabled = true;
    statusMessage.textContent = '';

    let textoProcesado;
    if (accion === 'encriptar') {
        textoProcesado = encriptarTexto(inputTexto);
    } else {
        const desencriptado = desencriptarTexto(inputTexto);
        if (desencriptado === inputTexto) {
            statusMessage.textContent = 'El texto ya está desencriptado.';
        }
        textoProcesado = desencriptado;
    }

    outputTexto.textContent = textoProcesado;

    btnEncriptar.disabled = false;
    btnDesencriptar.disabled = false;

    if (textoProcesado) {
        noMessage.style.display = 'none';
        copySection.style.display = 'block';
    } else {
        noMessage.style.display = 'block';
        copySection.style.display = 'none';
    }
}

function copiarTexto() {
    const outputTexto = document.getElementById('outputTexto');
    const range = document.createRange();
    range.selectNode(outputTexto);
    window.getSelection().removeAllRanges(); 
    window.getSelection().addRange(range); 
    document.execCommand('copy');
    
    const copyMessage = document.getElementById('copyMessage');
    copyMessage.style.display = 'block';
    
    setTimeout(() => {
        copyMessage.style.display = 'none';
    }, 2000);
}
