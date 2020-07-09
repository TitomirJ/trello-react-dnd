import * as actionTypes from './types';

export const addColumn = (name) => ({
    type: actionTypes.ADD_COLUMN,
    payload: name
});

export const  deleteColumn = (name) => ({
    type: actionTypes.DELETE_COLUMN,
    payload: name
})

export const addCard = (description, column) => ({
    type: actionTypes.ADD_CARD,
    payload: description,
    column: column
});

export const editCard = (description, column, id) => ({
    type: actionTypes.EDIT_CARD,
    payload: description,
    column: column,
    id: id
})

export const deleteCard = (column, id) => ({
    type: actionTypes.DELETE_CARD,
    column: column,
    id: id
})


export const dragColumn = (dragIndex, hoverIndex) => {
    return {
        type: actionTypes.DRAG_COLUMN,
        dragIndex: dragIndex,
        hoverIndex:  hoverIndex
    };
};

export const dragCard = (
    lastColumnId,
    lastCardPos,
    nextColumnId,
    nextCardPos
) => {
    return {
        type: actionTypes.DRAG_CARD,
        lastColumnId: lastColumnId,
        lastCardPos: lastCardPos,
        nextColumnId: nextColumnId,
        nextCardPos: nextCardPos
    };
}

export const dragCardOnEmpty = (lastColumnId, nextColumnId, cardId) => {
    return {
        type: actionTypes.DRAG_CARD_ON_EMPTY_COLUMN,
        lastColumnId: lastColumnId,
        nextColumnId: nextColumnId,
        cardId: cardId
    };
};
