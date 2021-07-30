export const getListsIDs = (state) => state.board.listsIDs;

export const getListData = (state, listID) => state.board.lists[listID];

export const getCardData = (state, cardID) => state.board.cards[cardID];
