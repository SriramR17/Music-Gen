document.getElementById('mode').addEventListener('change', function () {
  const mode = this.value;
  document.getElementById('text-prompt-section').style.display = mode === 'text' ? 'block' : 'none';
  document.getElementById('options-section').style.display = mode === 'options' ? 'block' : 'none';
});

document.getElementById('music-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const mode = document.getElementById('mode').value;
  const duration = document.getElementById('duration').value;
  let data = { mode, duration };

  // Handle input based on mode
  if (mode === 'text') {
    const textPrompt = document.getElementById('text-prompt').value.trim();
    if (!textPrompt) {
      alert('Please provide a text prompt.');
      return;
    }
    data.text_prompt = textPrompt;
  } else if (mode === 'options') {
    const genre = document.getElementById('genre').value;
    const instruments = document.getElementById('instruments').value;
    const emotionDropdown = document.getElementById('emotion');

    if (!genre || !instruments) {
      alert('Please select a genre and instrument.');
      return;
    }

    data.genre = genre;
    data.instruments = instruments;

    // Include emotion only if the dropdown is visible
    if (emotionDropdown && emotionDropdown.style.display !== 'none') {
      const emotion = emotionDropdown.value;
      if (!emotion) {
        alert('Please select an emotion.');
        return;
      }
      data.emotion = emotion;
    }
  }

  const loadingOverlay = document.getElementById('loading-overlay');
  loadingOverlay.style.display = 'flex'; // Show the loading overlay

  try {
    const response = await fetch('/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
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
    loadingOverlay.style.display = 'none'; // Hide the loading overlay
  }
});

// Add Event Listener to Genre Dropdown
document.getElementById('genre').addEventListener('change', function () {
  const genre = this.value;
  const emotionSection = document.getElementById('emotion-section');
  const emotionDropdown = document.getElementById('emotion');

  if (genre) {
    // Show the emotion section
    emotionSection.style.display = 'block';

    // Update the emotions based on genre selection
    const emotions = getEmotionsForGenre(genre);
    emotionDropdown.innerHTML = ''; // Clear existing options
    emotions.forEach(emotion => {
      const option = document.createElement('option');
      option.value = emotion;
      option.textContent = emotion.charAt(0).toUpperCase() + emotion.slice(1);
      emotionDropdown.appendChild(option);
    });
  } else {
    // Hide the emotion section if no genre is selected
    emotionSection.style.display = 'none';
  }
});

// Function to get emotions based on genre
function getEmotionsForGenre(genre) {
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
    'reggae': ['laid-back', 'positive', 'groovy', 'peaceful'],
  };

  return genreEmotions[genre] || [];
}







