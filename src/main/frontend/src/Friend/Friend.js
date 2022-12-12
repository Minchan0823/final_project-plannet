import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Nav from '../Utill/Nav';
import FriendList from './FriendList';
import FriendAdd from './FriendAdd';
import Api from "../api/plannetApi";
import Modal from '../Utill/Modal';
import FriendNoti from './FriendNoti';
import { useNavigate } from 'react-router-dom';

const Wrap = styled.div`
    width: 1130px;
    height: 100vh;
    background-color: white;
    margin: 0 auto;
`;
const Section = styled.div`
    width: 850px;
    height: calc(100vh - 40px);
    float: left;
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        width: 20px;
        padding: 15px;
    }
    &::-webkit-scrollbar-thumb {
        height: 30%; /* 스크롤바의 길이 */
        background: #ddd; /* 스크롤바의 색상 */
        border-radius: 10px;
        border: 7px solid transparent;
        background-clip: padding-box;
    }
    &::-webkit-scrollbar-track {
        background: none;
        /*스크롤바 뒷 배경 색상*/
    }
    .friend, .noti {
        height: 550px;
        height: 100%;
        float: left;  
        padding: 10px 30px 10px 0;
        h2{
          margin-top: 35px;
        }
    }
    .friend {
        width: 70%;
        padding-left: 30px;     
    }
    .noti {
        width: 30%;
        >div:first-of-type {
            width: 100%;
            height: calc(100% - 130px);
            background-color: #f9f9f9;
            border-radius: 5px;
            border: 2px solid #f9f9f9;
            overflow: hidden;
            &::-webkit-scrollbar {
                display: none;
            }
        }
        >div:last-of-type {
            margin-top: 10px;
            height: 50px;
            border-radius: 25px;
            text-align: center;
            color: white;
            font-size: 18px;
            line-height: 50px;
            background-color: #333;
            transition: all .1s ease-in;
            cursor: pointer;
            i{
                color: white;
                font-size: 24px;
                vertical-align: middle;
                transition: all .1s ease-in;
            }
            &:hover{
                background-color: #666;
                color: #888;
            }
            &:hover i{
                color: #888;
            }
        }
    }
    h2 {
        font-size: 28px;
        font-weight: 900;
        margin-bottom: 10px;
        position: relative;
        i{
            position: absolute;
            right: 0;
            font-size: 25px;
            line-height: 34px;
            transition: color .3s ease-in;
            &:hover {
                color: #555;
            }
        }        
    }
    .add_active_logo{
        color: #888;
    }
    .is_list{
        background-color: white !important;
    }
    .add_active_box{
        height: calc(100% - 160px) !important;
    }
    .add_active_addbox{
        height: 80px !important;
    }
`;

const Friend = () => {
    const navigate = useNavigate();
    const getId = window.localStorage.getItem("userId");
    const [friendList, setFriendList] = useState([
        {key: 1, proImg: "https://images.unsplash.com/photo-1668603145974-c05f7a0e4552?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80", nickname: "안녕하세요", userCode: "0000", profile: "자기소개입니다"}, 
        {key: 2, proImg: "https://images.unsplash.com/photo-1669847171248-8f12c8160d57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80", nickname: "안녕하세요", userCode: "0000", profile: "자기소개입니다"}]);
    const [notiList, setNotiList] = useState([
        {key: 3, nickname: "ㅇㅇㅇ", userCode: "0000", desc: "공유캘린더 초대"}, 
        {key: 4, nickname: "ㅇㅇㅇ", userCode: "0000", desc: "친구 요청"}
    ]);
    const [isAdd, setIsAdd] = useState(false);
    const [option, setOption] = useState("");

    useEffect(() => {
        const personalHome = async() => {
            try{
                const response = await Api.personalHome(getId);
            } catch(e){
            console.log(e);
            }
        }
        personalHome();
    },[getId]);

    
    const onClickaddFriend = (e) => {
        if(isAdd) setIsAdd(false);
        else setIsAdd(true);
    }

    const onClickaddSCal = () => {
        navigate("/scal/create");
    }

    const [comment, setCommnet] = useState("");
    const [modalHeader, setModalHeader] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    
    const closeModal = () => {
        setModalOpen(false);
    };
    

    return (
        <Wrap>
            <Modal open={modalOpen} close={closeModal} header={modalHeader} option={option}><p dangerouslySetInnerHTML={{__html: comment}}></p></Modal>
            <Nav/>
            <Section>
                <div className="friend">
                    <h2>Friend<i className={'bi bi-person-fill-add ' + (isAdd? 'add_active_logo' : '')} onClick={onClickaddFriend}></i></h2>
                    <FriendAdd setCommnet={setCommnet} setModalHeader={setModalHeader} setModalOpen={setModalOpen} isAdd={isAdd} />
                    <FriendList setCommnet={setCommnet} setModalHeader={setModalHeader} setModalOpen={setModalOpen} friendList={friendList} isAdd={isAdd} setOption={setOption}/>
                </div>
                <div className='noti'>
                    <h2>Notification</h2>
                    <FriendNoti notiList={notiList} setOption={setOption}/>
                    <div onClick={onClickaddSCal}>공유캘린더 생성하기<i className="bi bi-chevron-compact-right"/></div>
                </div>
            </Section>
            <div className="copy">&#169; Plannet.</div>
        </Wrap>
    );
}

export default Friend;


