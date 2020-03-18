import { CHANGE_MODAL_VISIBLE, BLOCK_USER } from './action-types'

export const showModalAction = () => {
    return {
        type: CHANGE_MODAL_VISIBLE
    }   
}
export const blockUserAction = () =>{
    return {
        type: BLOCK_USER
    }
}