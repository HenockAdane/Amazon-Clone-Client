export const updateUserAction = (user) => ({
    type: "UPDATEUSER",
    user
})

const IS = {
    currentUser: null
}

const userReducer = (state = IS, action) => {
    switch(action.type){
        case "UPDATEUSER":
            return {...state, currentUser: action.user};
        default: return state
    }
}

export default userReducer