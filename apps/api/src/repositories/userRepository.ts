import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class UserRepository {
  async findUserByNickname(nickname: string) {  
    return await prisma.user.findUnique({
      where: { nickName: nickname },
      select: { id: true },
    });
  }

  async saveNickname(userId: number, nickname: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { nickName: nickname },
    });
  }

  async updateNickname(userId: number, nickname: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { nickName: nickname },
    });
  }

  async updateProfileImage(userId: number, imageUrl: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { profileImage: imageUrl },
    });
  }

  async findUserById(userId: number) {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        nickName: true,
        profileImage: true,
        native: true,
      },
    });
  }
}

export default new UserRepository();