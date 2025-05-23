import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    createRoutesFromElements,
    Route,
    ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import FavoriteList from "./pages/FavoriteList/FavoriteList";
import {Success} from "./constants/Success";
import {Order} from "./pages/Order/Order";
import {Profile} from "./pages/Infor/Profile";
import ProtectedRoute from "./route/ProtectedRoute";


const Layout = () => {
    return (
        <div>
            <Header/>
            <HeaderBottom/>
            <SpecialCase/>
            <ScrollRestoration/>
            <Outlet/>
            <Footer/>
            <FooterBottom/>
        </div>
    );
};
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Layout/>}>
                {/* ==================== Header Navlink Start here =================== */}
                <Route index element={<Home/>}></Route>
                <Route path="/shop" element={<Shop/>}></Route>
                <Route path="/about" element={<About/>}></Route>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/favorite" element={<FavoriteList/>}></Route>
                    <Route path="/order" element={<Order/>}></Route>
                    <Route path="/success" element={<Success/>}></Route>
                    <Route path="/cart" element={<Cart/>}></Route>
                    <Route path="/profile" element={<Profile/>}></Route>
                </Route>
                {/* ==================== Header Navlink End here ===================== */}
                <Route path="/offer" element={<Offer/>}></Route>
                <Route path="/product/:id" element={<ProductDetails/>}></Route>
                <Route path="/paymentgateway" element={<Payment/>}></Route>
            </Route>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/signin" element={<SignIn/>}></Route>
        </Route>
    )
);

function App() {
    return (
        <div className="font-bodyFont">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;