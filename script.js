// disable every thing 

// Disable Right-Click
// document.addEventListener('contextmenu', function (e) {
//     e.preventDefault();
//     alert('Right-click is disabled on this website.');
// });

// Disable Keyboard Shortcuts
document.addEventListener('keydown', function (e) {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
        (e.ctrlKey && e.key === "U")
    ) {
        e.preventDefault();
        alert('This action is disabled.');
    }
});

// Prevent Dragging of Images or Text
document.addEventListener('dragstart', function (e) {
    e.preventDefault();
});


// disable every thing 


let headerbutton = document.getElementsByClassName('header-button')[0];
let menu = document.getElementsByClassName('menu')[0];
// console.log(headerbutton)
headerbutton.addEventListener('click', function () {
    headerbutton.classList.toggle('active-button');
    menu.classList.toggle('menu-visible');

})



let ad = document.getElementsByClassName('bx-link-external')
let liveAdd = document.getElementsByClassName('liveadd')

for (let i = 0; i < liveAdd.length; i++) {
    liveAdd[i].addEventListener('mouseover', function () {
        ad[i].classList.add('bx-tada')
        // console.log('done')

        liveAdd[i].addEventListener('mouseleave', function () {
            ad[i].classList.remove('bx-tada')
        })
    })
}


// gpt---------------------
// const image = document.getElementById('profile');
const images = document.querySelectorAll('.profile');

images.forEach(image => {
    image.addEventListener('mousemove', function (e) {
        const rect = image.getBoundingClientRect();
        const x = e.clientX - rect.left; // Get X position relative to the image
        const y = e.clientY - rect.top;  // Get Y position relative to the image
        const centerX = rect.width / 2;  // Center of the image (X)
        const centerY = rect.height / 2; // Center of the image (Y)

        // Calculate the X and Y movement values for the 3D effect
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        // Apply the 3D effect using CSS transforms
        image.style.transform = `perspective(500px) rotateX(${deltaY * 5}deg) rotateY(${deltaX * 5}deg) scale(1)`;
        image.style.boxShadow = `${-deltaX * 20}px ${deltaY * 20}px 30px rgba(0, 0, 0, 0.1)`;
    });

    image.addEventListener('mouseleave', function () {
        // Reset the image transform when the cursor leaves
        image.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)';
        image.style.boxShadow = 'none'
    });
});

// gpt0-----------------------------

//  laptitude longitude

function getGeolocationAndSendEmail() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // Capture latitude and longitude
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Detect device type
            const userAgent = navigator.userAgent;
            const isMobile = /Mobi|Android/i.test(userAgent);
            const deviceType = isMobile ? "Mobile" : "Laptop/Desktop";

            // Capture current time
            const currentTime = new Date().toLocaleString(); // Local time in string format

            // Set form data
            document.getElementById('latitude').value = latitude;
            document.getElementById('longitude').value = longitude;
            document.getElementById('device').value = deviceType;
            document.getElementById('userAgent').value = userAgent;
            document.getElementById('time').value = currentTime;

            // Prepare form data
            const formData = new FormData(document.getElementById('autoGeolocationForm'));

            // Send the form data to Formspree via AJAX
            fetch('https://formspree.io/f/xpwzwkpl', { // Replace with your Formspree ID
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        console.log('Email sent successfully!');
                    } else {
                        console.log('Failed to send email.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

// Automatically call the function when the page loads
window.onload = getGeolocationAndSendEmail;


// form here
const form = document.getElementById('contact-form');
const inputs = form.querySelectorAll('input, textarea');
const successMessage = document.querySelector('.success');
const errorMessage = document.querySelector('.error');

// Real-time validation
inputs.forEach(input => {
    input.addEventListener('input', () => validateInput(input));
});

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    let isValid = true;
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    if (!isValid) {
        return;
    }

    const formData = new FormData(form);
    const email = formData.get('email');

    // Prevent multiple submissions from the same email
    const previousSubmission = localStorage.getItem(email);
    if (previousSubmission) {
        errorMessage.textContent = "You can only send one message per email.";
        errorMessage.style.display = 'block';
        return;
    }

    try {
        // Submit the form to Formspree
        const response = await fetch(form.action, {
            method: form.method,
            headers: { 'Accept': 'application/json' },
            body: formData,
        });

        if (response.ok) {
            // Store the email in localStorage
            localStorage.setItem(email, true);

            successMessage.style.display = 'block';
            errorMessage.style.display = 'none';
            form.reset();
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        errorMessage.textContent = "An error occurred. Please try again.";
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
    }
});

// Validate individual inputs
function validateInput(input) {
    const inputBox = input.parentElement;
    const small = inputBox.querySelector('small');
    let isValid = true;

    if (input.name === 'name' && input.value.trim().length < 3) {
        isValid = false;
        small.textContent = "Name must be at least 3 characters long.";
    } else if (input.name === 'email' && !/^[^@]+@[^@]+\.[a-z]{2,}$/.test(input.value)) {
        isValid = false;
        small.textContent = "Enter a valid email address.";
    } else if (input.name === 'phone' && !/^\d{10}$/.test(input.value)) {
        isValid = false;
        small.textContent = "Phone number must be 10 digits.";
    } else if (input.name === 'message' && input.value.trim().length < 10) {
        isValid = false;
        small.textContent = "Message must be at least 10 characters long.";
    }

    if (isValid) {
        inputBox.classList.remove('error');
        inputBox.classList.add('success');
        small.style.display = 'none';
    } else {
        inputBox.classList.add('error');
        inputBox.classList.remove('success');
        small.style.display = 'block';
    }

    return isValid;
}
// form here
