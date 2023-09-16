import React, {useContext} from "react";
import { Context } from "../store/appContext";

export const Protected = ()=>{
    const {store} = useContext(Context)
    return <h1>{`Welcome ${store.user.name} you can see this page because you logged in!`}</h1>
}