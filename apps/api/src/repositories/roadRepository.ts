import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

import { RoadRequestDTO, AllRoadResponseDTO } from '@repo/types';

class roadRepository {
  async allRoadList(categoryId?: number) {
    return await prisma.pilgrimage.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: {
        spots: {
          include: {
            place: {
              include: {
                reviews: true,
              },
            },
          },
        },
        participants: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async createRoad(data: {title: string; intro: string; categoryId: number; spots: { spotId: number; number: number; introSpot: string }[]; imageUrl: string | null; userId: number; }) {
      return await prisma.$transaction(async (tx) => {
        const newRoad = await tx.pilgrimage.create({
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
        return newRoad;
      });
  }

  async findRoadByTitle(title: string) {  
    return await prisma.pilgrimage.findFirst({
      where: { title },
      select: { id: true },
    });
  }

  async updateRoad(roadId: number, userId: number, data: Partial<RoadRequestDTO & { imageUrl?: string }>) {
    return await prisma.$transaction(async (tx) => {
      // 기존 데이터 업데이트
      const updated = await tx.pilgrimage.update({
        where: { id: roadId },
        data: {
          ...(data.title && { title: data.title }),
          ...(data.intro && { intro: data.intro }),
          ...(data.categoryId && { category: { connect: { id: data.categoryId } } }),
          ...(data.imageUrl && { imageUrl: data.imageUrl }),
          updateAt: new Date(),
        },
      });
  
      // spots 업데이트 (기존 삭제 후 새로 삽입)
      if (data.spots && Array.isArray(data.spots)) {
        await tx.pilgrimageSpot.deleteMany({ where: { pilgrimageId: roadId } });
  
        await tx.pilgrimageSpot.createMany({
          data: data.spots.map((spot) => ({
            pilgrimageId: roadId,
            spotId: spot.spotId,
            number: spot.number,
            introSpot: spot.introSpot,
            request: false,
            createAt: new Date(),
            updateAt: new Date(),
          })),
        });
      }
  
      const final = await tx.pilgrimage.findUnique({
        where: { id: roadId },
        include: { spots: true, participants: true },
      });
  
      return final!;
    });
  }

  async checkPilgrimageOwner(userId: number, pilgrimageId: number): Promise<boolean> {
    const record = await prisma.pilgrimageUser.findUnique({
      where: {
        userId_pilgrimageId: {
          userId,
          pilgrimageId,
        },
      },
      select: {
        type: true,
      },
    });

    return record?.type === true;
  }

  async existsPilgrimageName(title: string): Promise<boolean> {
    const existing = await prisma.pilgrimage.findUnique({
      where: { title }
    });
    return existing !== null;
  }
}

export default new roadRepository();