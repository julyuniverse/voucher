import { createStore, combineReducers } from 'redux';
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({ // reducer들을 모은다.
    userReducer,
});

// localStorage에 state data들을 심어 주는 데 reduxState라는 키값이 있을 시에 값을 반환하여 persistedState에 저장한다.
const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {}

const store = createStore(rootReducer, persistedState);

// dispatch가 일어날 때마다 작동하는 subscribe 함수를 넣어, 현재 상태를 읽기 위해 getState() 추가해 준다.
store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store;