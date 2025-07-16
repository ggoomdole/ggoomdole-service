import { RoadListResponseDTO } from '@repo/types';

import axios from 'axios';

import { averageRate } from './roadService';
import searchRepository from '../repositories/searchRepository';

class SearchService {
  async searchRoad(userId: number, word: string, sortBy: string = 'popular'): Promise<{ results: RoadListResponseDTO[] }> {
    const response = await axios.post(
      'https://dapi.kakao.com/v2/nlp/morph',
      { text: word },
      {
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const morphs = response.data?.result?.morp || [];
    const nouns = morphs
      .filter((m: any) => m.tag === 'NNG' || m.tag === 'NNP')
      .map((m: any) => m.lemma);

    if (nouns.length === 0) return { results: [] };

    const rawResults  = await searchRepository.searchPilgrimages(nouns);
    await searchRepository.saveSearchKeyword(userId, word);

    const sortedResults = [...rawResults];

    switch (sortBy) {
      case 'latest':
        rawResults.sort((a, b) => +new Date(b.createAt) - +new Date(a.createAt));
        break;
      case 'views':
        rawResults.sort((a, b) => b.search - a.search);
        break;
      case 'participants':
        rawResults.sort((a, b) => b.participants.length - a.participants.length);
        break;
      case 'popular':
      default:
        rawResults.sort((a, b) => averageRate(b) - averageRate(a));
        break;
    }

    const results = sortedResults.map((p) => ({
      roadId: p.id,
      title: p.title,
      intro: p.intro,
      imageUrl: p.imageUrl ?? null,
      categoryId: p.categoryId,
      participants: p.participants.length,
      native: p.participants[0]?.user.native ?? null,
    }));

    return { results };
  }

  async deleteSearchWord(userId: number, word: string): Promise<void> {
    await searchRepository.deleteSearchKeyword(userId, word);
  }

  async deleteAllSearchWords(userId: number): Promise<void> {
    await searchRepository.deleteAllSearchKeywords(userId);
  }

  async getRecentSearchWords(userId: number): Promise<string[]> {
    const keywordObjects = await searchRepository.getRecentSearchKeywords(userId);
    return keywordObjects.map(k => k.word);
  }
}

export default new SearchService();