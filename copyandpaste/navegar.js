const xpath = "/html/body/div[1]/div[2]/div/div[2]/div[1]/div/div/div/div[1]/div[2]/a[2]";
const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
element?.click();

//Funcion para esperar que carge el componente
function waitForXPathAndClick(xpath, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const interval = 100;
    let elapsed = 0;

    const check = () => {
      const element = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      if (element) {
        element.click();
        resolve(`Elemento encontrado y clickeado.`);
      } else if (elapsed >= timeout) {
        reject(`No se encontró el elemento en ${timeout}ms`);
      } else {
        elapsed += interval;
        setTimeout(check, interval);
      }
    };

    check();
  });
}

//Ejecutar funcion una vez halla cargado el componente
const xpath = "/html/body/div[2]/div/div[3]/button";

waitForXPathAndClick(xpath).then(msg => console.log(msg)).catch(err => console.error(err));
