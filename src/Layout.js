import { Outlet } from "react-router-dom"
import Header from "./Header"
const Layout = ({cardInfo}) => {
    return (
        <>
            <Header cardInfo={cardInfo}/>
            <main className="main">
                <Outlet />
            </main>
        </>
    )
}

export default Layout
