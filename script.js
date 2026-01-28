// Malware Prank Simulation - Safe and Harmless
// Duration: 10 seconds

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const systemPopup = document.getElementById('system-popup');
    const prankMessage = document.getElementById('prank-message');
    const nextButton = document.getElementById('next-button');
    const closeButton = document.getElementById('close-button');
    const replayButton = document.getElementById('replay-button');
    const countdownElement = document.getElementById('countdown');
    const warningSymbol = document.getElementById('warning-symbol');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const blockScreen = document.getElementById('block-screen');
    const glitchText = document.getElementById('glitch-text');
    const terminal = document.querySelector('.terminal');
    const lockdownTimer = document.getElementById('lockdown-timer');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    
    // Initialize variables
    let countdown = 10;
    let timerInterval;
    let audioContext;
    let oscillators = [];
    let isFullscreen = false;
    
    // Fullscreen function
    function toggleFullscreen() {
        if (!isFullscreen) {
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
            isFullscreen = true;
            fullscreenBtn.textContent = "🗗 Exit Fullscreen";
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            isFullscreen = false;
            fullscreenBtn.textContent = "⛶ Fullscreen";
        }
    }
    
    // Start the prank simulation
    function startPrank() {
        console.log("Starting harmless prank simulation...");
        
        // Try to enter fullscreen automatically
        setTimeout(() => {
            if (!isFullscreen) {
                toggleFullscreen();
            }
        }, 500);
        
        // Show fullscreen button
        fullscreenBtn.style.display = 'block';
        
        // Prevent touch/click interaction for 10 seconds
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
            lockdownTimer.textContent = countdown;
            
            // Update progress bar
            const progress = 100 - (countdown / 10 * 100);
            progressBar.style.width = progress + '%';
            
            // Change glitch text occasionally
            if (countdown % 2 === 0) {
                const texts = [
                    "SYSTEM BREACH DETECTED",
                    "DATA EXFILTRATION IN PROGRESS",
                    "CRITICAL THREAT LEVEL",
                    "SECURITY PROTOCOLS FAILED",
                    "EMERGENCY LOCKDOWN ACTIVE",
                    "UNAUTHORIZED ACCESS BLOCKED",
                    "MALWARE SIGNATURE DETECTED",
                    "SYSTEM INTEGRITY COMPROMISED"
                ];
                glitchText.textContent = texts[Math.floor(Math.random() * texts.length)];
            }
            
            // Show system popup after 3 seconds
            if (countdown === 7) {
                systemPopup.style.display = 'block';
            }
            
            // Enable the Next button after 10 seconds
            if (countdown === 0) {
                clearInterval(timerInterval);
                nextButton.disabled = false;
                nextButton.textContent = "Next →";
                endPrank();
            }
        }, 1000);
    }
    
    // End the prank after 10 seconds
    function endPrank() {
        console.log("Ending prank simulation...");
        
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
        finalLine.innerHTML = "<span style='color:#0f0'>System restore complete. Threat neutralized. Device secure.</span>";
        terminal.appendChild(finalLine);
        
        // Scroll terminal to bottom
        terminal.scrollTop = terminal.scrollHeight;
    }
    
    // Generate keygen-like sound using Web Audio API
    function startKeygenSound() {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create multiple oscillators for complex sound
            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    // Random frequency for keygen-like sound
                    const baseFreq = 80 + (i * 120);
                    oscillator.frequency.value = baseFreq;
                    
                    // Random gain (volume)
                    gainNode.gain.value = 0.05 + (Math.random() * 0.05);
                    
                    // Random waveform
                    const waveforms = ['sine', 'square', 'sawtooth', 'triangle'];
                    oscillator.type = waveforms[i % waveforms.length];
                    
                    oscillator.start();
                    oscillators.push({osc: oscillator, gain: gainNode});
                    
                    // Change frequency randomly for effect
                    setInterval(() => {
                        if (oscillator.frequency) {
                            const randomChange = (Math.random() - 0.5) * 200;
                            oscillator.frequency.value = baseFreq + randomChange;
                        }
                    }, 150 + Math.random() * 300);
                    
                    // Random volume changes
                    setInterval(() => {
                        if (gainNode.gain) {
                            gainNode.gain.value = 0.03 + (Math.random() * 0.07);
                        }
                    }, 200 + Math.random() * 400);
                    
                }, i * 250);
            }
            
            // Add noise for more realistic effect
            setTimeout(() => {
                const bufferSize = 4096;
                const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
                const output = noiseBuffer.getChannelData(0);
                
                for (let i = 0; i < bufferSize; i++) {
                    output[i] = Math.random() * 2 - 1;
                }
                
                const whiteNoise = audioContext.createBufferSource();
                whiteNoise.buffer = noiseBuffer;
                whiteNoise.loop = true;
                
                const noiseGain = audioContext.createGain();
                noiseGain.gain.value = 0.02;
                
                whiteNoise.connect(noiseGain);
                noiseGain.connect(audioContext.destination);
                whiteNoise.start();
                
                oscillators.push({osc: whiteNoise, gain: noiseGain});
            }, 1000);
            
        } catch (e) {
            console.log("Audio could not be initialized: ", e);
        }
    }
    
    // Stop the keygen sound
    function stopKeygenSound() {
        if (audioContext) {
            // Gradually reduce volume for all oscillators
            oscillators.forEach(item => {
                if (item.gain) {
                    item.gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.0);
                }
            });
            
            // Stop all oscillators after fadeout
            setTimeout(() => {
                oscillators.forEach(item => {
                    if (item.osc && typeof item.osc.stop === 'function') {
                        try {
                            item.osc.stop();
                        } catch(e) {
                            console.log("Error stopping oscillator:", e);
                        }
                    }
                });
                
                oscillators = [];
                
                if (audioContext.state !== 'closed') {
                    audioContext.close().catch(e => console.log("Error closing audio context:", e));
                }
            }, 1000);
        }
    }
    
    // Add dynamic terminal lines
    function addTerminalLines() {
        const terminalLines = [
            "Analyzing memory usage... <span class='percentage'>92%</span>",
            "Checking firewall status... <span class='error'>COMPROMISED</span>",
            "Detecting intrusion vector... <span class='warning'>PHISHING ATTACK</span>",
            "Scanning for keyloggers... <span class='error'>4 DETECTED</span>",
            "Verifying system integrity... <span class='error'>CHECKSUM FAILED</span>",
            "Checking for data breaches... <span class='warning'>CREDENTIALS LEAKED</span>",
            "Attempting to restore backup... <span class='error'>BACKUP CORRUPTED</span>",
            "Sending distress signal... <span class='warning'>SIGNAL JAMMED</span>",
            "Isolating infected sectors... <span class='percentage'>45%</span>",
            "Scanning registry entries... <span class='error'>MALICIOUS ENTRIES FOUND</span>"
        ];
        
        let lineIndex = 0;
        const lineInterval = setInterval(() => {
            if (lineIndex < terminalLines.length) {
                const line = document.createElement('div');
                line.className = 'terminal-line';
                line.innerHTML = terminalLines[lineIndex];
                terminal.appendChild(line);
                
                // Scroll terminal to bottom
                terminal.scrollTop = terminal.scrollHeight;
                
                lineIndex++;
            } else {
                clearInterval(lineInterval);
            }
        }, 800);
    }
    
    // Reset the prank for replay
    function resetPrank() {
        // Reset variables
        countdown = 10;
        
        // Hide popups
        systemPopup.style.display = 'none';
        prankMessage.style.display = 'none';
        
        // Clear terminal lines (keep the first 15 original ones)
        const terminalLines = terminal.querySelectorAll('.terminal-line');
        for (let i = 15; i < terminalLines.length; i++) {
            if (terminalLines[i]) {
                terminalLines[i].remove();
            }
        }
        
        // Reset progress bar
        progressBar.style.width = '0%';
        
        // Reset countdown display
        countdownElement.textContent = countdown;
        lockdownTimer.textContent = countdown;
        
        // Re-enable block screen
        blockScreen.style.display = 'block';
        
        // Show warning symbol and countdown
        warningSymbol.style.display = 'block';
        countdownElement.style.display = 'block';
        progressContainer.style.display = 'block';
        
        // Reset next button
        nextButton.disabled = true;
        nextButton.textContent = "Next";
        
        // Restart the prank
        startPrank();
    }
    
    // Event listeners
    nextButton.addEventListener('click', function() {
        if (!nextButton.disabled) {
            systemPopup.style.display = 'none';
        }
    });
    
    closeButton.addEventListener('click', function() {
        // Exit fullscreen if active
        if (isFullscreen) {
            toggleFullscreen();
        }
        
        // Show a goodbye message and reload after a short delay
        prankMessage.innerHTML = `
            <h2>😊 Stay Safe Online!</h2>
            <p>This simulation has ended. Remember to always:</p>
            <ul style="text-align: left; margin: 20px 0; color: #ccc;">
                <li>Use strong, unique passwords</li>
                <li>Keep your software updated</li>
                <li>Be cautious of suspicious links/emails</li>
                <li>Use antivirus software</li>
                <li>Enable two-factor authentication</li>
            </ul>
            <p>Closing in <span id="close-timer">3</span> seconds...</p>
        `;
        
        let closeTimer = 3;
        const closeCountdown = setInterval(() => {
            closeTimer--;
            document.getElementById('close-timer').textContent = closeTimer;
            
            if (closeTimer <= 0) {
                clearInterval(closeCountdown);
                window.location.href = "about:blank";
            }
        }, 1000);
    });
    
    replayButton.addEventListener('click', function() {
        resetPrank();
    });
    
    fullscreenBtn.addEventListener('click', function() {
        toggleFullscreen();
    });
    
    // Handle fullscreen change events
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    
    function handleFullscreenChange() {
        isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
        fullscreenBtn.textContent = isFullscreen ? "🗗 Exit Fullscreen" : "⛶ Fullscreen";
    }
    
    // Add random visual effects during the simulation
    setInterval(() => {
        if (countdown > 0) {
            // Random flashes
            if (Math.random() > 0.8) {
                document.body.style.backgroundColor = '#200';
                setTimeout(() => {
                    document.body.style.backgroundColor = '#000';
                }, 100);
            }
            
            // Random file items
            if (Math.random() > 0.9) {
                const fileItems = document.querySelectorAll('.file-item');
                if (fileItems.length > 0) {
                    const randomIndex = Math.floor(Math.random() * fileItems.length);
                    fileItems[randomIndex].style.color = '#ff4444';
                    setTimeout(() => {
                        fileItems[randomIndex].style.color = '';
                    }, 500);
                }
            }
        }
    }, 300);
    
    // Start the prank after a short delay
    setTimeout(startPrank, 800);
    
    // Prevent context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Prevent keyboard shortcuts (F12, Ctrl+Shift+I, etc.)
    document.addEventListener('keydown', function(e) {
        // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (e.key === 'F12' || 
           (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
           (e.ctrlKey && e.key === 'u')) {
            e.preventDefault();
            return false;
        }
    });
});
