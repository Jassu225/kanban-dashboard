import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listsIDs: [],
  lists: {},
  cards: {},
};

const board = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addNewList: (state, action) => {
      state.listsIDs = [...state.listsIDs, action.payload.id];
      state.lists = {
        ...state.lists,
        [action.payload.id]: {
          ...action.payload,
          cardsIDs: [],
        },
      };
    },
    addNewCard: (state, action) => {
      const { listID, card } = action.payload;
      state.lists[listID] = {
        ...state.lists[listID],
        cardsIDs: [...state.lists[listID].cardsIDs, card.id],
      };
      state.cards = {
        ...state.cards,
        [card.id]: card,
      };
    },
    switchCardBetweenLists: (state, action) => {
      const { sourceListID, targetListID, cardID } = action.payload;
      const sourceListCardIDs = [...state.lists[sourceListID].cardsIDs];
      const index = sourceListCardIDs.findIndex(
        (_cardID) => _cardID === cardID
      );
      state.lists[sourceListID] = {
        ...state.lists[sourceListID],
        cardsIDs: [
          ...sourceListCardIDs.slice(0, index),
          ...sourceListCardIDs.slice(index + 1),
        ],
      };
      state.lists[targetListID] = {
        ...state.lists[targetListID],
        cardsIDs: [...state.lists[targetListID].cardsIDs, cardID].sort(),
      };
    },
    removeList: (state, action) => {
      const listID = action.payload;
      const index = state.listsIDs.findIndex((_listID) => _listID === listID);
      state.listsIDs = [
        ...state.listsIDs.slice(0, index),
        ...state.listsIDs.slice(index + 1),
      ];
      const cardsIDs = state.lists[listID].cardsIDs;
      cardsIDs.forEach((cardID) => delete state.cards[cardID]);
      delete state.lists[listID];
    },
    removeCard: (state, action) => {
      const { listID, cardID } = action.payload;
      const index = state.lists[listID].cardsIDs.findIndex(
        (_cardID) => _cardID === cardID
      );
      state.lists[listID].cardsIDs = [
        ...state.lists[listID].cardsIDs.slice(0, index),
        ...state.lists[listID].cardsIDs.slice(index + 1),
      ];
      delete state.cards[cardID];
    },
  },
});

export const {
  addNewList,
  addNewCard,
  switchCardBetweenLists,
  removeList,
  removeCard,
} = board.actions;

export default board.reducer;
