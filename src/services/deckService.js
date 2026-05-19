import jsonData from '../../data/data.json';

const STORAGE_KEY = 'timesdown_decks';

export const deckService = {
  getDecks() {
    const storedDecks = localStorage.getItem(STORAGE_KEY);
    if (storedDecks) {
      try {
        return JSON.parse(storedDecks);
      } catch (e) {
        console.error('Failed to parse decks from localStorage', e);
      }
    }

    // Fallback to default data
    const defaultDecks = jsonData.decks;
    this.saveDecks(defaultDecks);
    return defaultDecks;
  },

  saveDecks(decks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  },

  saveDeck(deck) {
    const decks = this.getDecks();
    const index = decks.findIndex((d) => d.theme === deck.theme);
    if (index !== -1) {
      decks[index] = deck;
    } else {
      decks.push(deck);
    }
    this.saveDecks(decks);
  },

  deleteDeck(themeName) {
    const decks = this.getDecks().filter((d) => d.theme !== themeName);
    this.saveDecks(decks);
  },

  getDeck(themeName) {
    const decks = this.getDecks();
    return decks.find((d) => d.theme === themeName);
  },
};
