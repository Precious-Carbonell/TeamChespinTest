document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('exitButton').addEventListener('click', function() {
        // Set flag in localStorage
        localStorage.setItem('exitClicked', true);
        // Close the window
        window.location.replace('about:blank');
    });

    document.querySelector('.launch-btn').addEventListener('click', function() {
        // Display the GIF overlay
        var gifOverlay = document.querySelector('.gif-overlay');
        gifOverlay.style.display = 'block';

        // After a delay (simulate loading time), add the slow-fade-out class to the text elements
        setTimeout(function() {
            var title = document.querySelector('h1.title');
            var subtitle = document.querySelector('h1.subtitle');
            title.classList.add('slow-fade-out');
            subtitle.classList.add('slow-fade-out');
        }, 1000); // Adjust the delay (in milliseconds) as needed

        // Set the duration of the GIF (in milliseconds)
        var gifDuration = 5000; // 5 seconds

        // After the GIF duration, redirect to the next page
        setTimeout(function() {
            window.location.href = "generate.html";
        }, gifDuration - 2000); // Adjust the timing slightly before the end
    });
});
