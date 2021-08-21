const initialState = []

export const actionTypes = {
    GET_ALL_TAGS : "GET_ALL_TAGS",
    SET_TAGS : "SET_TAGS",
    DELETE_TAG : "DELETE_TAG",
    ADD_TAG: "ADD_TAG"
}

export const actions = {
    get_all_tags : ()=>{
        return{
            type: actionTypes.GET_ALL_TAGS,
        }
    },
    delete_tag: (id)=>{
        return{
            type: actionTypes.DELETE_TAG,
            id
        }
    },
    add_tag: (name)=>{
        return {
            type: actionTypes.ADD_TAG,
            name
        }
    }
}

export function tagReducer(state=initialState,action){
    switch(action.type){
        case actionTypes.SET_TAGS:
            return [...action.data]
        default :
            return state
    }
}