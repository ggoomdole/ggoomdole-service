const RECENT_SEARCH_KEY = "recentSearch";

export const recentSearchUtils = {
  // 최근 검색어 목록 가져오기
  getRecentSearches: (): string[] => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCH_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("최근 검색어 데이터를 가져오는데 실패했습니다.", error);
      return [];
    }
  },

  // 최근 검색어 저장
  saveRecentSearches: (searches: string[]): void => {
    localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(searches));
  },

  // 검색어 추가
  addRecentSearch: (keyword: string): string[] => {
    if (!keyword.trim()) return recentSearchUtils.getRecentSearches();

    const newSearch = keyword.trim();
    const currentSearches = recentSearchUtils.getRecentSearches();
    const filtered = currentSearches.filter((search) => search !== newSearch);
    const updated = [newSearch, ...filtered].slice(0, 10); // 최대 10개만 유지

    recentSearchUtils.saveRecentSearches(updated);
    return updated;
  },

  // 개별 검색어 삭제
  removeRecentSearch: (keyword: string): string[] => {
    const currentSearches = recentSearchUtils.getRecentSearches();
    const updated = currentSearches.filter((search) => search !== keyword);
    recentSearchUtils.saveRecentSearches(updated);
    return updated;
  },

  // 전체 검색어 삭제
  clearAllRecentSearches: (): string[] => {
    localStorage.removeItem(RECENT_SEARCH_KEY);
    return [];
  },
};
