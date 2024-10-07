import { PropertiesRepository } from '@/database/repositories/properties';
import {
	CreatePropertyUseCase,
	type CreatePropertyUseCaseRequest,
} from '@/use-cases/create-property';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const schema = z.object({
		name: z.string().min(1).max(255),
		totalValue: z.number().int(),
		numberOfRooms: z.number().int(),
		city: z.string().min(1).max(255),
		state: z.string().length(2),
		size: z.string(),
	});

	const data = schema.parse(request.body);

	const repository = new PropertiesRepository();
	const useCase = new CreatePropertyUseCase(repository);

	const response = await useCase.execute(data);

	return reply.code(201).send(response);
}
