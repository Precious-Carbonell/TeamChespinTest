function start() {
    document.body.classList.add('fadeout');
    setTimeout(function() {
        window.location.href = 'newPage.html';
    }, 1000);
  }
  
  document.getElementById('returnButton').addEventListener('click', function(event) {
    event.preventDefault();
    document.body.classList.add('fadeout');
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 1000);
  });
  
  document.getElementById('beginButton').addEventListener('click', function(event) {
    event.preventDefault();
    document.body.classList.add('fadeout');
    setTimeout(function() {
        window.location.href = 'game.html';
    }, 1000);
  });