document.addEventListener('DOMContentLoaded', function(){
  whenAvailable('a', links => {
    links.forEach(link => {
      link.classList.add('button', 'is-medium', 'is-dark');
      // link.style.width = "25vw";

      link.addEventListener('mouseover', function(event) {
        document.querySelector('object').setAttribute('data', link.getAttribute('href'));
      });
    });
  });
}, false);

function whenAvailable(name, callback) {
  var interval = 10;
  window.setTimeout(function() {
    var obj = document.querySelectorAll(name);
    if (obj.length) {
        callback(obj);
    } else {
        window.setTimeout(arguments.callee, interval);
    }
  }, interval);
}
