import { PutObjectCommand } from '@aws-sdk/client-s3';
import { RoadListResponseDTO, OneRoadResponseDTO,ParticipantDTO, RoadRequestDTO, RoadResponseDTO, SpotDTO } from '@repo/types';

import s3 from '../config/s3-config';
import roadRepository from '../repositories/roadRepository';
import { ExistsError, NotFoundError, UnauthorizedError } from '../utils/customError';

class roadService {
  private BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

  async loadAllRoad(categoryId?: number, sortBy: string = 'popular'): Promise<RoadListResponseDTO[]> {
    const rawPilgrimages = await roadRepository.allRoadList(categoryId);
    if (!rawPilgrimages || rawPilgrimages.length === 0) throw new NotFoundError('순례길이 존재하지 않습니다.');
  
    // 후처리 정렬
    const sortedPilgrimages = [...rawPilgrimages];
  
    switch (sortBy) {
      case 'latest':
        sortedPilgrimages.sort((a, b) => +new Date(b.createAt) - +new Date(a.createAt));
        break;
      case 'views':
        sortedPilgrimages.sort((a, b) => b.search - a.search);
        break;
      case 'participants':
        sortedPilgrimages.sort((a, b) => b.participants.length - a.participants.length);
        break;
      case 'popular':
      default:
        sortedPilgrimages.sort((a, b) => averageRate(b) - averageRate(a));
        break;
    }
  
    return sortedPilgrimages.map((p): RoadListResponseDTO => ({
      roadId: p.id,
      title: p.title,
      intro: p.intro,
      imageUrl: p.imageUrl ?? null,
      categoryId: p.categoryId,
      participants: p.participants.length,
      native: p.participants[0]?.user.native ?? null
    }));
  }

  async getPopularRoads(categoryId?: number): Promise<RoadListResponseDTO[]> {
    const pilgrimages = await roadRepository.allRoadList(categoryId);
  
    if (!pilgrimages || pilgrimages.length === 0) { throw new NotFoundError('순례길이 존재하지 않습니다.'); }
  
    // 조회수 기준 내림차순 정렬
    pilgrimages.sort((a, b) => b.search - a.search);
  
    // 상위 3개씩만 필터링
    const top3Roads = categoryId
      ? pilgrimages.slice(0, 3)
      : pilgrimages.slice(0, 3);
  
    return top3Roads.map(p => ({
      roadId: p.id,
      title: p.title,
      intro: p.intro,
      imageUrl: p.imageUrl ?? null,
      categoryId: p.categoryId,
      participants: p.participants.length,
      native: p.participants[0]?.user.native ?? null,
    }));
  }

  async createRoad(data: RoadRequestDTO, userId: number, imageFile?: Express.Multer.File): Promise<RoadResponseDTO> {
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

    return {
      roadId: newRoad.id,
      title: newRoad.title,
      intro: newRoad.intro,
      imageUrl: newRoad.imageUrl ?? null,
      public: newRoad.public ?? true,
      createAt: newRoad.createAt,
      updateAt: newRoad.updateAt,
      categoryId: newRoad.categoryId,
      spots: newRoad.spots.map((spot): SpotDTO => ({
        spotId: spot.spotId,
        number: spot.number,
        introSpot: spot.introSpot,
      })),
      participants: newRoad.participants.map((part): ParticipantDTO => ({
        userId: part.userId,
        type: part.type,
      })),
    };
  }

  async updateRoad(roadId: number, userId: number, data: Partial<RoadRequestDTO>, imageFile?: Express.Multer.File): Promise<RoadResponseDTO> {
    const isAdmin = await roadRepository.checkPilgrimageOwner(userId, roadId);
    if (!isAdmin) { throw new UnauthorizedError('관리자 권한이 없습니다.'); }

    const road = await roadRepository.findRoadById(roadId);
    if (!road) throw new NotFoundError('해당 순례길이 존재하지 않습니다.');

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
  
    return {
      roadId: updatedRoad.id,
      title: updatedRoad.title,
      intro: updatedRoad.intro,
      imageUrl: updatedRoad.imageUrl ?? null,
      public: updatedRoad.public ?? true,
      createAt: updatedRoad.createAt,
      updateAt: updatedRoad.updateAt,
      categoryId: updatedRoad.categoryId,
      spots: updatedRoad.spots.map((spot): SpotDTO => ({
        spotId: spot.spotId,
        number: spot.number,
        introSpot: spot.introSpot,
      })),
      participants: updatedRoad.participants.map((part): ParticipantDTO => ({
        userId: part.userId,
        type: part.type,
      }))
    };
  }

  async checkDuplicateName(title: string): Promise<{ isName: boolean;}> { 
    const exists = await roadRepository.existsPilgrimageName(title);
    if (exists) { throw new ExistsError('이미 존재하는 이름입니다.'); }

    return { isName: false };
  }

  async getOneRoadWithSpots(roadId: number, sortBy: string): Promise<OneRoadResponseDTO> {
    const road = await roadRepository.findRoadWithSpots(roadId);
    if (!road) throw new NotFoundError('순례길이 존재하지 않습니다.');
  
    // 조회수 증가
    await roadRepository.incrementSearchCount(roadId);

    let spots = road.spots;
  
    // 스팟 정렬 (기본: number 순서)
    if (sortBy === 'popular') {
      // 인기순: 스팟별 평균 평점 내림차순
      spots = spots.sort((a, b) => {
        const avgA = averageRate(a);
        const avgB = averageRate(b);
        return avgB - avgA;
      });
    } else if (sortBy === 'review') {
      // 후기순: 스팟별 리뷰 개수 내림차순
      spots = spots.sort((a, b) => b.place.reviews.length - a.place.reviews.length);
    } else {
      // 기본: number 오름차순
      spots = spots.sort((a, b) => a.number - b.number);
    }
  
    return {
      roadId: road.id,
      title: road.title,
      intro: road.intro,
      imageUrl: road.imageUrl ?? null,
      categoryId: road.categoryId,
      spots: spots.map((spot) => ({
        spotId: spot.spotId,
        number: spot.number,
        introSpot: spot.introSpot,
        avgReview: averageRateStr(spot),
        numReview: spot.place.reviews.length.toString(),
      })),
    };
  }

  async getParticipatedRoads(userId: number, maker: boolean, categoryId?: number): Promise<RoadListResponseDTO[]> {
    const roads = await roadRepository.findRoadsByParticipation(userId, maker, categoryId);
    if (!roads || roads.length === 0) throw new NotFoundError('참여한 순례길이 없습니다.');
  
    return roads.map((p): RoadListResponseDTO => ({
      roadId: p.id,
      title: p.title,
      intro: p.intro,
      imageUrl: p.imageUrl ?? null,
      categoryId: p.categoryId,
      participants: p.participants.length,
      native: p.participants[0]?.user.native ?? null,
    }));
  }  
}

// 평균 평점 숫자 조정
function averageRateStr(spot: any): string {
  const avg = averageRate(spot);
  return avg ? avg.toFixed(1) : '0.0';
}

// 평균 평점 계산
function averageRate(spot: any): number {
  const reviews = spot?.place?.reviews ?? [];
  const rates = reviews
    .filter((r: any) => r.rate !== null && r.rate !== undefined)
    .map((r: any) => r.rate);

  if (rates.length === 0) return 0;
  return rates.reduce((a: number, b: number) => a + b, 0) / rates.length;
}

export default new roadService();