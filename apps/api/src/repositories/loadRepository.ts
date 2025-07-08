import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { SpotDTO } from '@repo/types';

class loadRepository {
  async createLoad(data: {
    title: string;
    intro: string;
    categoryId: number;
    spots: { spotId: number; number: number; introSpot: string }[];
    imageUrl: string | null;
    userId: number;
  }) {
      return await prisma.$transaction(async (tx) => {
        const newLoad = await tx.pilgrimage.create({
          data: {
            title: data.title,
            intro: data.intro,
            imageUrl: data.imageUrl,
            search: 0,
            public: true,
            createAt: new Date(),
            updateAt: new Date(),
            category: {
              connect: { id: data.categoryId }
            },
            spots: {
              create: data.spots.map((spot) => ({
                spotId: spot.spotId,
                number: spot.number,
                introSpot: spot.introSpot,
                request: false,
                createAt: new Date(),
                updateAt: new Date(),
              })),
            },
            participants: {
              create: {
                userId: data.userId,
                type: true, // 관리자로 등록
                createAt: new Date(),
                updateAt: new Date(),
              },
            }
          },
          include: {
            spots: true,
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