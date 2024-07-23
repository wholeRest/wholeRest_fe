import { Outlet } from "react-router-dom"
import {Header} from '../components/Header';
import {Footer} from '../components/Footer'


function RootLayout_after(){
    return(
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}


function RootLayout_MyInfo(){
    return(
        <>
            <Outlet />
            <Footer />
        </>
    )
}


export {RootLayout_after, RootLayout_MyInfo}