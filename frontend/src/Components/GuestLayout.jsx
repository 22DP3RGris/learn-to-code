import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function GuestLayout() {
    const {user, token} = useStateContext();
    if (token){
        return <Navigate to="/profile"/>;
    }
    return (
        <div>
            <Outlet/>
        </div>
    );
}

export default GuestLayout;