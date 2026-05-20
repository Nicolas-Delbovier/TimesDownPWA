/**
 * Service to handle game preparation and business logic.
 */
export const gameService = {
  /**
   * Prepares the word list for a new game based on selected decks.
   * @param {Array} decks - The list of available decks.
   * @param {number} nbCardsRequested - The number of cards the user wants to play with.
   * @returns {Array|null} - Returns the shuffled and sliced word list, or null if validation fails.
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
      window.alert('Veuillez sélectionner au moins un thème avant de commencer le jeu.');
      return null;
    }

    // 3. Validation: Enough words for the requested card count
    if (allWords.length < nbCardsRequested) {
      window.alert(
        `Le nombre de mots sélectionnés (${allWords.length}) est insuffisant pour le nombre de cartes choisi (${nbCardsRequested}).`
      );
      return null;
    }

    // 4. Shuffle and slice
    const preparedWords = [...allWords].sort(() => 0.5 - Math.random()).slice(0, nbCardsRequested);

    return preparedWords;
  },
};
