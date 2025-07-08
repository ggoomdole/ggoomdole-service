import { PutObjectCommand } from '@aws-sdk/client-s3';
import { AddLoadRequestDTO } from '@repo/types';

import s3 from '../config/s3-config';
import loadRepository from '../repositories/loadRepository';
import { ExistsError } from '../utils/customError';

class loadService {
  private BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

  async createLoad(data: AddLoadRequestDTO, userId: number, imageFile?: Express.Multer.File) {
    const exists = await loadRepository.findLoadByTitle(data.title);
    if (exists) throw new ExistsError('이미 존재하는 순례길 이름입니다.');

    let imageUrl: string | null = null;
    if (imageFile) {
      const fileExt = imageFile.originalname.split('.').pop();
      const key = `load-image/${data.title}.${fileExt}`;
  
      await s3.send(new PutObjectCommand({
          Bucket: this.BUCKET_NAME,
          Key: key,
          Body: imageFile.buffer,
          ContentType: imageFile.mimetype,
          ACL: 'public-read',
        }));
  
      imageUrl = `https://${this.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    }
  
    const newLoad = await loadRepository.createLoad({
      title: data.title,
      intro: data.intro,
      categoryId: data.categoryId,
      spots: data.spots,
      imageUrl,
      userId
    });

    return newLoad;
  };
  
}

export default new loadService();