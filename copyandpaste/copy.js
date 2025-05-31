function limiarDatos( texto ){
    const palabrasAEliminar = [ "DPI", "TELEFONO", "TELÉFONO", "EMPRESA", "NOMBRE" ];
    for( let palabra of palabrasAEliminar ){
        const regex = new RegExp("\\b" + palabra + "\\b\\s*", "gi");
        texto = texto.toUpperCase().replace(regex, "");
    }
    return texto.trim();
}

document.addEventListener('keydown', async function(event) {
    if( event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'v'){
        event.preventDefault();
        try{
            const texto = await navigator.clipboard.readText();
            let datospp = [];
            console.log(JSON.stringify(texto));
            if ( texto.includes("\t") ){
                datospp = texto.split("\r\n");
            }else if (texto.includes("\r\n")) {
                datospp = texto.split("\r\n \r\n");
            }else{
                console.log("No se pudo detectar el separadaro correctamente")
            }
            console.log(datospp);
            
            let datoslimpios = [];
            for( let dato of datospp ){
                datoslimpios.push( limiarDatos(dato) );
            }

            const datosABorra = ["FECHA DE NACIMIENTO", "UBICACIÓN", "UBICACION"];
            let listafiltrada = datoslimpios.filter( item => 
                !datosABorra.some( palabra => 
                    item.toLowerCase().includes(palabra.toLowerCase())
                )
            );
            
            console.log(listafiltrada);
            return texto
        } catch (err) {
            console.log("Error al leer del portapapeles " + err);
        }
    }
})




