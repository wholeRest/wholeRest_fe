import { Outlet } from "react-router-dom"
import {Header} from '../components/Header';
import {Footer} from '../components/Footer'
import ScrollToTop from "./ScrollToTop";


function RootLayout_after(){
    return(
        <>
            <ScrollToTop />
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}


function RootLayout_MyInfo(){
    return(
        <>
            <ScrollToTop />
            <Outlet />
            <Footer />
        </>
    )
}


export {RootLayout_after, RootLayout_MyInfo}