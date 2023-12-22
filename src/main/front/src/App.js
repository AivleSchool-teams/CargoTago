import './App.css';
import { Routes, Route } from 'react-router-dom';

import { useEffect } from "react";
import {
    useNavigationType,
    useLocation,
} from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Joinmain from "./pages/Joinmain";
import JoinShipper1 from "./pages/Join-Shipper1";
import JoinShipper2 from "./pages/Join-Shipper2";
import JoinShipper3 from "./pages/Join-Shipper3";
import JoinShipper4 from "./pages/Join-Shipper4";
function App() {
    const action = useNavigationType();
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        if (action !== "POP") {
            window.scrollTo(0, 0);
        }
    }, [action, pathname]);

    useEffect(() => {
        let title = "";
        let metaDescription = "";

        switch (pathname) {
            case "/":
                title = "";
                metaDescription = "";
                break;
            case "/":
                title = "";
                metaDescription = "";
                break;
            case "/1":
                title = "";
                metaDescription = "";
                break;
        }

        if (title) {
            document.title = title;
        }

        if (metaDescription) {
            const metaDescriptionTag = document.querySelector(
                'head > meta[name="description"]'
            );
            if (metaDescriptionTag) {
                metaDescriptionTag.content = metaDescription;
            }
        }
    }, [pathname]);

    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Joinmain" element={<Joinmain />} />
            <Route path="/Shipper/1" element={<JoinShipper1 />} />
            <Route path="/Shipper/2" element={<JoinShipper2 />} />
            <Route path="/Shipper/3" element={<JoinShipper3 />} />
            <Route path="/Shipper/4" element={<JoinShipper4 />} />
        </Routes>
    );
}
export default App;
