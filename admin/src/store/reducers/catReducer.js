const initialState = []

export const actionTypes = {
    GET_ALL_CATS : "GET_ALL_CATS",
    SET_CATS : "SET_CATS",
    DELETE_CATS : "DELETE_CATS",
    ADD_CAT: "ADD_CAT"
}

export const actions = {
    get_all_cats : ()=>{
        return{
            type: actionTypes.GET_ALL_CATS,
        }
    },
    delete_cat: (id)=>{
        return{
            type: actionTypes.DELETE_CATS,
            id
        }
    },
    add_cat: (name)=>{
        return {
            type: actionTypes.ADD_CAT,
            name
        }
    }
}

export function catReducer(state=initialState,action){
    switch(action.type){
        case actionTypes.SET_CATS:
            return [...action.data]
        default :
            return state
    }
}