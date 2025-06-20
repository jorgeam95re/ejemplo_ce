document.addEventListener('keydown', async function(event) {
    if( event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'v'){
        event.preventDefault();
        try{
            const texto = await navigator.clipboard.readText();
            
            const palabrasClave = ['TELEFONO', 'DPI', 'LUGAR', 'FECHA', 'EMPRESA'];
            const nombres = texto
              .split(/\r?\n|\t/)
              .map(line => line.trim())
              .filter(line => {
                const palabras = line.match(/(?<![@\w])\b[A-ZÁÉÍÓÚÑa-záéíóúñ]{3,}\b(?!\.\w)/g);
                if (!palabras || palabras.length < 3) return false;
                const primeraPalabra = palabras[0].toUpperCase();
                return !palabrasClave.includes(primeraPalabra);
              });

            const regnumeros = texto.match(/\b\d(?:\s*\d){7}\b/g) || [];
            const numeros = regnumeros
              .map(m => m.replace(/\s+/g, ''))
              .filter(m => m.length === 8);

            const regide = texto.match(/\b\d(?:\s*\d){11,12}\b/g) || [];
            const ide = regide
              .map(m => m.replace(/\s+/g, ''))  
              .filter(m => m.length === 12 || m.length === 13);   

            const contrata = texto.match(/(?<![@\w])\b(IIFGO|OOKI|PIPO|MEGA)\b(?!\.\w)/gi);

            console.log(nombres);
            console.log(numeros);
            console.log(ide);
            console.log(contrata);

            return texto
        } catch (err) {
            console.log("Error al leer del portapapeles " + err);
        }
    }
})
