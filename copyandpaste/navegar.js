const xpath = "/html/body/div[1]/div[2]/div/div[2]/div[1]/div/div/div/div[1]/div[2]/a[2]";
const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
element?.click();
