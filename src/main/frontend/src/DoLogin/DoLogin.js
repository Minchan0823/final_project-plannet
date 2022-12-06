import React, {useState} from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as LogoImg } from "../Images/planet-001.svg";
import kakaoimg from "../Images/kakaotalk_logo2.png";
import naverimg from "../Images/btnG_아이콘사각.png";
import googleimg1 from "../Images/google-logo.png";
import Api from "../api/plannetApi";
import Modal from '../Utill/Modal';
import "./DoLogin.scss"
import "../App";

const ContainerLogin = styled.div`
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    display:flex ;
    justify-content:center;
    align-items: center;
    flex-direction: column;
    background-color: white;
`;
const Logo = styled.div`
    margin-top: -30px;
    a{
        font-size: 67px;
        font-family: 'Comfortaa', cursive;
        font-weight: bold;
        color: #4555AE;
    }
`;

const DoLogin = () => {
    // 키보드 입력
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    
    // 오류 메시지
    const [comment, setCommnet] = useState("");

     // 팝업
    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    };

    const onChangId = (e) => {
        setInputId(e.target.value)
    }

    const onChangePw = (e) => {
        setInputPw(e.target.value)       
    }

    const onClickLink = () => {
        setModalOpen(true);
        setCommnet("서비스 준비중 입니다 ...");
    }

    const onClickLogin = async() => {
        try {
            const res = await Api.userLogin(inputId, inputPw);
            if(res.data) {
                window.localStorage.setItem("isLogin", "true");
                window.localStorage.setItem("userId", inputId);
                window.location.replace("/home");
            } else {
                setCommnet("아이디 또는 비밀번호가 정확하지 않습니다.");
                setModalOpen(true);
            }
        } catch (e) {
            setCommnet(e);
            setModalOpen(true);
        }
    }

    // 로그인 할 때 아이디, 비밀번호 입력 후 엔터 키를 눌렀을 때 로그인 인식
    const onKeyPressLogin = (e) => {
        if(e.key === 'Enter'){
            onClickLogin();
        }
    }

    return (
        <div>
            <ContainerLogin>
                <Logo><LogoImg width="90px" viewBox="30 150 430 220"/><Link to="/" className="logo">Plannet</Link></Logo>
                <div className="login">
                    <button className="login-btn1" onClick={onClickLink}>
                        <img src={kakaoimg} alt="카카오로고" className="logImg"/>
                        카카오톡으로 로그인
                    </button>
                    <button className="login-btn2" onClick={onClickLink}>
                        <img src={googleimg1} alt="구글로고" className="logImg"/>
                        구글로 로그인
                        </button>
                    <button className="login-btn3" onClick={onClickLink}>
                        <img src={naverimg} alt="네이버로고" className="logImg"/>
                        네이버로 로그인
                    </button>
                </div>
                <p className="space-or">또는</p>
                <div className="login2">
                    <input type="text" id="id" name="uid" placeholder="아이디" required="" value ={inputId} onChange={onChangId}/>
                    <input type="password" id="pwd" name="upw" placeholder="비밀번호" required="" value ={inputPw} onChange={onChangePw} onKeyPress={onKeyPressLogin}/>
                    <button className="doLogin" onClick={onClickLogin}>로그인하기</button>
                    <Modal open={modalOpen} close={closeModal} header="오류">아이디 및 패스워드를 재확인해 주세요.</Modal>
                </div>
                <div className="else">
                    <Link to="/join" className="join">회원가입</Link>
                    <Link to="/find" className="join">아이디 / 비밀번호 찾기</Link>
                </div>   
                {<Modal open={modalOpen} close={closeModal} header="오류">{comment}</Modal>}     
            </ContainerLogin>
        </div>
    );
};

export default DoLogin;