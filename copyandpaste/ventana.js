(function () {
  // Crear fondo semitransparente
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = 9999;

  // Crear ventana (modal)
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.backgroundColor = "#fff";
  modal.style.padding = "20px";
  modal.style.borderRadius = "12px";
  modal.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
  modal.style.zIndex = 10000;
  modal.style.maxWidth = "90%";
  modal.style.width = "400px";
  modal.style.textAlign = "center";

  // Contenido de la ventana
  modal.innerHTML = `
    <h2>¡Hola!</h2>
    <p>Esta es una ventana personalizada creada con JavaScript.</p>
    <button id="cerrarModal">Cerrar</button>
  `;

  // Añadir evento para cerrar
  modal.querySelector("#cerrarModal").onclick = function () {
    document.body.removeChild(overlay);
    document.body.removeChild(modal);
  };

  // Añadir al documento
  document.body.appendChild(overlay);
  document.body.appendChild(modal);
})();