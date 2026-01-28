// Load JSON data
let messages = {};
let texts = {};

// Try to load from JSON file
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        texts = data;
        initializePrank();
    })
    .catch(error => {
        console.log("Using default messages. JSON not loaded:", error);
        // Default messages if JSON fails to load
        texts = {
            glitchTexts: [
                "SYSTEM BREACH DETECTED",
                "DATA EXFILTRATION IN PROGRESS",
                "CRITICAL THREAT LEVEL",
                "SECURITY PROTOCOLS FAILED",
                "EMERGENCY LOCKDOWN ACTIVE"
            ],
            terminalLines: [
                "Analyzing memory usage... <span class='percentage'>87%</span>",
                "Checking firewall status... <span class='error'>BYPASSED</span>",
                "Detecting intrusion vector... <span class='warning'>PHISHING ATTACK</span>",
                "Scanning for keyloggers... <span class='error'>3 DETECTED</span>",
                "Verifying system integrity... <span class='error'>FAILED</span>",
                "Checking for data breaches... <span class='warning'>MULTIPLE DETECTED</span>",
                "Attempting to restore backup... <span class='error'>BACKUP CORRUPTED</span>",
                "Sending distress signal... <span class='warning'>NO RESPONSE</span>"
            ],
            fileItems: [
                "passwords.txt - ACCESSED",
                "bank_details.xlsx - ENCRYPTING",
                "personal_photos/ - SCANNING",
                "tax_return_2023.pdf - UPLOADING",
                "emails_backup.db - EXFILTRATING",
                "browser_history.log - ANALYZING",
                "system_backup.zip - CORRUPTED",
                "encryption_keys.dat - STOLEN"
            ],
            systemPopup: {
                title: "SYSTEM ALERT",
                message: "The system has detected unusual activity. If this is not you, secure your device immediately!",
                threatLevel: "CRITICAL",
                buttonText: "Next",
                lockMessage: "System lockdown active - 8 seconds remaining"
            },
            prankMessage: {
                title: "You've been pranked! 👊",
                message1: "This was a simulated malware attack. No files were accessed, modified, or stolen.",
                message2: "Your device is completely safe. This was just a harmless prank to remind you about cybersecurity awareness.",
                buttonText: "Close Simulation",
                tip: "Remember to always keep your antivirus updated and be cautious of suspicious links!"
            }
        };
        initializePrank();
    });

