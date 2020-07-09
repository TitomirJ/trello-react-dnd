import { combineReducers, createStore, applyMiddleware } from "redux";
import columnsReducer from "./reducers/columns";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
    columnsReducer,
});

const localStorageMiddleware = ({getState}) => {
    return (next) => (action) => {
        const result = next(action);
        localStorage.setItem('applicationState', JSON.stringify(
            getState()
        ));
        return result;
    };
};


const reHydrateStore = () => {
    if (localStorage.getItem('applicationState') !== null) {
        return JSON.parse(localStorage.getItem('applicationState'))
    }
}

const store = createStore(
    reducers,
    reHydrateStore(),
    composeWithDevTools(
        applyMiddleware(
            localStorageMiddleware,
        )
    )
);

export default store;