import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
     user:null,
    // user: {
    //     //trying to change id in mongodb 
    //     _id:"61b0fca4c2f0af06bd33fb3f", //61b0528e3d6efb38c49dad4d
    //     username:"jane",
    //     email:"jane@gmail.com",
    //     password:"123456",
    //     profilePicture:"",
    //     coverPicture:"",
    //     followers:[],
    //     followings:[1,2],
    //     isAdmin:false,
    // },
    isFetching: false,
    error:false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return(
        <AuthContext.Provider 
          value = {{
            user:state.user, 
            isFetching:state.isFetching, 
            error:state.error,
            dispatch,
           }}
        >
            {children}
        </AuthContext.Provider>

    );

};