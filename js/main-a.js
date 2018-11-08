// Create function 'showImages' which
// adds the loaded HTML content to <ul> element
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    document.getElementsByTagName('ul')[0].innerHTML = this.responseText;
  }
};
xhttp.open('GET', 'images.html');
xhttp.send();
