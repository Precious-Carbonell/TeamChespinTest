var maleFirstName = ["Merlin", "Gandalf", "Albus", "Dumbledore", "Morgoth",
    "Gryffindor", "Saruman", "Elrond", "Rincewind", "Ged", "Radagast",
    "Raistlin", "Harry", "Frodo", "Galen", "Sauron", "Bilbo",
    "Gollum", "Hagrid", "Eragon", "Rand", "Tyrion", "Draco", "Lucius",
    "Severus", "Thorin", "Aragorn", "Legolas", "Gimli"];

var femaleFirstName = ["Galadriel", "Luna", "Hermione", "Arwen", "Morgana",
    "Tauriel", "Eowyn", "Bellatrix", "Minerva", "Molly",
    "Ginevra", "Tonks", "Daenerys", "Tiffany", "Cersei", "Sansa",
    "Arya", "Catelyn", "Brienne", "Lyanna", "Osha", "Ygritte", "Rosmerta",
    "Nymphadora"];

var lastName = ["Blackwood", "Greybeard", "Fireheart", "Stargazer", "Moonshadow",
    "Dragonrider", "Thunderstrike", "Icewind", "Stormcaller", "Ironfist",
    "Shadowweaver", "Bloodmoon", "Silverleaf", "Skywatcher", "Winterborne",
    "Sableclaw", "Nightshade", "Silvershield", "Goldensong", "Whisperwind",
    "Frostblade", "Battlesong", "Stoneshaper", "Starlight", "Moonwalker",
    "Skyborn", "Brightsoul", "Flameheart", "Stormbringer"];

function getName(gender) {
    if (gender === 'male') {
        return maleFirstName[Math.floor(Math.random() * maleFirstName.length)] + ' ' + lastName[Math.floor(Math.random() * lastName.length)];
    } else if (gender === 'female') {
        return femaleFirstName[Math.floor(Math.random() * femaleFirstName.length)] + ' ' + lastName[Math.floor(Math.random() * lastName.length)];
    } else {
        return "Unknown Gender"; // Handle other cases, if necessary
    }
}

function nameQty() {
    // Check if a gender is selected
    var selectedGender = document.querySelector('input[name="gender"]:checked');
    if (!selectedGender) {
        alert("Please choose a gender to generate a name.");
        return;
    }

    // Get the value of the selected gender
    var genderValue = selectedGender.value;

    // Generate a random name based on the selected gender
    var randomName = getName(genderValue);

    // Fade out and slide up the current name
    var nameList = document.querySelector('.nameList');
    nameList.style.opacity = 0;
    nameList.style.transform = 'translateY(-20px)';

    // After a short delay, update the name and fade it in while sliding down
    setTimeout(function () {
        nameList.innerHTML = randomName;
        nameList.style.opacity = 1;
        nameList.style.transform = 'translateY(0)';

        // Add animation effect
        nameList.classList.remove('pulse-animation'); // Remove animation class if exists
        void nameList.offsetWidth; // Trigger reflow
        nameList.classList.add('pulse-animation'); // Add animation class
    }, 300); // Adjust the delay as needed
}

function selectGender(gender) {
    // Remove the border from all options
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });

    // Add border to the selected option
    document.querySelector('.' + gender).classList.add('selected');
}

window.onload = function () {
    // Remove the .selected class from both options when the page loads
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });

    // Set default white border to male option
    document.querySelector('.male').classList.add('selected');

    alert("Please choose a gender to generate a name.");
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('backButton').addEventListener('click', function () {
        window.history.back(); // Navigate back to the previous page
    });
});
