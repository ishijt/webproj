![banner](./images/banner.jpeg)

# SchoolQuizZone

SchoolQuizZone is a collection of interactive educational games designed to help users learn and test their knowledge in various subjects. The website features six engaging games focusing on biology, geography, English language skills, mathematics, and music education.

<!-- vim-markdown-toc GFM -->

* [Team members](#team-members)
* [Games Available](#games-available)
    * [1. Animal Recognition Game (Biology)](#1-animal-recognition-game-biology)
    * [2. World Capitals Quiz (Geography)](#2-world-capitals-quiz-geography)
    * [3. World Flags Quiz (Geography)](#3-world-flags-quiz-geography)
    * [4. Word Scramble Game (English)](#4-word-scramble-game-english)
    * [5. Mathematics Game](#5-mathematics-game)
    * [6. Music Education Game](#6-music-education-game)
* [Technical Features](#technical-features)
* [Technologies Used](#technologies-used)
* [Scoring System](#scoring-system)
    * [Score Tracking](#score-tracking)
    * [Scores Page Features](#scores-page-features)
* [License](#license)

<!-- vim-markdown-toc -->

## Team members

| Name            | Username       |
| --------------- | -------------- |
| Erkka Leppänen  | merkksgit      |
| Daniel Lyytinen | DanielLyytinen |
| Irina Gerasina  | irina-ge       |
| Heini Paananen  | heinipaananen  |
| Ilari Tuimala   | ishijt         |

## Games Available

### 1. Animal Recognition Game (Biology)

- Test your knowledge of animals through image recognition
- Features random animal images from the Unsplash API
- 10 questions per game session
- Score tracking functionality
- Immediate feedback on answers

### 2. World Capitals Quiz (Geography)

- Challenge yourself to match countries with their capitals
- Uses the REST Countries API for up-to-date information
- Multiple choice format with 6 options per question
- 10 questions per quiz
- Real-time score tracking
- Final score summary

### 3. World Flags Quiz (Geography)

- Test your knowledge of country flags
- Uses REST Countries API for current flag data
- Visual multiple-choice format with flag images
- 10 questions per quiz
- Immediate feedback with correct flag shown
- Score tracking and history

### 4. Word Scramble Game (English)

- Improve your English vocabulary through word unscrambling
- Features various common English words with corresponding images
- 10 questions per game
- Score tracking with points added for correct answers and deducted for incorrect ones
- Immediate feedback with correct answer display

### 5. Mathematics Game

- Dynamic multiplication practice
- Falling calculations format for engaging gameplay
- Real-time answer input
- Score tracking out of 20 calculations
- Game over modal with final score display
- Local storage for high scores

### 6. Music Education Game

- Three different game modes:
  - Sound recognition
  - Instrument image identification
  - Music trivia questions
- Features 13 different musical instruments
- Audio clips and visual elements
- Timer functionality
- Score tracking and best score storage
- Multiple choice and text input answers

## Technical Features

- **Dynamic Content Loading**: All games utilize JavaScript for dynamic content generation
- **API Integration**:
  - Unsplash API for animal images
  - REST Countries API for geographical data
- **Local Storage**: Implements score tracking across sessions
- **Responsive Design**: Games are playable across different device sizes
- **Interactive UI**: Immediate feedback and smooth transitions between questions
- **Multiple Input Methods**: Supports both multiple choice and text input
- **Audio Integration**: Sound clips for music education
- **Animation Features**: Falling calculations in math game

## Technologies Used

- HTML
- CSS (Bootstrap for responsive design)
- JavaScript
- External APIs:
  - Unsplash API
  - REST Countries API v3.1
- Web Audio API
- Local Storage API

## Scoring System

### Score Tracking

- Each game tracks individual scores using browser's Local Storage
- Scores are preserved between sessions
- Maximum possible score for each game is 10 points (20 for Mathematics)
- Total possible score across all games is 100 points

### Scores Page Features

- Dashboard for viewing all game scores
- Individual score display for each game
- Total score calculation across all games
- Real-time score updates after each game completion

## License

This project is open source and available under the [MIT License](https://mit-license.org/).
