document.getElementById('launchButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action
    document.body.classList.add('fadeout'); // Add the 'fadeout' class to the body

    setTimeout(function() {
        window.location.href = 'newPage.html'; // Redirect to newPage.html after 6 seconds
    }, 6000); // Change 3000 to 6000
});