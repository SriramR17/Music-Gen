document.addEventListener('DOMContentLoaded', function() {
  const modeCards = document.querySelectorAll('.mode-card');
  const textSection = document.getElementById('text-prompt-section');
  const optionsSection = document.getElementById('options-section');
  const genreOptions = document.querySelectorAll('.genre-option');
  const form = document.getElementById('music-form');
  const loadingOverlay = document.getElementById('loading-overlay');
  let currentMode = null;

  // Genre to emotions mapping
  const genreEmotions = {
      'rap': ['angry', 'energetic', 'motivational', 'intense'],
      'classical': ['calm', 'peaceful', 'elegant', 'serene'],
      'pop': ['happy', 'uplifting', 'energetic', 'romantic'],
      'jazz': ['chill', 'relaxed', 'smooth', 'elegant'],
      'rock': ['energetic', 'powerful', 'rebellious', 'angry'],
      'blues': ['melancholic', 'soulful', 'reflective', 'emotionally raw'],
      'electronic': ['futuristic', 'upbeat', 'vibrant', 'hypnotic'],
      'country': ['nostalgic', 'heartfelt', 'down-to-earth', 'honky-tonk'],
      'hip-hop': ['confident', 'lyrical', 'street', 'empowered'],
      'reggae': ['laid-back', 'positive', 'groovy', 'peaceful']
  };

  // Mode Selection
  modeCards.forEach(card => {
      card.addEventListener('click', function() {
          const mode = this.dataset.mode;
          currentMode = mode;
          
          // Reset active states
          modeCards.forEach(c => c.classList.remove('border-green-400'));
          this.classList.add('border-green-400');

          // Show/hide appropriate sections
          textSection.classList.toggle('hidden', mode !== 'text');
          optionsSection.classList.toggle('hidden', mode !== 'options');
      });
  });

  // Genre Selection
  genreOptions.forEach(option => {
      option.addEventListener('click', function() {
          const genre = this.dataset.genre;
          
          // Reset active states
          genreOptions.forEach(opt => opt.classList.remove('active'));
          this.classList.add('active');

          // Update emotions dropdown
          updateEmotions(genre);
      });
  });

  function updateEmotions(genre) {
      const emotionSection = document.getElementById('emotion-section');
      const emotionSelect = document.getElementById('emotion');
      const emotions = genreEmotions[genre] || [];

      if (emotions.length > 0) {
          emotionSelect.innerHTML = emotions.map(emotion => 
              `<option value="${emotion}">${emotion.charAt(0).toUpperCase() + emotion.slice(1)}</option>`
          ).join('');
          emotionSection.classList.remove('hidden');
      } else {
          emotionSection.classList.add('hidden');
      }
  }

  // Form Submission
  form.addEventListener('submit', async function(e) {
      e.preventDefault();

      if (!currentMode) {
          alert('Please select a mode (Text Prompt or Predefined Options)');
          return;
      }

      const duration = document.getElementById('duration').value;
      let data = { mode: currentMode, duration };

      if (currentMode === 'text') {
          const textPrompt = document.getElementById('text-prompt').value.trim();
          if (!textPrompt) {
              alert('Please enter a text prompt');
              return;
          }
          data.text_prompt = textPrompt;
      } else {
          const activeGenre = document.querySelector('.genre-option.active');
          const instruments = document.getElementById('instruments').value;
          const emotion = document.getElementById('emotion').value;

          if (!activeGenre) {
              alert('Please select a genre');
              return;
          }

          data.genre = activeGenre.dataset.genre;
          data.instruments = instruments;
          data.emotion = emotion;
      }

      loadingOverlay.classList.remove('hidden');
      loadingOverlay.style.display = 'flex';

      try {
          const response = await fetch('/generate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const blob = await response.blob();
                const audioUrl = URL.createObjectURL(blob);
                const audioPlayer = document.getElementById('audio-player');
                audioPlayer.src = audioUrl;
                audioPlayer.play();
            } else {
                alert('Failed to generate music. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        } finally {
            loadingOverlay.classList.add('hidden');
            loadingOverlay.style.display = 'none';
        }
    });

    // Add hover effects and animations
    const addHoverEffects = () => {
        const interactiveElements = document.querySelectorAll('button, select, .genre-option');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'scale(1.02)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1)';
            });
        });
    };

    // Initialize hover effects
    addHoverEffects();

    // Add dynamic audio visualizer
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.addEventListener('play', () => {
        // Add glowing effect to audio player when playing
        audioPlayer.classList.add('playing');
    });

    audioPlayer.addEventListener('pause', () => {
        // Remove glowing effect when paused
        audioPlayer.classList.remove('playing');
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            // Submit form with Ctrl+Enter
            form.dispatchEvent(new Event('submit'));
        }
    });

    // Add success notification
    const showSuccessNotification = () => {
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-green-500 text-black px-6 py-3 rounded-lg shadow-lg transform translate-y-0 opacity-100 transition-all duration-500';
        notification.textContent = 'Music generated successfully!';
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(100%)';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    };

    // Add error handling with visual feedback
    const showError = (message) => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);

        setTimeout(() => errorDiv.remove(), 5000);
    };

    // Add loading animation
    const toggleLoading = (isLoading) => {
        const generateButton = form.querySelector('button[type="submit"]');
        if (isLoading) {
            generateButton.disabled = true;
            generateButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Generating...';
        } else {
            generateButton.disabled = false;
            generateButton.innerHTML = '<i class="fas fa-wand-magic-sparkles mr-2"></i>Generate Music';
        }
    };
});