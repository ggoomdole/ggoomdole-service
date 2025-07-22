import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class SpotRepository {
    async reqSpot(data: {
        pilgrimageId: number;
        spotId: string;
        number: number;
        introSpot: string;
        request: boolean;
    }[]) {
        await prisma.pilgrimageSpot.createMany({
          data,
          skipDuplicates: true,
        });
      
        return await prisma.pilgrimageSpot.findMany({
          where: {
            pilgrimageId: data[0].pilgrimageId,
            request: true,
          },
        });
    }

    async findRequestedSpots() {
        return await prisma.pilgrimageSpot.findMany({
          where: { request: true },
          include: {
            spot: true,
            pilgrimage: true,
          },
        });
    }
    
    async updateRequestStatus(
        pilgrimageId: number,
        spotIds: string[],
        approve: boolean
      ) {
        if (approve) {
          await prisma.pilgrimageSpot.updateMany({
            where: {
              pilgrimageId,
              spotId: { in: spotIds },
              request: true,
            },
            data: { request: false },
          });
        } else {
          await prisma.pilgrimageSpot.deleteMany({
            where: {
              pilgrimageId,
              spotId: { in: spotIds },
              request: true,
            },
          });
        }
    }
}

export default new SpotRepository();