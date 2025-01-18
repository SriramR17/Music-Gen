document.getElementById('mode').addEventListener('change', function () {
  const mode = this.value;
  document.getElementById('text-prompt-section').style.display = mode === 'text' ? 'block' : 'none';
  document.getElementById('options-section').style.display = mode === 'options' ? 'block' : 'none';
});

document.getElementById('music-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const mode = document.getElementById('mode').value;
  let data = { mode };

  if (mode === 'text') {
    data.text_prompt = document.getElementById('text-prompt').value;
  } else if (mode === 'options') {
    data.genre = document.getElementById('genre').value;
    data.instruments = document.getElementById('instruments').value;
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
      document.getElementById('audio-player').src = audioUrl;
      document.getElementById('audio-player').play();
    } else {
      alert('Failed to generate music. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  } 


    finally {
  loadingOverlay.style.display = 'none'; // Hide the loading overlay
  }
});
