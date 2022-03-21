export const login = () => ({type: "LOGIN"});

const initState = {
    isLogin: false,
    userId: "",
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case "LOGIN":
            return {}
    }
}