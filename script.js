const progressBar = document.getElementById('progress-bar');
const percentage = document.getElementById('percentage');
const sarcasticMessage = document.getElementById('sarcastic-message');
const errorMessage = document.getElementById('error-message');

const messages = [
    "Almost there... nope.",
    "Recalculating life choices...",
    "Oops, lost progress.",
    "99% done, trust me.",
    "Loading your disappointment...",
    "Patience.exe not found.",
    "Still faster than your WiFi.",
    "If you stare, it goes slower.",
    "Time for a snack break.",
    "Is this a joke? Yes.",
    "Progressing sideways...",
    "Please wait... or don't.",
    "Error 404: Progress not found.",
    "Just kidding, it's stuck.",
    "You deserve better.",
    "Did you try turning it off and on?",
    "Progress bar is angry.",
    "This is taking forever.",
    "Almost... almost... almost..."
];

const errors = [
    "Critical Pastel Overflow!",
    "Fake Error: Progress Bar Unavailable.",
    "404: Motivation Not Found.",
    "System is too bored to continue.",
    "Unexpected progress detected!",
    "Pastel buffer underrun!"
];

const rippleColors = [
    "#ff7f50", "#ffbf00", "#ff4c4c", "#ffd700"
];

let percent = 0;
let errorTimeout = null;

function randomizePercent() {
    let change = Math.floor(Math.random() * 20) - 8; // -8 to +11
    if (percent > 95) change = Math.floor(Math.random() * 3) - 2; // Hover near 99%
    percent += change;
    if (percent < 0) percent = 0;
    if (percent > 99) percent = 99 + Math.floor(Math.random() * 2); // Hover at 99-100 but never reach 100
    return percent;
}

function updateProgressBar() {
    let current = randomizePercent();
    progressBar.style.width = current + '%';
    percentage.textContent = current + '%';
}

function updateMessage() {
    sarcasticMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
}

function maybeShowError() {
    if (Math.random() < 0.13) { // 13% chance
        errorMessage.textContent = errors[Math.floor(Math.random() * errors.length)];
        errorMessage.style.display = 'block';
        clearTimeout(errorTimeout);
        errorTimeout = setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 1200);
    }
}

// Ripple Effect Logic
function createRipple(x, y) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.background = rippleColors[Math.floor(Math.random() * rippleColors.length)];
    document.body.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
}

function handleRippleEvent(e) {
    let x, y;
    if (e.touches && e.touches.length) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
    } else {
        x = e.clientX;
        y = e.clientY;
    }
    createRipple(x, y);
}

document.body.addEventListener('mousedown', handleRippleEvent);
document.body.addEventListener('touchstart', handleRippleEvent);

function loop() {
    updateProgressBar();
    maybeShowError();
    setTimeout(loop, Math.floor(Math.random() * 200) + 200);
}
function messageLoop() {
    updateMessage();
    setTimeout(messageLoop, Math.floor(Math.random() * 1000) + 4000); // 4–5 seconds
}

loop();
messageLoop();