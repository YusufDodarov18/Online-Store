import Header from '../../app/components/Layout/Header/Header'
import Footer from "../../app/components/Layout/Footer/Footer";
import { Outlet } from 'react-router-dom'

function HomeLayout() {
    return (
        <>
          <Header/>
          <Outlet/>
          <Footer/>  
        </>
    )
}

export default HomeLayout
