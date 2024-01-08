import './App.css';
import { Routes, Route, useNavigationType, useLocation } from 'react-router-dom';

import { useEffect } from "react";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Joinmain from "./pages/Joinmain";
import Findidpw from "./pages/Findidpw";
import JoinShipper1 from "./pages/Join-Shipper1";
import JoinShipper2 from "./pages/Join-Shipper2";
import JoinShipper3 from "./pages/Join-Shipper3";
import ShipperList from "./pages/Shipper-List";
import ShipperDetail from "./pages/Shipper-Detail";
import ShipperMain from "./pages/Shipper-Main";

import JoinCarrier1 from "./pages/Join_Carrier1";
import JoinCarrier2 from "./pages/Join_Carrier2";
import JoinCarrier3 from "./pages/Join-Carrier3";
import CarrierMain from "./pages/Carrier-Main";
import CarrierCar from "./pages/Carrier-Car";

import Consent1 from "./pages/Consent1";
import Consent2 from "./pages/Consent2";
import Consent3 from "./pages/Consent3";
import Consent4 from "./pages/Consent4";
import Consent5 from "./pages/Consent5";

import CarrierAIselect from "./pages/CarrierAIselect";
import Receipt from "./pages/Receipt";

import TestRegister from "./pages/TestRegister";
import CargoRegi from "./pages/CargoRegi";
import CargoRegiAI from "./pages/CargoRegiAI";

import PostList from "./pages/post/PostList"; // 게시판 목록
import PostView from "./pages/post/PostView"; // 게시판 상세보기
import PostCreate from "./pages/post/PostCreate"; // 게시판 게시글 작성
import PostModify from "./pages/post/PostModify"; // 게시판 게시글 수정

import Chat from "./pages/Chat"; // 채팅 페이지

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
            <Route path="/Joinmain/Findidpw" element={<Findidpw />} />
            <Route path="/Shipper/1" element={<JoinShipper1 />} />
            <Route path="/Shipper/2" element={<JoinShipper2 />} />
            <Route path="/Shipper/3" element={<JoinShipper3 />} />
            <Route path="/Shipper/List" element={<ShipperList />} />
            <Route path="/Shipper/Detail/:id" element={<ShipperDetail />} />
            <Route path="/Shipper/Main" element={<ShipperMain />} />

            <Route path="/Carrier/1" element={<JoinCarrier1 />} />
            <Route path="/Carrier/2" element={<JoinCarrier2 />} />
            <Route path="/Carrier/3" element={<JoinCarrier3 />} />
            <Route path="/Carrier/Main" element={<CarrierMain />} />
            <Route path="/Carrier/Car" element={<CarrierCar />} />

            <Route path="/Consent/1" element={<Consent1 />} />
            <Route path="/Consent/2" element={<Consent2 />} />
            <Route path="/Consent/3" element={<Consent3 />} />
            <Route path="/Consent/4" element={<Consent4 />} />
            <Route path="/Consent/5" element={<Consent5 />} />

            <Route path='/post/view/:id' element={<PostView />} />
            <Route path='/Post' element={<PostList />} />
            <Route path='/Post/Create' element={<PostCreate />} />
            <Route path='/Post/Modify/:id' element={<PostModify />} />

            <Route path="/Carrier/AIselect/:id" element={<CarrierAIselect />} />
            <Route path="/Receipt/:id" element={<Receipt />} />

            <Route path='/Chat' element={<Chat />} />

            <Route path="/test-register" element={<TestRegister />} />
            <Route path="/CargoRegi" element={<CargoRegi />} />
            <Route path="/CargoRegiAI" element={<CargoRegiAI />} />


        </Routes>
    );
}
export default App;
