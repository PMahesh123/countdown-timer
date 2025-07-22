document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const targetDateInput = document.getElementById('target-date');
    const targetTimeInput = document.getElementById('target-time');
    const daysDisplay = document.getElementById('days');
    const hoursDisplay = document.getElementById('hours');
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const messageDisplay = document.getElementById('message');
    
    let countdownInterval;
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    targetDateInput.setAttribute('min', today);
    
    startBtn.addEventListener('click', startCountdown);
    resetBtn.addEventListener('click', resetCountdown);
    
    function startCountdown() {
        // Clear any existing countdown
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        
        // Get user input
        const targetDate = targetDateInput.value;
        const targetTime = targetTimeInput.value;
        
        if (!targetDate || !targetTime) {
            showMessage('Please select both date and time', 'error');
            return;
        }
        
        // Combine date and time and create Date object
        const targetDateTime = new Date(`${targetDate}T${targetTime}`);
        
        // Check if target time is in the future
        if (targetDateTime <= new Date()) {
            showMessage('Please select a future date and time', 'error');
            return;
        }
        
        // Clear any previous message
        showMessage('', '');
        
        // Start the countdown
        updateCountdown(targetDateTime);
        countdownInterval = setInterval(() => updateCountdown(targetDateTime), 1000);
    }
    
    function updateCountdown(targetDateTime) {
        const now = new Date();
        const timeRemaining = targetDateTime - now;
        
        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            displayTime(0, 0, 0, 0);
            showMessage('Countdown Complete!', 'success');
            // Add visual effect
            document.querySelector('.countdown-display').classList.add('complete');
            // Play sound (optional enhancement)
            playCompletionSound();
            return;
        }
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        // Display the time
        displayTime(days, hours, minutes, seconds);
    }
    
    function displayTime(days, hours, minutes, seconds) {
        daysDisplay.textContent = days.toString().padStart(2, '0');
        hoursDisplay.textContent = hours.toString().padStart(2, '0');
        minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }
    
    function resetCountdown() {
        clearInterval(countdownInterval);
        targetDateInput.value = '';
        targetTimeInput.value = '';
        displayTime(0, 0, 0, 0);
        showMessage('', '');
        document.querySelector('.countdown-display').classList.remove('complete');
    }
    
    function showMessage(message, type) {
        messageDisplay.textContent = message;
        messageDisplay.className = 'message';
        
        if (message) {
            messageDisplay.classList.add('show');
            if (type === 'error') {
                messageDisplay.style.color = '#e74c3c';
            } else if (type === 'success') {
                messageDisplay.style.color = '#2ecc71';
            }
        }
    }
    
    // Optional enhancement: Play sound when countdown completes
    function playCompletionSound() {
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
        audio.play().catch(e => console.log('Audio playback failed:', e));
    }
});