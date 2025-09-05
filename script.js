// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const greeting = document.getElementById('greeting');
    const message = document.getElementById('message');
    const button = document.getElementById('changeButton');
    const clickCount = document.getElementById('clickCount');
    
    // Initialize click counter
    let clicks = 0;
    
    // Array of different greetings
    const greetings = [
        'Hello World!',
        'Hola Mundo!',
        'Bonjour le Monde!',
        'Hallo Welt!',
        'Ciao Mondo!',
        '你好世界!',
        'こんにちは世界!',
        'Olá Mundo!',
        'Привет мир!',
        'مرحبا بالعالم!'
    ];
    
    // Array of messages
    const messages = [
        'Welcome to my web application',
        'Click the button to see magic!',
        'Built with HTML, CSS, and JavaScript',
        'Running on Node.js with HTTPS',
        'Enjoy exploring!',
        'Interactive and responsive',
        'Modern web development',
        'Secure connection established',
        'Full-stack application',
        'Thanks for visiting!'
    ];
    
    // Function to get random item from array
    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // Function to generate random color
    function getRandomColor() {
        const colors = [
            '#667eea',
            '#764ba2',
            '#f093fb',
            '#f5576c',
            '#4facfe',
            '#00f2fe',
            '#43e97b',
            '#38f9d7',
            '#fa709a',
            '#fee140'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Add click event listener to button
    button.addEventListener('click', function() {
        // Update click counter
        clicks++;
        clickCount.textContent = clicks;
        clickCount.classList.add('highlight');
        
        // Remove highlight class after animation
        setTimeout(() => {
            clickCount.classList.remove('highlight');
        }, 500);
        
        // Change greeting
        greeting.textContent = getRandomItem(greetings);
        greeting.style.color = getRandomColor();
        
        // Change message
        message.textContent = getRandomItem(messages);
        
        // Add some visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
        
        // Change button text occasionally
        if (clicks % 5 === 0) {
            const buttonTexts = [
                'Click Me!',
                'Press Again!',
                'Keep Going!',
                'More Clicks!',
                'Awesome!',
                'Great Job!',
                'Continue!',
                'One More!'
            ];
            this.textContent = getRandomItem(buttonTexts);
        }
    });
    
    // Add hover effect to greeting
    greeting.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    greeting.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Log to console
    console.log('Hello World Application loaded successfully!');
    console.log('Running with HTTPS on Node.js');
});