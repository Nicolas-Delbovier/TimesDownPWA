import jsonData from '../../data/decks.json';

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

    const defaultDecks = jsonData;
    this.saveDecks(defaultDecks);
    return defaultDecks;
  },

  saveDecks(decks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  },

  saveDeck(deck) {
    const decks = this.getDecks();
    const index = decks.findIndex((d) => d.title === deck.title);
    if (index !== -1) {
      decks[index] = deck;
    } else {
      // For new decks, ensure metadata is set
      deck.use = deck.use ?? true;
      deck.isUserGenerated = deck.isUserGenerated ?? true;
      decks.push(deck);
    }
    this.saveDecks(decks);
  },

  deleteDeck(title) {
    const decks = this.getDecks().filter((d) => d.title !== title);
    this.saveDecks(decks);
  },

  getDeck(title) {
    const decks = this.getDecks();
    return decks.find((d) => d.title === title);
  },
};
