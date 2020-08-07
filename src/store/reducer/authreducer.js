
let initialState = {
    user: { email: "", password: "", isAuthenticated: false },
    error:""
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "LOGIN":
            // state.user.email = action.payload.email;
            // state.user.password = action.payload.password;
            // state.user.isAuthenticated = true;
            // state.error = ""
            // break;
            return {
                ...state,
                user: {
                  ...state.user,
                  email: action.payload.email,
                  password: action.payload.password,
                  isAuthenticated: true,
                }, error: ""
              };
        

        case "LOGIN_FAIL":
            state.error = action.payload
    }
    console.log(state)
    return { ...state }
}

export default reducer