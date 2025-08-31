import { RoadListResponseDTO } from '@repo/types';

import { averageRate } from './roadService';
import searchRepository from '../repositories/searchRepository';

class SearchService {
  async searchRoad(userId: number | null, word: string, sortBy: string = 'popular'): Promise<{ results: RoadListResponseDTO[] }> {
    const rawResults = await searchRepository.searchPilgrimages([word]);
    if (userId) { await searchRepository.saveSearchKeyword(userId, word); }
    const sortedResults = [...rawResults];

    switch (sortBy) {
      case 'latest':
        sortedResults.sort((a, b) => +new Date(b.createAt) - +new Date(a.createAt));
        break;
      case 'views':
        sortedResults.sort((a, b) => b.search - a.search);
        break;
      case 'participants':
        sortedResults.sort((a, b) => b.participants.length - a.participants.length);
        break;
      case 'popular':
      default:
        sortedResults.sort((a, b) => averageRate(b) - averageRate(a));
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