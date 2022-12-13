import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Api from "../api/plannetApi";
import Nav from "../Utill/Nav";
import PlanList from "./PlanList";
import Swal from 'sweetalert';
import { useBeforeunload } from "react-beforeunload";

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
    div {
        width: 100%;
        padding: 10px 30px;
    }
    .btnbox {
        height: 90px;
        line-height: 70px;
        position: relative;
        i {
            font-size: 22px; 
            vertical-align: middle;
            transition: all .1s ease-in;
        }
        button.back {
            font-weight: 300;
            font-size: 16px; 
            vertical-align: middle;
            background: none;
            border: none;
            transition: all .1s ease-in;
            cursor: pointer;
        }
        button.save {
            cursor: pointer;
            font-weight: 600;
            float: right;
            font-size: 16px;
            padding: 8px 35px;
            border-radius: 25px;
            background-color: #333;
            color: white;
            border: none;
            transition: all .1s ease-in;
            &:hover{background-color: #666;
                color: #888;}
        }       
    }
    .btnbox:last-of-type {
        height: 50px;
    }
    .btnbox:first-of-type:hover i, .btnbox:first-of-type:hover button {
        color: #bbb;
    }
    .sub_box {
        h2 {
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 900;
        }
    }
    .write_box {
        padding: 20px;
        width: 100%;
        background-color: #f9f9f9;
        border-radius: 5px;
    }
    .plan_it {
        height: 370px;
        .write_box {
            height: 300px;
            padding-bottom: 0;
        }
        ul {height: 230px;
            overflow-y: scroll;
                &:focus {outline: none;}
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
        }
        li {
            line-height: 33px; 
            margin-bottom: 5px; 
            border-bottom: 2px solid #f5f5f5;
            transition: all .1s ease-in;
            &:focus-within {
                border-bottom-color: #4555AE;
            }
            button {
                display: block;
                float: right;
                padding-right: 0;
                i {
                    font-size: 18px; 
                    line-height: 30px; 
                    color: #bbb;
                    transition: all .1s ease-in;
                }
                &:hover i {
                    color: #4555AE;
                }
            }
        }
        button {
            border: none;
            padding-right: 20px; 
            background: none;
            font-size: 16px; 
            color: #bbb;
            font-weight: 700;
            transition: all .1s ease-in;
            &:hover, &:hover i {color: #888;}
            i {
                font-size: 16px; 
                line-height: 48px; 
                color: #bbb;
                transition: all .1s ease-in;
            }
        }
        input, span {vertical-align: middle;}
        input[type="text"], span {
            width: 400px;
            border: none;
            background: none;
            padding: 0px;
            overflow: hidden;
            line-height: 16px;
            display: inline-block;
            outline: none;
        }
    }
    .diary {
        height: 350px;
        .write_box {
            height: 280px;
            textarea {
                line-height: 1.4;
                width: 765px;
                height: 240px;
                border: none;
                resize: none;
                background: none;
                overflow-y: scroll;
                &:focus {outline: none;}
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
            }
        }
    }
    hr {
        border: none;
         background: #ddd;
        height: 2px; 
    }
    .defaultPlanColor {
        color:#333;
    }
    .firstPlanColor {
        color: #bbb;
    }
    .donePlan {
        color: #bbb;
        text-decoration: line-through;
    }
`;
const Write = () => {
//    window. = (event) =>{
//        event.preventDefault();
//        if(event){
//            console.log('if문 안');
//            console.log(event);
//            Swal({
//                title : "저장이 되지 않습니다!",
//                text : "저장이 되지 않습니다 뒤로 가시겠습니까?",
//                icon : "warning",
//                buttons : {
//                    bnt1 : {
//                        text : "No",
//                        value : "NoBack"
//                    },
//                    bnt2 : {
//                        text : "Yes",
//                        value : "goBack"
//                    }
//                },
//            })
//            .then((value) => {
//                switch(value) {
//                    case "NoBack" :
//
//                        break;
//                    case "goBack" :
//                        break;
//                }
//            });
//        };
//        console.log("뒤로가기");
//    };

    window.addEventListener('beforeunload', (event) => {
        // 표준에 따라 기본 동작 방지
        event.preventDefault();
        // Chrome에서는 returnValue 설정이 필요함
        event.returnValue = '';
    });

    const navigate = useNavigate();
    const getId = window.localStorage.getItem("userId");
        const { date } = useParams();
        const [planList, setPlanList] = useState([]);
        const [diary, setDiary] = useState();

        const onChangeDiary = (e) => {
            setDiary(e.target.value);
        }
        const onClickAddList = () => {
            const nextPlanList = planList.concat({
                key: planList.length+1,
                checked: false,
                text: "일정을 입력해주세요.",
                deleted: false
            });
            setPlanList(nextPlanList);
        }

        useEffect(() => {
            const writeLoad = async() => {
                try{
                    const response = await Api.writeLoad(getId, date);
                    console.log(response.data[0]);
                    setPlanList(response.data[0]);
                    setDiary(response.data[1]);
                } catch(e){
                    console.log(e);
                }
            }
            writeLoad();
            console.log(planList);
        },[getId, date]);

    const onClickSave = async() => {
        await Api.writeSave(getId, date, planList, diary);
        navigate("/home");
    }
    return (
        <Wrap>
            <Nav/>
            <Section>
                <div className="btnbox">
                    <button className="back" onClick={onClickSave}>
                        <i className="bi bi-chevron-compact-left"/>{date}
                    </button>
                </div>
                <div className="plan_it sub_box">
                    <h2>Plan it</h2>
                    <div className="write_box">
                        <PlanList planList={planList} setPlanList={setPlanList}/>
                        <hr/>
                        <button onClick={onClickAddList}>
                            <i className="bi bi-plus-lg"></i> 추가하기
                        </button>
                    </div>
                </div>
                <div className="diary sub_box">
                    <h2>Diary</h2>
                    <div className="write_box">
                        <textarea maxLength={800} onChange={onChangeDiary} value={diary}></textarea>
                    </div>
                </div>
                <div className="btnbox">
                    <button className="save" onClick={onClickSave}>SAVE</button>
                </div>
            </Section>
            <div className="copy">&#169; Plannet.</div>
            
        </Wrap>
    );
}

export default Write;