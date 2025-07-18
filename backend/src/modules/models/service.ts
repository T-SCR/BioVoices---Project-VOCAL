interface ModelResult {
  species: string;
  emotion: string;
  confidence: number;
  status: string;
  message: string;
}

export async function runModel(animalType: string, input: any): Promise<ModelResult> {
  // Mocked responses for now
  switch (animalType.toLowerCase()) {
    case 'birds':
      return {
        species: 'Northern Cardinal',
        emotion: 'Excited',
        confidence: 0.92,
        status: 'success',
        message: 'Chirping loudly, likely attracting a mate.'
      };
    case 'dogs':
      return {
        species: 'Golden Retriever',
        emotion: 'Happy',
        confidence: 0.88,
        status: 'success',
        message: 'Barking playfully, wants to play fetch.'
      };
    case 'cats':
      return {
        species: 'Siamese',
        emotion: 'Curious',
        confidence: 0.85,
        status: 'success',
        message: 'Meowing softly, exploring surroundings.'
      };
    case 'whales':
      return {
        species: 'Orca',
        emotion: 'Calm',
        confidence: 0.93,
        status: 'success',
        message: 'Clicking and whistling, communicating with pod.'
      };
    default:
      return {
        species: 'Unknown',
        emotion: 'Unknown',
        confidence: 0,
        status: 'error',
        message: 'Model not found for this animal type.'
      };
  }
} 