import { Outlet } from "react-router-dom"
import { Find } from "../components/loginPage/Find.jsx"


export function FindLayout(){
    return(
        <>
            <Find />
            <Outlet />
        </>
    )
}

