export function loadScript(src) {
  return new Promise((resolve, reject) => {
    const sciptElement = document.createElement("script");
    sciptElement.src = src;
    sciptElement.onload = () => resolve("Script loaded.");
    sciptElement.onerror = () => reject("Couldn't load script.");
    document.body.appendChild(sciptElement);
  });
}
