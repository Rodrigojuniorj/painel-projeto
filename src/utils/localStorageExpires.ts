export function setLocalStorage(chave: string, valor: string, horas: number) {
  var expirarem = new Date().getTime() + (3600000 * horas);
  localStorage.setItem(
    chave,
    JSON.stringify({
      value: valor,
      expires: expirarem,
    })
  );
}

function localStorageExpires() {
  var toRemove = <string[]>[], 
  currentDate = new Date().getTime(); 

  for (var i = 0, j = localStorage.length; i < j; i++) {
    var key = localStorage.key(i) as string,
      value = localStorage.getItem(key);

    if (value && value[0] === "{" && value.slice(-1) === "}") {
      var current = JSON.parse(value);

      if (current.expires && current.expires <= currentDate) {
        toRemove.push(key);
      }
    }
  }

  for (var i = toRemove.length - 1; i >= 0; i--) {
    localStorage.removeItem(toRemove[i]);
  }
}

export function getLocalStorage(chave: string) {
  localStorageExpires(); 

  var value = localStorage.getItem(chave);

  if (value && value[0] === "{" && value.slice(-1) === "}") {
    var current = JSON.parse(value);

    return current.value;
  }
}
