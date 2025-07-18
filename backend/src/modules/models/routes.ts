import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { runModel } from './service';

export async function modelRoutes(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  fastify.post('/:animalType/run', async (request, reply) => {
    const { animalType } = request.params as { animalType: string };
    // Accept file or text input
    const data = await request.file();
    const body = request.body as any;
    const input = data || body?.input;
    const result = await runModel(animalType, input);
    return reply.send(result);
  });

  fastify.get('/', async (request, reply) => {
    // List available models
    return reply.send([
      { animalType: 'birds', name: 'BirdNET', description: 'Bird sound analysis', status: 'active' },
      { animalType: 'dogs', name: 'DogEmotionsClassification', description: 'Dog emotion detection', status: 'active' },
      { animalType: 'cats', name: 'CatEmotionClassifier', description: 'Cat emotion detection', status: 'active' },
      { animalType: 'whales', name: 'ORCA-SPOT', description: 'Killer whale sound detection', status: 'active' }
    ]);
  });
} 