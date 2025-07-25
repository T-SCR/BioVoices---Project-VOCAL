# BioVoices - Project Vocal

**Voice observation and classification of animal life**

## Overview

**BioVoices - Project Vocal** is a modern, modular research platform for decoding animal communication using AI. It provides a unified interface for analyzing animal sounds and images, running state-of-the-art models, and managing research workflows. The platform is built with a React (shadcn, Tailwind, TypeScript) frontend and a Fastify + TypeScript backend.

## Key Features

- **AI Assistant Chat**: Interact with animal models via chat, audio, or image. Receive real-time analysis of species, emotion, confidence, and "what it’s saying."
- **Model Hub**: Access and run models for birds, dogs, cats, whales, dolphins, and more (BirdNET, DogEmotions, CatEmotion, ORCA-SPOT, etc.).
- **Research Tools**: API playground and model runner for reproducible research and API testing.
- **Personalized Dashboard**: Quick stats, recent activity, and actionable insights.
- **Modern UI**: Responsive, accessible, and animated interface using shadcn UI, Tailwind CSS, and TypeScript.
- **Extensible Backend**: Modular Fastify server for model execution, history, and user management.

## Tech Stack

- **Frontend**: React, shadcn/ui, Tailwind CSS, TypeScript
- **Backend**: Fastify, TypeScript (planned)
- **State Management**: React Context, useReducer
- **UI Animations**: framer-motion
- **Icons**: lucide-react
- **Dialog/Tooltip**: @radix-ui/react-dialog, @radix-ui/react-tooltip

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/biovoices-animal-alchemy.git
   cd biovoices-animal-alchemy
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. **(Planned) Start the backend server:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

### Project Structure
```
biovoices-animal-alchemy/
  src/
    components/
      ui/
        ai-prompt-box.tsx
        ...
    pages/
      Index.tsx
      research-tools.tsx
      ...
  backend/ (planned)
    src/
      models/
      routes/
      ...
  README.md
  package.json
  ...
```

## Usage
- Use the **AI Assistant** to chat with animal models, upload audio/images, and receive analysis.
- Access the **Model Hub** to view and run available models.
- Use **Research Tools** for API testing and model execution.

## Contributing
Contributions are welcome! Please open issues or pull requests for new features, bug fixes, or improvements.

1. Fork the repo and create your branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -am 'Add new feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Open a pull request

## License
[MIT](LICENSE)

## Acknowledgements
- [BirdNET-Analyzer](https://github.com/birdnet-team/BirdNET-Analyzer)
- [DogEmotionsClassification](https://github.com/micahwarner/DogEmotionsClassification/)
- [Cat Emotion Classifier](https://github.com/semihdervis/cat-emotion-classifier)
- [ORCA-SPOT](https://github.com/ChristianBergler/ORCA-SPOT)
- And all referenced open-source models and datasets
