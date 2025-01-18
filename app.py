from flask import Flask, request, jsonify, send_file, render_template
from transformers import AutoProcessor, MusicgenForConditionalGeneration
import scipy

app = Flask(__name__)

# Load the processor and model
processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")

@app.route('/')
def index():
    return render_template('index.html')  # HTML file in the 'templates' folder

@app.route('/generate', methods=['POST'])
def generate_music():
    data = request.json
    mode = data.get('mode')
    prompt = ''

    if mode == 'text':
        prompt = data.get('text_prompt', 'Generate a default track.')
    elif mode == 'options':
        genre = data.get('genre', 'default genre')
        instruments = data.get('instruments', 'default instruments')
        prompt = f"Generate a {genre} track featuring {instruments}."

    # Process the input and generate audio
    inputs = processor(text=[prompt], padding=True, return_tensors="pt")
    audio_values = model.generate(**inputs, max_length=512)
    
    
    # Save audio to a file
    audio_file = "output.wav"
    

    sampling_rate = model.config.audio_encoder.sampling_rate
    scipy.io.wavfile.write(audio_file, rate=sampling_rate, data=audio_values[0, 0].numpy())
    
    return send_file(audio_file, as_attachment=False, mimetype="audio/wav")

if __name__ == '__main__':
    app.run(debug=True)
