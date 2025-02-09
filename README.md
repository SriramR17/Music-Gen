# AI Music Generator

This project is an AI-powered music generation web application built using the Hugging Face model `mugic-gen-small` from Meta. The app allows users to create custom music by providing descriptive text prompts or selecting predefined options like genre, emotions, and instruments. The web application is built with Flask, HTML, Tailwind CSS, JavaScript, and Python.

---

## Features

### 1. **Text Prompt Mode**
   - Users can create music by entering descriptive text (e.g., "A Lo-Fi track that feels like reflecting on old memories on a quiet night").
   - Specify the duration of the generated track.

### 2. **Predefined Options Mode**
   - Users can choose from preset configurations to generate music:
     - **Genres**: Select from a variety of music genres.
     - **Emotions**: Choose the mood based on the selected genre.
     - **Instruments**: Customize the sound using specific instruments.
   - Specify the duration of the track.

### 3. **Generated Music Playback**
   - Listen to the generated music directly on the webpage.

---

## Tech Stack

### Backend:
- **Flask**: Handles server-side logic and integrates with the Hugging Face model.

### Frontend:
- **HTML/CSS**: Structure and styling of the webpage.
- **Tailwind CSS**: For modern, responsive, and minimalistic design.
- **JavaScript**: Adds interactivity and dynamic behavior to the application.

---

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Music-Gen/ai-music-generator.git
   cd ai-music-generator
   ```

2. **Install Dependencies:**
   - Ensure you have Python 3.8+ installed.
   - Create a virtual environment:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows: venv\Scripts\activate
     ```
   - Install required packages:
     ```bash
     pip install -r requirements.txt
     ```

     **Option 2: Using Conda Environment**
   - Create a Conda environment:
     ```bash
     conda create --name ai-music-gen python=3.10
     conda activate ai-music-gen
     ```
   - Install required packages:
     ```bash
     pip install -r requirements.txt
     ```

3. **Run the Application:**
   ```bash
   python app.py
   ```
   The application will be available at `http://127.0.0.1:5000`.

---

## How to Use

1. Open the application in your browser.
2. Choose one of the following modes:
   - **Text Prompt**: Enter a descriptive text and specify the duration to generate music.
   - **Predefined Options**: Select genre, emotions, instruments, and duration.
3. Click **Generate Music** to create your track.
4. Play the generated track in the "Generated Music" section.

---

## Screenshots

### Main Page:
![Main Page]([mainpage.png](https://github.com/SriramR17/Music-Gen/blob/main/Screenshots/mainpage.png))

---

## Future Enhancements

- Add the ability to download generated music files.
- Include more genres, emotions, and instrument options.
- Enable saving user preferences for future sessions.
- Optimize performance for faster music generation.

---

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---



## Acknowledgments

- **Hugging Face**: For providing the `mugic-gen-small` model.
- **Tailwind CSS**: For the beautiful UI design framework.
- **Meta**: For the music generation model.

---