// Main initialization function
function initializePrank() {
    document.addEventListener('DOMContentLoaded', function() {
        // Elements
        const systemPopup = document.getElementById('system-popup');
        const prankMessage = document.getElementById('prank-message');
        const nextButton = document.getElementById('next-button');
        const closeButton = document.getElementById('close-button');
        const countdownElement = document.getElementById('countdown');
        const warningSymbol = document.getElementById('warning-symbol');
        const progressContainer = document.getElementById('progress-container');
        const progressBar = document.getElementById('progress-bar');
        const blockScreen = document.getElementById('block-screen');
        const glitchText = document.getElementById('glitch-text');
        const terminal = document.querySelector('.terminal');
        const filesList = document.querySelector('.files-list');
        
        // Initialize variables
        let countdown = 8;
        let timerInterval;
        let audioContext;
        let oscillators = [];
        
        // Update UI with JSON data
        if (texts.systemPopup) {
            document.querySelector('#system-popup h2').textContent = texts.systemPopup.title;
            document.querySelector('#system-popup p').textContent = texts.systemPopup.message;
            document.querySelector('#system-popup strong').textContent = `Threat Level: ${texts.systemPopup.threatLevel}`;
            nextButton.textContent = texts.systemPopup.buttonText;
            document.querySelector('#system-popup p:nth-child(4)').textContent = texts.systemPopup.lockMessage;
        }
        
        if (texts.prankMessage) {
            document.querySelector('#prank-message h2').textContent = texts.prankMessage.title;
            document.querySelectorAll('#prank-message p')[0].textContent = texts.prankMessage.message1;
            document.querySelectorAll('#prank-message p')[1].textContent = texts.prankMessage.message2;
            closeButton.textContent = texts.prankMessage.buttonText;
            document.querySelectorAll('#prank-message p')[2].textContent = texts.prankMessage.tip;
        }
        
        // Update file items
        if (texts.fileItems && filesList) {
            filesList.innerHTML = '';
            texts.fileItems.forEach(item => {
                const fileElement = document.createElement('div');
                fileElement.className = 'file-item';
                fileElement.textContent = item;
                filesList.appendChild(fileElement);
            });
        }
        
        // Start the prank simulation
        function startPrank() {
            // Prevent touch/click interaction for 8 seconds
            blockScreen.style.display = 'block';
            
            // Show countdown
            countdownElement.style.display = 'block';
            countdownElement.textContent = countdown;
            
            // Show warning symbol
            warningSymbol.style.display = 'block';
            
            // Show progress bar
            progressContainer.style.display = 'block';
            
            // Start the keygen sound
            startKeygenSound();
            
            // Add more terminal lines dynamically
            addTerminalLines();
            
            // Start the countdown
            timerInterval = setInterval(function() {
                countdown--;
                countdownElement.textContent = countdown;
                
                // Update progress bar
                const progress = 100 - (countdown / 8 * 100);
                progressBar.style.width = progress + '%';
                
                // Change glitch text occasionally
                if (countdown % 2 === 0 && texts.glitchTexts) {
                    const randomIndex = Math.floor(Math.random() * texts.glitchTexts.length);
                    glitchText.textContent = texts.glitchTexts[randomIndex];
                }
                
                // Show system popup after 2 seconds
                if (countdown === 6) {
                    systemPopup.style.display = 'block';
                }
                
                // Enable the Next button after 8 seconds
                if (countdown === 0) {
                    clearInterval(timerInterval);
                    endPrank();
                }
            }, 1000);
        }
        
        // End the prank after 8 seconds
        function endPrank() {
            // Stop the keygen sound
            stopKeygenSound();
            
            // Hide system popup and show prank message
            systemPopup.style.display = 'none';
            prankMessage.style.display = 'block';
            
            // Remove block screen to allow interaction
            blockScreen.style.display = 'none';
            
            // Hide warning symbol and countdown
            warningSymbol.style.display = 'none';
            countdownElement.style.display = 'none';
            progressContainer.style.display = 'none';
            
            // Add final terminal line
            const finalLine = document.createElement('div');
            finalLine.className = 'terminal-line';
            finalLine.textContent = "Security breach simulation complete. System secure.";
            terminal.appendChild(finalLine);
        }
        
        // Generate keygen-like sound using Web Audio API
        function startKeygenSound() {
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
                // Create multiple oscillators for complex sound
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        const osc = audioContext.createOscillator();
                        const gain = audioContext.createGain();
                        
                        osc.connect(gain);
                        gain.connect(audioContext.destination);
                        
                        // Random frequency for keygen-like sound
                        osc.frequency.value = 100 + Math.random() * 800;
                        
                        // Random gain (volume)
                        gain.gain.value = 0.1 + Math.random() * 0.1;
                        
                        // Random waveform
                        const waveforms = ['sine', 'square', 'sawtooth', 'triangle'];
                        osc.type = waveforms[Math.floor(Math.random() * waveforms.length)];
                        
                        osc.start();
                        
                        // Store oscillator for later cleanup
                        oscillators.push({osc, gain});
                        
                        // Change frequency randomly for effect
                        const intervalId = setInterval(() => {
                            osc.frequency.value = 100 + Math.random() * 800;
                        }, 100 + Math.random() * 200);
                        
                        // Store interval ID for cleanup
                        osc._intervalId = intervalId;
                        
                    }, i * 300);
                }
            } catch (e) {
                console.log("Audio could not be initialized: ", e);
            }
        }
        
        // Stop the keygen sound
        function stopKeygenSound() {
            if (audioContext) {
                // Gradually reduce volume for all oscillators
                oscillators.forEach(({osc, gain}) => {
                    if (gain) {
                        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
                    }
                    if (osc._intervalId) {
                        clearInterval(osc._intervalId);
                    }
                });
                
                // Stop oscillators after fadeout
                setTimeout(() => {
                    oscillators.forEach(({osc}) => {
                        try {
                            osc.stop();
                        } catch (e) {
                            // Oscillator already stopped
                        }
                    });
                    
                    if (audioContext.state !== 'closed') {
                        audioContext.close();
                    }
                }, 500);
            }
        }
        
        // Add dynamic terminal lines
        function addTerminalLines() {
            if (!texts.terminalLines) return;
            
            let lineIndex = 0;
            const lineInterval = setInterval(() => {
                if (lineIndex < texts.terminalLines.length) {
                    const line = document.createElement('div');
                    line.className = 'terminal-line';
                    line.innerHTML = texts.terminalLines[lineIndex];
                    terminal.appendChild(line);
                    
                    // Scroll terminal to bottom
                    terminal.scrollTop = terminal.scrollHeight;
                    
                    lineIndex++;
                } else {
                    clearInterval(lineInterval);
                }
            }, 600);
        }
        
        // Event listeners
        nextButton.addEventListener('click', function() {
            // This button is disabled for 8 seconds, so this shouldn't fire
            // until after the prank ends, but just in case:
            if (countdown > 0) {
                return;
            }
        });
        
        closeButton.addEventListener('click', function() {
            // Reload the page to reset the simulation
            location.reload();
        });
        
        // Start the prank after a short delay
        setTimeout(startPrank, 1000);
        
        // Add random visual effects during the simulation
        setInterval(() => {
            if (countdown > 0) {
                // Random flashes
                if (Math.random() > 0.7) {
                    document.body.style.backgroundColor = '#100';
                    setTimeout(() => {
                        document.body.style.backgroundColor = '#000';
                    }, 100);
                }
            }
        }, 300);
    });
}
