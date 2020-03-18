import {
    combineReducers,
} from 'redux';
import {CHANGE_MODAL_VISIBLE, BLOCK_USER} from './action-types'

const initialState = {
    visible: false, 
}

export const modal = (state = initialState, action) => {
    if (action.type === CHANGE_MODAL_VISIBLE) {
        return {
            visible: !state.visible,
            content: action.content, // это данные одного пользователя, которые пришли с action в UsersTable.jsn
        }
    }

    if (action.type === 'TEST') {
        return {
            test: 'test',
        }
    }
    if (action.type === BLOCK_USER){
        return {
            blocksUsersArray: action.block // перезаписываю массив заблокированных юзеров из store новым массивом заблокированных пользователей после событий при нажатии "Заблокировать пользователя" 
        }
    }
    return state;
};

export const reducers = combineReducers({
    modal,
});
