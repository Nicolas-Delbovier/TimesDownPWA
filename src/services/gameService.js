/**
 * Service to handle game preparation and business logic.
 */
export const gameService = {
  /**
   * Prepares the word list for a new game based on selected decks.
   * @param {Array} decks - The list of available decks.
   * @param {number} nbCardsRequested - The number of cards the user wants to play with.
   * @returns {Object} - Returns an object with `success` boolean, `message` string (if not successful), and `words` array (if successful).
   */
  prepareGameWords(decks, nbCardsRequested) {
    let allWords = [];

    // 1. Filter and collect words from active decks
    for (const deck of decks) {
      if (deck.use) {
        allWords = allWords.concat(deck.words);
      }
    }

    // 2. Validation: At least one theme selected
    if (allWords.length === 0) {
      return {
        success: false,
        message: 'Veuillez sélectionner au moins un thème avant de commencer le jeu.',
      };
    }

    // 3. Validation: Enough words for the requested card count
    if (allWords.length < nbCardsRequested) {
      return {
        success: false,
        message: `Le nombre de mots sélectionnés (${allWords.length}) est insuffisant pour le nombre de cartes choisi (${nbCardsRequested}).`,
      };
    }

    // 4. Shuffle and slice
    const preparedWords = [...allWords].sort(() => 0.5 - Math.random()).slice(0, nbCardsRequested);

    return { success: true, words: preparedWords };
  },
};
