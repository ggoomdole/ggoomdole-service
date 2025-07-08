import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { SpotDTO } from '@repo/types';

interface CreateLoadParams {
    title: string;
    intro: string;
    categoryId: number;
    imageUrl: string | null;
    userId: number;
    spots: SpotDTO[];
}

class loadRepository {
  async createLoad(params: CreateLoadParams) {
      return await prisma.$transaction(async (tx) => {
        const newLoad = await tx.pilgrimage.create({
          data: {
            title: params.title,
            intro: params.intro,
            imageUrl: params.imageUrl,
            public: true,
            createAt: new Date(),
            updateAt: new Date(),
            spots: {
              create: params.spots.map((spot) => ({
                spotId: spot.spotId,
                number: spot.number,
                introSpot: spot.introSpot,
                createAt: new Date(),
                updateAt: new Date(),
              })),
            },
            participants: {
              create: {
                userId: params.userId,
                type: true, // 관리자 
                createAt: new Date(),
                updateAt: new Date(),
              },
            },
            categories: {
              create: [
                {
                  category: {
                    connect: { id: params.categoryId }
                  },
                  createAt: new Date()
                }
              ]
            }
          },
          include: {
            spots: true,
            categories: true,
            participants: true
          },
        });
        return newLoad;
      });
  }

  async findLoadByTitle(title: string) {  
    return await prisma.pilgrimage.findFirst({
      where: { title },
      select: { id: true },
    });
  }
}

export default new loadRepository();