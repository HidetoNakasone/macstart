
console.log('Hello')

var xhr = new XMLHttpRequest();

xhr.open('get', '/ajax/dev');
xhr.send();

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText)
    }
  }
};
