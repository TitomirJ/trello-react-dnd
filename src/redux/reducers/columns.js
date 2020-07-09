import * as actionTypes from '../types';
import { v4 as uuidv4 } from 'uuid'
const columns = {};

export default function columnsReducer(state = columns, action){
    switch (action.type) {
        case actionTypes.ADD_COLUMN: {
            return {
                ...state,
                [action.payload]: {id: uuidv4(), title: action.payload , cards: []}
            }
        }

        case actionTypes.DELETE_COLUMN: {
            const prop = action.payload

            const newValues = Object.keys(state).reduce((object, key) => {
                if (key !== prop) {
                    object[key] = state[key]
                }
                return object
            }, {})

            return {
                ...newValues
            }
        }

        case actionTypes.DRAG_COLUMN: {
            let columns = Object.entries(state);
            const tmp = columns[action.dragIndex];
            columns.splice(action.dragIndex, 1);
            columns.splice(action.hoverIndex, 0, tmp)
            state = Object.fromEntries(columns)
            return {
                ...state
            }
        }


        case actionTypes.ADD_CARD: {

            state[action.column].cards.push({
                id: uuidv4(),
                description: action.payload
            });

            return {
                ...state
            }
        }

        case actionTypes.EDIT_CARD: {

            let obj = Object.fromEntries(
                Object.entries(state[action.column]).map(([key, value]) => [key, value])
            );

            let key = Object.keys(state[action.column]).filter(index => index === 'cards')

            let newV = state[action.column][key].map((item) => {
                if(item.id === action.id) {
                    return {
                        ...item,
                        description: action.payload
                    }
                }
                return item
            })

            return {
                ...state,
                [action.column]: {
                    ...obj,
                    [key]: [
                        ...newV
                    ]
                }
            }
        }

        case actionTypes.DELETE_CARD: {

            let obj = Object.fromEntries(
                Object.entries(state[action.column]).map(([key, value]) => [key, value])
            );

            let key = Object.keys(state[action.column]).filter(index => index === 'cards')

            let newV = state[action.column][key].filter((item) => {
                return item.id !== action.id
            })

            return {
                ...state,
                [action.column]: {
                    ...obj,
                    [key]: [
                        ...newV
                    ]
                }
            }
        }

        case actionTypes.DRAG_CARD: {
            const columns = Object.entries(state)

            const lastColumn = columns.find(column => {
                return column[1].id === action.lastColumnId
            });

            const nextColumn = columns.find(column => {
                return column[1].id === action.nextColumnId;
            });

            if (action.lastColumnId === action.nextColumnId) {
                lastColumn[1].cards.splice(
                    action.nextCardPos,
                    0,
                    lastColumn[1].cards.splice(action.lastCardPos, 1)[0]
                );
            } else {
                nextColumn[1].cards.splice(action.nextCardPos, 0, lastColumn[1].cards[action.lastCardPos]);
                lastColumn[1].cards.splice(action.lastCardPos, 1);
            }

            return {
                ...state
            }
        }

        case actionTypes.DRAG_CARD_ON_EMPTY_COLUMN: {
            const columns = Object.entries(state)
            const lastColumn = columns.find(column => {
                return column[1].id === action.lastColumnId
            });

            const nextColumn = columns.find(column => {
                return column[1].id === action.nextColumnId;
            });

            const elementPos = lastColumn[1].cards.map(x => x.id).indexOf(action.cardId);
            const removedCard = lastColumn[1].cards.splice(elementPos, 1).pop();

            nextColumn[1].cards.push(removedCard);

            return {
                ...state
            }
        }

        default: return state;
    }
}