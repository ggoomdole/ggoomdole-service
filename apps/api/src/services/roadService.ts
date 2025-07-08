import { PutObjectCommand } from '@aws-sdk/client-s3';
import { RoadRequestDTO } from '@repo/types';

import s3 from '../config/s3-config';
import roadRepository from '../repositories/roadRepository';
import { ExistsError, UnauthorizedError } from '../utils/customError';

class roadService {
  private BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

  async createRoad(data: RoadRequestDTO, userId: number, imageFile?: Express.Multer.File) {
    const exists = await roadRepository.findRoadByTitle(data.title);
    if (exists) throw new ExistsError('이미 존재하는 순례길 이름입니다.');

    let imageUrl: string | null = null;
    if (imageFile) {
      const fileExt = imageFile.originalname.split('.').pop();
      const key = `road-image/${data.title}.${fileExt}`;
  
      await s3.send(new PutObjectCommand({
          Bucket: this.BUCKET_NAME,
          Key: key,
          Body: imageFile.buffer,
          ContentType: imageFile.mimetype,
          ACL: 'public-read',
        }));
  
      imageUrl = `https://${this.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    }
  
    const newRoad = await roadRepository.createRoad({
      title: data.title,
      intro: data.intro,
      categoryId: data.categoryId,
      spots: data.spots,
      imageUrl,
      userId
    });

    return newRoad;
  }

  async updateRoad(
    roadId: number,
    userId: number,
    data: Partial<RoadRequestDTO>,
    imageFile?: Express.Multer.File
  ) {
    const isAdmin = await roadRepository.checkPilgrimageOwner(userId, roadId);
    if (!isAdmin) { throw new UnauthorizedError('관리자 권한이 없습니다.'); }

    let imageUrl: string | undefined;
  
    if (imageFile) {
      const fileExt = imageFile.originalname.split('.').pop();
      const key = `road-image/${roadId}.${fileExt}`;
  
      await s3.send(new PutObjectCommand({
        Bucket: this.BUCKET_NAME,
        Key: key,
        Body: imageFile.buffer,
        ContentType: imageFile.mimetype,
        ACL: 'public-read',
      }));
  
      imageUrl = `https://${this.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    }
  
    const updatedRoad = await roadRepository.updateRoad(roadId, userId, {
      ...data,
      ...(imageUrl && { imageUrl })
    });
  
    return updatedRoad;
  }  
}

export default new roadService();