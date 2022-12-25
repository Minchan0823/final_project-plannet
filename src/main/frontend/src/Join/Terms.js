import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as LogoImg } from "../Images/plannet-001.svg";
import styled from "styled-components";
import Api from "../api/plannetApi";
import Modal from '../Utill/Modal';
import "../App";
import "./Join.scss"

const ContainerTerms = styled.div`
    height: 100vh;
    display:flex ;
    justify-content:center;
    align-items: center;
    flex-direction: column;
    background-color: white;
`;
const Logo = styled.div`
    margin-top: -30px;
    a {
        font-family: 'Comfortaa', cursive;
        font-size: 67px;
        font-weight: bold;
        color: #4555AE;
    }
`;
const AgreeBox = styled.div`
    width: 780px;
    margin: 20px auto;
    border-radius : 5px;
    border: solid #eeeeee;
    margin-bottom: 20px;
    justify-content:center;
    align-items: center;
    .check {
        margin-right: 0;
        width : 100%;
        padding: 5px 20px;
        border-radius : 5px;
        margin: 5px 0;
        .text_box {
            width: 100%;
            height: 140px;
            resize: none;
            word-break: break-all;
            overflow-x: hidden;
            font-size: 13px;
            line-height: 1.3;
            padding: 5px;
            margin: 5px 0;
        }
        &:first-child {padding-top: 20px;}
    }
    .check2 {height : 50px; padding-left: 20px;}
`;
const Button = styled.button`
    border: none;
    margin: 20px 0;
    width: 150px;
    height: 40px;
    font-size: 18px;
    font-weight: 600;
    background-color: #4555AE;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    padding: 10px;
    &:hover {background-color: rgb(55, 67, 134); color: #eee;}
`;

const Terms = () => {
    // 하위 메뉴 새로고침
    const navigate = useNavigate();
    // 약관동의 체크박스 기능 구현
    const [allCheck, setAllCheck] = useState(false); // 모두 체크, 기본값은 체크안된상태
    const [serviceCheck, setServiceCheck] = useState(false); // 서비스 이용약관 체크 // 필수
    const [userCheck, setUserCheck] = useState(false); // 개인정보 처리방침 체크// 필수
    const [marketingCheck, setMarketingCheck] = useState(false); // 마케팅 체크
    const [optInCheckList, setOptInCheckList] = useState([]); // 수신 동의한 마케팅 방식 리스트
    const [marketingEmailCheck, setMarketingEmailCheck] = useState(false); // 이메일
    const [marketingSMSCheck, setMarketingSMSCheck] = useState(false); // SMS

    // 전체동의 체크하면 모든 항목 체크됨
    // 전체동의 체크 해제하면 모든 항목 체크 취소됨
    const allBtnEvent = (e) => {
        setAllCheck(e.target.checked);
        setServiceCheck(e.target.checked);
        setUserCheck(e.target.checked);
        setMarketingCheck(e.target.checked);
        setMarketingEmailCheck(e.target.checked);
        setMarketingSMSCheck(e.target.checked);
    };

    // 서비스 이용약관 체크
    const serviceBtnEvent = (e) => {
        if(e.target.checked === false) setAllCheck(false);
        else {
        }
        setServiceCheck(e.target.checked);
    };

    // 개인정보 처리방침 체크
    const userBtnEvent = (e) => {
        if(e.target.checked === false) setAllCheck(false);
        setUserCheck(e.target.checked);
    };

    // 마케팅 동의 체크
    const marketingBtnEvent = (e) => {
        if(e.target.checked === false) {
            setAllCheck(false);
            setMarketingEmailCheck(false);
            setMarketingSMSCheck(false);
        }
        setMarketingCheck(e.target.checked);
    };

    const marketingEmailBtnEvent = (e) => {
        if(e.target.checked === false) setAllCheck(false);
        setMarketingEmailCheck(e.target.checked);
        setMarketingCheck(true);
    };

    const marketingSMSBtnEvent = (e) => {
        if(e.target.checked === false) setAllCheck(false);
        setMarketingSMSCheck(e.target.checked);
        setMarketingCheck(true);
    };

    // 이메일, SMS가 모두 체크 해제되면 마케팅도 체크 해제
    useEffect(() => {
        if(marketingEmailCheck === false && marketingSMSCheck === false) {
            setMarketingCheck(false)
        } else {
            setAllCheck(true)
        }
    }, [marketingEmailCheck, marketingSMSCheck]);

    // 모든 세부 항목 체크되면 전체동의가 자동으로 체크됨
    useEffect(() => {
        if(serviceCheck === true && userCheck === true && marketingCheck === true && marketingEmailCheck === true && marketingSMSCheck === true ) {
            setAllCheck(true)
        } else {
            setAllCheck(false)
        }
    }, [serviceCheck, userCheck, marketingCheck, marketingEmailCheck, marketingSMSCheck]);

    // 필수 항목 모두 체크했을 때만 회원가입 버튼 눌리게 하기
    // 필수 항목 중 하나라도 체크 안하면 모달창 띄우기
    const [modalOpenSignUp, setModalOpenSignUp] = useState(false); // 회원가입 버튼 눌렀을 때
    const closeModalSignUp = () => {
        setModalOpenSignUp(false);
    }
    const istrue = async () => {
        if(serviceCheck === true && userCheck === true ){
            setOptInCheckList(optInCheckList.push(marketingEmailCheck, marketingSMSCheck));
            navigate("/join", {state: {optIn:optInCheckList}});
        } else {
            setModalOpenSignUp(true);
        }
    }

    return(
        <ContainerTerms id="terms">
            <Logo><LogoImg width="90px" viewBox="30 150 430 220"/><Link to="/" className="logo">Plannet</Link></Logo>
            <AgreeBox>
                <div>
                    <div className='check'>
                        <div className='text'><label><input type="checkbox" checked={serviceCheck} onClick={serviceBtnEvent}/> 서비스 이용 약관에 동의합니다.<b>(필수)</b></label></div>
                        <textarea className='text_box'>Plannet 서비스 이용 약관동의

                        제 1조 (목적)

                        이 약관은 주식회사 Plannet(이하 "회사"라 합니다)이 운영, 제공하는 서비스의 이용과 관련하여 “회사”와 “회원”과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.

                        제 2조 (용어의 정의)

                        이 약관에서 사용하는 용어의 정의는 다음 각 호와 같으며, 정의되지 않은 용어에 대한 해석은 관계 법령과 회사의 이용약관 및 개인정보취급방침, 회사가 별도로 정한 지침 등의 상관례에 의합니다. "서비스"라 함은 회사가 PC와 모바일 환경에서 제공하는 슈프라이즈 서비스 및 관련 제반 서비스를 말합니다. "회원"이라 함은 회사의 "서비스"에 접속하여 이 약관에 따라 "회사"와 이용계약을 체결하고 "회사"가 제공하는 "서비스"를 이용하는 고객을 말합니다. "게시물"이라 함은 "회원"이 "서비스"를 이용함에 있어 "서비스"상에 게시한 문자, 음성, 음향, 화상, 동영상 등의 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 의미합니다. "회원정보"라 함은 “서비스”를 이용하는 고객이 등록한 정보를 말합니다.

                        제 3조 (약관의 명시, 효력 및 변경)

                        1. "회사"는 이 약관의 내용을 "회원"이 쉽게 알 수 있도록 “서비스” 초기 화면에 게시합니다. 2. "회사"가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 제1항의 방식에 따라 그 개정약관의 적용일자 7일 전부터 공지합니다. 다만, "회원"에게 불리한 내용으로 약관을 개정하는 경우에는 그 적용일자 30일 전부터 공지 외에 "회원정보"에 등록된 이메일 등 전자적 수단을 통해 별도로 명확히 통지하도록 합니다. 3. "회사"가 전항에 따라 "회원"에게 통지하면서 공지 기간 이내에 거부의사를 표시하지 않으면 승인한 것으로 본다는 뜻을 명확하게 고지하였음에도 “회원”이 명시적으로 거부의사를 밝히지 않거나, "서비스"를 이용할 경우에는 "회원"이 개정약관에 동의한 것으로 봅니다. 4. "회원"이 개정약관에 동의하지 않는 경우 "회사"는 개정약관의 내용을 적용할 수 없으며, 이 경우 회원은 제8조 제1항의 규정에 따라 이용계약을 해지할 수 있습니다.

                        제 4조 (약관의 해석)

                        "회사"는 개별 서비스에 대해서 별도의 이용약관 및 정책(이하 "개별 약관 등")을 둘 수 있으며, 해당 내용이 이 약관과 상충할 경우에는 "개별 약관 등"이 우선하여 적용됩니다. 이 약관에 명시되지 않은 사항은'약관의 규제에 관한 법률'(이하 "약관법"), ‘전자상거래 등에서의 소비자보호에 관한 법률’(이하 "전자상거래법"), ‘정보통신망이용촉진및정보보호등에관한법률’(이하 “정보통신망법”), 공정거래위원회가 정하는 전자상거래 등에서의 소비자보호지침(이하 “소비자보호지침”) 및 관계 법령 또는 상관례에 따릅니다.

                        제 5조 (이용계약의 체결)Red

                        1. 이용계약은 "회원"이 되고자 하는 자(이하 "가입신청자")가 약관의 내용에 대하여 동의를 한 후 회원가입신청을 하고 "회사"가 이러한 신청에 대하여 승낙함으로써 체결됩니다. "회사"는 "가입신청자"의 신청에 대하여 서비스 이용을 승낙함을 원칙으로 합니다. 다만, "회사"는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나, 사후에 이용계약을 해지할 수 있습니다. 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우 타인의 명의를 도용하여 이용신청을 하는 경우 허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우 14세 미만 아동이 회원가입 시 법정대리인(부모 등)의 동의를 얻지 아니한 경우 이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우 2. "회사"는 “서비스” 관련 설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다. 3. 회원가입신청의 승낙을 하지 아니하거나 유보한 경우, "회사"는 원칙적으로 이를 "가입신청자"에게 알리도록 합니다. 4. 이용계약의 성립 시기는 "회사"가 가입완료를 신청절차 상에서 표시한 시점으로 합니다. 5. "회사"는 "회원"에 대해 회사정책에 따라 등급별로 구분하여 이용시간, 이용횟수, 서비스 메뉴 등을 세분하여 이용에 차등을 둘 수 있습니다.

                        제 6조 ("회원"의 "아이디" 및 "비밀번호"의 관리에 대한 의무)

                        1. "회원"의 "아이디"와 "비밀번호"에 관한 관리책임은 "회원"에게 있으며, 이를 제3자가 이용하도록 하여서는 안 됩니다. 2. "회사"는 "회원"의 "아이디"가 개인정보 유출 우려가 있거나, 반사회적 또는 미풍양속에 어긋나거나 회사 및 회사의 운영자로 오인한 우려가 있는 경우, 해당 "아이디"의 이용을 제한할 수 있습니다. 3. "회원"은 "아이디"및 "비밀번호"가 도용되거나 제3자가 사용하고 있음을 인지한 경우에는 이를 즉시 "회사"에 통지하고 "회사"의 안내에 따라야 합니다. 4. 제3항의 경우에 해당 "회원"이 "회사"에 그 사실을 통지하지 않거나, 통지한 경우에도 "회사"의 안내에 따르지 않아 발생한 불이익에 대하여 "회사"는 책임지지 않습니다.

                        제 7조 (이용제한 등)

                        1. "회사"는 "회원"이 이 약관의 의무를 위반하거나 "서비스"의 정상적인 운영을 방해한 경우, 경고, 일시정지, 영구이용정지 등으로 "서비스" 이용을 단계적으로 제한할 수 있습니다. 2. "회사"는 전항에도 불구하고, '주민등록법'을 위반한 명의도용 및 결제도용, '저작권법'을 위반한 불법프로그램의 제공 및 운영방해, "정보통신망법"을 위반한 불법통신 및 해킹, 악성프로그램의 배포, 접속권한 초과행위 등과 같이 관련법을 위반한 경우에는 즉시 영구이용정지를 할 수 있습니다. 본 항에 따른 영구이용정지 시 "서비스" 이용을 통해 획득한 혜택 등도 모두 소멸되며, "회사"는 이에 대해 별도로 보상하지 않습니다. 3. "회사"는 본 조의 이용제한 범위 내에서 제한의 조건 및 세부내용은 본 약관 또는 이용제한정책 및 개별 서비스 상의 운영정책에서 정하는 바에 의합니다. 4. "회원"은 본 조에 따른 이용제한 등에 대해 "회사"가 정한 절차에 따라 이의신청을 할 수 있습니다. 이 때 이의가 정당하다고 "회사"가 인정하는 경우 "회사"는 즉시 "서비스"의 이용을 재개합니다.

                        제 8조 (계약해제, 해지 등)

                        1. "회원"은 언제든지 고객센터 또는 홈페이지 하단 탈퇴문의 등을 통하여 이용계약 해지 신청을 할 수 있으며, "회사"는 관련법 등이 정하는 바에 따라 이를 즉시 처리하여야 합니다. 2. "회원"이 계약을 해지할 경우, 관련법 및 개인정보취급방침에 따라 "회사"가 회원정보를 보유하는 경우를 제외하고는 해지 즉시 "회원"의 모든 데이터는 소멸됩니다. 3. "회원"이 계약을 해지하는 경우, "회원"이 작성한 "게시물" 중 메일, 블로그 등과 같이 본인 계정에 등록된 게시물 일체는 삭제됩니다. 다만, 타인에 의해 담기, 스크랩 등이 되어 재게시되거나, 공용게시판에 등록된 "게시물" 등은 삭제되지 않으니 사전에 삭제 후 탈퇴하시기 바랍니다.

                        제 9조 ("서비스"의 이용)

                        1. "회사"는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영상 상당한 이유가 있는 경우 "서비스"의 제공을 일시적으로 중단할 수 있습니다. 이 경우 "회사"는 제23조에 정한 방법으로 "회원"에게 통지합니다. 다만, "회사"가 사전에 통지할 수 없는 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다. 2. "회사"는 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 정기점검시간은 서비스제공화면 등에 공지한 바에 따릅니다. 3. "회원"이 공개한 "게시물"은 "서비스"를 통해 전체 “회원”, 관련 제반 서비스에 공유될 수 있으며, “회사”는 해당 “게시물”을 “서비스”의 홍보, 안내 등의 목적으로 사용할 수 있습니다.

                        제 10조 ("서비스"의 내용)

                        1. 정보 서비스 “회사”가 제공하는 일정관리 정보, 회원정보 등 “회원”의 기록을 모아 각 “회원”이 신속하고 편리하게 이용하도록 하기 위하여 제공하는 서비스를 말합니다. 3. 기타 정보 서비스 홈페이지 이외에 “회사”가 제공하는 서비스를 통하여 “회원”에게 온라인으로 제공하는 정보서비스, 커뮤니티등의 인터넷 서비스를 말합니다.

                        제 11조 ("서비스"의 변경 및 중지)

                        1. "회사"는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 "서비스"를 제한, 변경하거나 중지할 수 있습니다. 2. "회사"는 제1항에 의한 서비스 중단의 경우에 인터넷 등에 사전 공지하거나 제23조("회원"에 대한 통지)에 정한 방법으로 "회원"에게 통지합니다. 3. "서비스"의 내용, 이용방법, 이용시간에 대하여 변경이 있는 경우에는 변경사유, 변경될 “서비스”의 내용 및 제공일자 등은 그 변경 전에 해당 “서비스” 초기화면에 게시 합니다. 4. "회사"는 무료로 제공되는 “서비스”의 일부 또는 전부를 “회사”의 정책 및 운영의 필요상 수정, 중단, 변경할 수 있으며, 이에 대하여 관련법에 특별한 규정이 없는 한 "회원"에게 별도의 보상을 하지 않습니다.

                        제 12조 ("게시물"의 저작권)

                        1. "회원"은 저작권 관련 규정을 준수하기 위해 충분한 주의를 기울여야만 합니다. 만약 “회원”이 등록한 게시물이 제 3자의 저작권을 침해한 경우, 민형사상 모든 책임은 “회원” 당사자에게 있으며, 이와 관련해서 회사는 어떠한 책임도 지지 않습니다. 2. “회원”는 "서비스"를 이용함으로써 얻은 정보 중 "회사"에게 지적재산권이 귀속된 정보를 "회사"의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제 3자에게 이용하게 하여서는 안됩니다. 3. "회사"는 "회원"이 작성한 각종 게시물을 판촉, 홍보 등의 목적으로 “서비스”에서 사용하는 것 외에도 “서비스” 제공에 필요한 범위에서 타 사이트에 복제, 배포, 전송, 전시할 수 있으며, 본질적인 내용에 변경을 가하지 않는 범위 내에서 수정, 편집될 수 있습니다. 4. "회사"가 작성한 저작물에 대한 저작권 및 기타 지적 재산권은 "회사"에 귀속합니다.

                        제 13조 ("게시물"의 관리)

                        1. "회원"의 "게시물"이 "전자상거래법", "정보통신망법" 및 "저작권법"등 관련법에 위반되는 내용을 포함하는 경우, 권리자는 관련법이 정한 절차에 따라 해당 "게시물"의 게시중단 및 삭제 등을 요청할 수 있으며, "회사"는 관련법에 따라 조치를 취하여야 합니다. 2. "회사"는 전항에 따른 권리자의 요청이 없는 경우라도 권리침해가 인정될 만한 사유가 있거나 기타 “회사” 정책 및 관련법에 위반되는 경우에는 관련법에 따라 해당 "게시물"에 대해 임시조치 등을 취할 수 있습니다 3. 본 조에 따른 세부절차는 "전자상거래법", "정보통신망법" 및 "저작권법"이 규정한 범위 내에서 "회사"가 정한 "게시중단요청서비스"에 따릅니다.

                        제 14조 (권리의 귀속)

                        1. "서비스"에 대한 저작권 및 지적재산권은 "회사"에 귀속됩니다. 단, "회원"의 "게시물" 및 제휴계약에 따라 제공된 저작물 등은 제외합니다. 2. "회사"는 서비스와 관련하여 "회원"에게 "회사"가 정한 이용조건에 따라 계정, "아이디", "포인트" 등을 이용할 수 있는 이용권한만을 부여하며, "회원"은 이에 대한 양도, 판매, 담보제공 등의 처분행위를 할 수 없습니다. 3. “회사”가 "서비스"를 제공함에 사용되는 보안 기술이나 소프트웨어에 대해 “회원”은 회피 또는 변경하려 시도를 하여서는 안되며, “서비스” 및 이에 필요한 기술 또는 소프트웨어를 부정 사용 및 타인이 그렇게 하는 것을 조장하는 행위 등은 금지되어 있습니다. 만약 "회원"이 그와 같은 행위를 하는 경우 이에 대한 모든 책임은 "회원" 본인에게 있습니다.

                        제 15조 ("회원"의 의무)

                        1. "회원"은 다음 행위를 하여서는 안 됩니다. 타인의 정보도용 "회사"에 게시된 정보의 변경 "회사"가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시 "회사"와 기타 제3자의 저작권 등 지적재산권에 대한 침해 "회사" 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 "회사"에 공개 또는 게시하는 행위 “회사”의 동의 없이 영리를 목적으로 서비스를 사용하는 행위 기타 불법적이거나 부당한 행위 2. "회원"은 관련법령, 본 약관의 규정, 이용안내 및 "서비스"와 관련하여 공지한 주의사항, "회사"가 통지하는 사항 등을 준수하여야 하며, 기타 "회사"의 업무에 방해되는 행위를 하여서는 안 됩니다.

                        제 16조 ("회사"의 의무)

                        1. "회사"는 관련법과 이 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 계속적이고 안정적으로 "서비스"를 제공하기 위하여 최선을 다하여 노력합니다. 2. "회사"는 "회원"이 안전하게 "서비스"를 이용할 수 있도록 개인정보(신용정보 포함)보호를 위해 보안시스템을 갖추어야 하며 개인정보보호정책을 공시하고 준수합니다. 3. "회사"는 서비스이용과 관련하여 "회원"으로부터 제기된 의견이나 불만이 정당하다고 인정할 경우에는 이를 처리하여야 합니다. “회원”이 제기한 의견이나 불만사항에 대해서는 게시판을 활용하거나 전자우편 등을 통하여 "회원"에게 처리과정 및 결과를 전달합니다.

                        제 17조 (개인정보보호 의무)

                        "회사"는 이용계약 체결 과정에서 가입신청자의 이메일 주소 등의 정보를 수집할 수 있으며, “회사”는 "개인정보보호법” 등 관계 법령이 정하는 바에 따라 "회원"의 "개인정보"를 보호하기 위해 노력합니다. "개인정보"의 보호 및 사용에 대해서는 관련법 및 "회사"의 개인정보보호정책이 적용됩니다.

                        제 18조 ("회원"에 대한 통지)

                        1. "회사"가 "회원"에 대한 통지를 하는 경우 이 약관에 별도 규정이 없는 한 "회원"이 지정한 전자우편주소, 서비스 내 전자메모 및 쪽지 등으로 할 수 있습니다. 2. "회사"는 "회원" 전체에 대한 통지의 경우 7일 이상 "회사"의 게시판에 게시함으로써 제1항의 통지에 갈음할 수 있습니다.

                        제 19조 (부적절 행위)

                        1. "회사"는 "서비스"를 이용하는 선량한 “회원”를 보호하기 위한 목적으로 본 약관에서 명시한 사항들과 관련법령 및 상거래의 일반 원칙을 위반하는 부적절 행위를 행한 “회원”에게 “서비스”의 이용에 대한 제재를 가할 수 있으며, 민형사상의 책임까지 물을 수 있습니다. 2. "회원"이 다음의 사유에 해당하는 부적절 행위를 한 경우 "회사"는 사전 통보없이 해당 "회원" 이 등록한 내용을 삭제조치하고 "회원"의 “서비스” 이용을 제한하거나 “회원” 자격을 상실시킬 수 있습니다. "서비스"에 허위정보 등록 과대,과장 광고 (스팸성 홍보글, 도배행위 등) "회사"의 승인을 구하지 않은 상업성 광고 (개인사업자,법인의 자사홍보등) 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 "서비스"에 공개 또는 게시하는 행위 "회사"와 기타 제3자의 저작권 등 지적재산권에 대한 침해 “회사" 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위 회사의 동의 없이 영리를 목적으로 서비스를 사용하는 행위 시스템의 오류를 회사에 알리지않고 해당 오류를 이용해 이득을 취하는 행위(동일 전화번호로 인증을 반복하여 포인트를 취하는 행위 등) 타인의 전화번호 또는 이메일을 도용하거나 허위로 이메일을 기재하여 이득을 취하는 행위 기타 불법적이거나 부당한 행위 "회사"가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시 기타 "회사"가 필요하다고 판단하는 경우

                        제 20조 (미성년자의 청약철회 및 환불에 관한 사항)

                        "회원"이 만 19세 미만의 미성년자인 경우, 유료 결제 서비스를 이용하고자 하는 경우에는 부모 등 법정대리인의 동의를 얻어야 하며, 그렇지 않은 경우에는 미성년자 본인 또는 법정대리인이 그 계약을 취소할 수 있습니다.

                        제 21조 (회사의 면책 등)

                        1. “회사”는 “회원”들에게 온라인 발매정보를 제공하는 것을 “서비스”의 내용으로 합니다. 2. 회사”는 천재지변 또는 이에 준하는 불가항력, 정보통신설비의 보수점검, 교체 또는 고장, 통신의 두절 등으로 인하여 일시적 또는 종국적으로 서비스를 제공할 수 없는 경우, “서비스” 제공에 관한 책임이 면제됩니다. 이 경우 “회사”는 “회사”가 제공하는 인터넷사이트 화면에 게시하거나 기타의 방법으로 회원들에게 통지합니다. 3. “회사”는 인터넷 이용자 또는 “회원”의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다. 4. 회원”이 자신의 개인정보를 타인에게 유출 또는 제공함으로써, 발생하는 피해에 대해서 “회사”는 일체의 책임을 지지 않습니다. 5. “회사”는 다음과 같은 사항으로부터 발생하는 손해에 대해 책임을 지지 아니합니다. “회원” 상태 정보의 허위 또는 부정확성에 기인하는 손해 그 성질과 경위를 불문하고 "서비스"에 대한 접속 및 "서비스"의 이용과정에서 발생하는 개인적인 손해 서버에 대한 제3자의 모든 불법적인 접속 또는 서버의 불법적인 이용으로부터 발생하는 손해 서버에 대한 전송 또는 서버로부터의 전송에 대한 제3자의 모든 불법적인 방해 또는 중단행위로부터 발생하는 손해 제3자가 "서비스"를 이용하여 불법적으로 전송, 유포하거나 또는 전송, 유포되도록 한 모든 바이러스, 스파이웨어 및 기타 악성 프로그램으로 인한 손해 전송된 데이터의 오류 및 생략, 누락, 파괴 등으로 발생되는 손해 "서비스" 이용 과정에서 발생하는 명예훼손 기타 불법행위로 인한 각종 민형사상 책임 “회사”는 적법한 권리자의 요구가 있는 경우에는 정보를 삭제하거나 수정할 수 있으며, “회원”는 이로 인한 손해배상을 회사에 청구할 수 없습니다. 기타 관련 법령 및 “회사”에서 제공한 이용약관 및 개별약관의 변경, 공지사항 등의 주시의무를 게을리하여 발생한 ”회원”의 피해에 대해서 “회사”는 책임을 지지 않습니다.

                        제 22조 (기타)

                        1. 본 약관에 대해서는 대한민국법을 준거법으로 하고, 대한민국 법원이 관할권을 갖는 것으로 합니다. 2. “회사”와 “회원” 간 발생한 분쟁에 관한 소송은 제소 당시의 “회원”의 주소에 의하고, 주소가 없는 경우 거소를 관할하는 지방법원의 전속관할로 합니다. 단, 제소 당시 “회원”의 주소 또는 거소가 명확하지 아니한 경우의 관할법원은 민사소송법에 따라 정합니다. 해외에 주소나 거소가 있는 고객의 경우 “회사”와 “회원”간 발생한 분쟁에 관한 소송은 대한민국 서울중앙지방법원을 관할 법원으로 합니다.

                        공고일자: 2020년 6월 10일
                        시행일자: 2020년 6월 10일</textarea>
                    </div>
                    <div className='check'>
                        <div className='text'><label><input type="checkbox" checked={userCheck} onClick={userBtnEvent}/> 개인정보 이용 약관에 동의합니다.<b>(필수)</b></label></div>
                        <textarea className='text_box'>(주)Plannet('https://www.plannet.shop/'이하 '회사') 는 고객의 개인정보보호를 소중하게 생각하고, 고객의 개인정보를 보호하기 위하여 항상 최선을 다해 노력하고 있습니다. 회사 는 「개인정보보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」을 비롯한 모든 개인정보보호 관련 법률규정을 준수하고 있습니다.
                        1. 수집하는 개인정보의 항목 및 수집방법

                        개인정보 수집에 대한 동의

                        회사 는 개인정보 수집,이용 동의에 대해 「동의합니다」 를 클릭할 수 있는 절차를 마련하고 있으며, 「동의합니다」 버튼을 클릭하면 개인정보 수집에 대해 동의한 것으로 봅니다.

                        "회사 "가 "서비스" 이용과 관련하여 수집하는 개인정보의 범위는 아래와 같습니다.



                        회원가입 시

                        [필수입력사항]

                        아이디
                        비밀번호
                        이름
                        닉네임
                        이메일
                        전화번호



                        서비스 이용 또는 사업처리 과정에서 아래와 같은 정보들이 생성되어 수집될 수 있습니다.

                        - 서비스이용기록, 접속로그, 쿠키, 접속IP정보, 이용정지기록

                        개인 정보의 수집 방법은 아래와 같습니다.

                        ① 전화를 통한 문의하기

                        ② 서비스 이용 기록 수집 툴을 통한 수집

                        ③ 본인인증을 통한 회원정보 제공



                        2. 개인정보의 수집 및 이용목적

                        회사 는 본 조 제 1항의 수집 정보를 다음과 같은 목적을 위하여 사용합니다.

                        ① 서비스 이용에 따른 본인식별, 가입의사 확인

                        ② 고지사항 전달, 불만처리 의사소통 경로 확보 제공을 위한 정보확인

                        ③ 회사 가 주관하는 전반적인 운영 관리

                        ④ 멤버십 혜택 제공 및 마케팅 커뮤니케이션 맞춤화



                        3. 개인정보의 목적 외 사용 및 제3자에 대한 제공 및 공유

                        회사 는 본 처리방침에서 고지한 범위 내에서만 회원의 개인정보를 사용합니다.

                        회사 는 회원의 개인정보를 사전 동의 없이 외부에 제공하지 않습니다. 다만, 다음은 예외로 합니다.

                        1) 회원이 사전에 동의한 경우

                        회사 는 회원의 개인정보를 제3자에게 제공하기 이전에 다음의 모든 사항을 회원에게 알리고 동의를 받습니다.

                        (1) 개인정보를 제공받는 자

                        (2) 개인정보를 제공받는 자의 개인정보 이용 목적

                        (3) 제공하는 개인정보의 항목

                        (4) 개인정보를 제공받는 자의 개인정보 보유 및 이용 기간

                        (5) 동의를 거부할 권리가 있다는 사실 및 동의 거부에 따른 불이익이 있는 경우에는 그 불이익의 내용

                        2) 관계법률의 규정에 의거하거나, 수사목적으로 관계법률에서 정한 절차와 방법에 따라 수사기관이 개인정보 제공을 요구하는 경우

                        3) 영업의 양수 등

                        영업의 양수 등에 관한 사유가 발생하여 회원의 개인정보 이전이 필요한 경우, 회사 는 정보통신망 이용 촉진 및 정보보호에 관한 법률 등 관계법률에서 규정한 절차와 방법에 따라 개인정보 이전에 관한 사실 등을 사전에 고지하며, 회원에게는 개인정보 이전에 관한 동의 철회권을 부여합니다.


                        4. 개인정보 처리 업무의 위탁

                        회사 는 서비스 향상을 위해 고객의 개인정보를 외부에 위탁하여 처리하고 있으며, 관계법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록 규정하고 있습니다.

                        현재, 회사 는 개인정보처리 수탁자와 그 업무의 내용은 다음과 같습니다.

                        수탁자

                        위탁업무내용

                        제공하는 정보

                        AWS

                        서비스제공을 위한 시스템 운영

                        회원정보



                        5. 개인정보의 보유 및 이용기간

                        회사 가 회원님의 개인정보를 수집하는 경우 그 보유기간은 회원가입 하신 후 해지 (탈퇴신청, 직권탈퇴 포함)시까지 입니다. 또한 해지 시 회사 는 회원님의 개인정보를 즉시 파기하며 개인정보가 제3자에게 제공된 경우에는 제3자에게도 파기하도록 지시합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.

                        ① 보존 항목 : 고객 정보, 서비스 이용기록, 접속 IP 정보

                        ② 보존 근거 : 고객님의 탈퇴기록, 수사기관 협조 등에 이용하기 위하여 보존함

                        ③ 보존 기간 : 3개월

                        관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사 는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.

                        ① 방문에 관한 기록 : 3개월 (통신비밀보호법)

                        ② 회사 는 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 제29조 및 시행령 제16조에 따라 휴면회원의 경우 다음과 같이 처리합니다.

                        - 미이용 기준 : 당사 서비스에 대한 로그인 일자기준

                        - 유효기간 : 1년

                        - 휴면회원 처리에 대한 안내 : 30일 이전 메일을 통한 안내

                        - 휴면회원에 대한 개인정보 처리 : 분리 보관조치

                        - 분리 보관 정보 : 회원정보 등

                        - 분리 보관 정보에 대한 보존 기간 : 5년후 식별정보만 남기고 비식별화 조치(개인을 특정할 수 있는 정보는 삭제)

                        - 계정활성화 : 고객님의 요청에 의거 계정활성화 조치 실시



                        6. 개인정보의 파기 절차 및 방법

                        회사 또는 그로부터 개인 정보를 제공받은 제3자는 개인 정보의 수집 목적 또는 제공받은 목적을 달성한 때에는 아래와 같은 방법과 절차로 당해 개인 정보를 지체 없이 파기 및 삭제합니다.

                        회원가입정보의 경우 : 회원탈퇴 하거나 회원에서 제명된 때

                        ①파기절차

                        "이용자"가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져 (종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 (보유 및 이용기간 참조) 일정 기간 저장된 후 파기됩니다. 별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유 되어지는 이외의 다른 목적으로 이용되지 않습니다.

                        ② 파기방법

                        전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.



                        7. 개인정보의 자동 수집 장치의 설치/운영 및 그 거부에 관한 사항

                        상기 개인 정보 외에 "서비스"는 쿠키(Cookie)와 픽셀 태그(Pixel Tag)를 통해 접속자를 인식하며 아래의 목적으로 쿠키를 사용합니다. (쿠키는 웹 사이트 또는 웹 사이트의 서비스 제공자가 "이용자"의 컴퓨터내의 웹 브라우저로 전송하는 작은 텍스트 파일을 말하며, 이 파일들은 웹 사이트 또는 서비스 제공자의 시스템이 "이용자"의 웹 브라우저를 인식하고 특정 정보를 저장하고 기억하도록 합니다. 픽셀 태그는 "이용자"에게 전자우편을 보냈을 때 정형화된 포맷으로 전달하며 "이용자"가 언제 읽었는지 알려주는 작은 그래픽 이미지입니다.)

                        ① "이용자"의 “서비스” 방문 시 이용한 컨텐츠를 기억하여 "이용자"에게 향상된 "서비스" 환경 제공

                        ② "서비스"의 방문 traffic의 분석 및 "서비스"의 이용 행태 파악.

                        ③ 필요에 따라 제3자와의 계약을 통해 "서비스" 방문 traffic 분석에 활용.

                        "이용자"는 본인이 이용하는 컴퓨터의 웹 브라우저에서 쿠키 수집 시 경고 창이 뜨도록 하거나, 쿠키 기능을 중지할 수 있습니다. (자세한 사항은 웹 브라우저의 '도움말'이나 'Help' 기능을 참조하십시오) 만약 쿠키를 중지시킬 경우 이 기능을 통해 이용 가능했던 "서비스" 내의 여러 컨텐츠나 기능을 이용할 수 없으며 "서비스"가 제대로 구동하지 않을 수 있습니다.



                        8. 이용자 및 법정대리인의 권리와 그 행사방법

                        "이용자"는 언제든지 회사 가 보유한 자신 혹은 당해 만 14세 미만 아동의 개인 정보에 대해 열람 및 오류 정정 및 동의 철회를 요구할 수 있으며 회사 는 이에 대해 필요한 조치를 취할 의무를 집니다.

                        회사 가 개인정보의 수집을 위해 "이용자"의 동의를 받아야 하는 경우에는 개인 정보 관리 책임자의 신원 (소속, 성명 및 전화번호, 기타 연락처), 정보의 수집 목적 및 이용 목적, 제 3자에 대한 정보 제공 관련 사항 (제공 받은 자, 제공 목적 및 제공할 정보의 내용)등 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등의 요구하는 사항을 명시하거나 고지해야 하며 "이용자"는 언제든지 이 동의를 철회할 수 있습니다.

                        이와 관련한 각종 문의 및 요청은 서비스 담당자(plannet_corp@naver.com)에게 메일을 보내 변경 및 열람을 신청 하셔야 합니다.

                        회원 정보는 로그인 후 회원 정보 페이지 상에서 "이용자"가 직접 자신 혹은 당해 만 14세 미만 아동의 개인 정보를 변경 또는 열람할 수 있습니다.

                        "이용자"의 법정 대리인이 "이용자"의 개인 정보의 열람 및 변경을 원할 경우 서비스 담당자(plannet_corp@naver.com)에게 메일로 문의하시고 서비스 담당자의 지시에 따라 법정 대리인임을 증명할 자료 및 증표를 제시 하셔야 합니다.



                        9. 정보주체와 법정대리인의 권리의무 및 행사방법
                        ① 정보주체는 회사 에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.

                        1. 개인정보 열람요구

                        2. 오류 등이 있을 경우 정정 요구

                        3. 삭제요구

                        4. 처리정지 요구

                        ② 제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.

                        ③ 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.

                        ④ 제1항에 따른 권리 행사는 정보주체 및 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 서비스 담당자의 지시에 따라 법정 대리인임을 증명할 자료 및 증표를 제시 하셔야 합니다.



                        10. 개인정보 열람청구 ,정정 ,삭제 ,처리정지 요청 방법

                        정보주체는 개인정보 보호법 제35조부터 제37조에 따른 개인정보의 열람청, 정정, 삭제, 처리정지를 아래의 부서에 할 수 있습니다. 회사 는 정보주체의 개인정보 열람청구, 정정, 삭제, 처리정지가 신속하게 처리되도록 노력하겠습니다.

                        이와 관련한 각종 문의 및 요청은 "서비스" 사이트 (http://www.plannet.shop/)의 서비스 담당자(plannet_corp@naver.com)에게 메일로 신청하셔야 합니다.

                        ▶ 개인정보 열람청구, 정정, 삭제, 처리정지 접수 처리 부서

                        담당자 : 이예빈

                        연락처 :  010-1234-5678, plannet_corp@naver.com



                        11. 광고성 정보 전송의 제한

                        회사 는 회원의 명시적인 수신거부 의사에 반하여 영리목적의 광고성 정보를 전송하지 않습니다.

                        회원이 뉴스레터 등 전자우편 전송에 대한 동의를 한 경우 전자우편의 제목란 및 본문란에 다음 사항과 같이 회원이 쉽게 알아 볼 수 있도록 조치합니다.

                        ① 전자우편의 제목란 : (광고)라는 문구를 제목에 표시하고, 전자우편 본문란의 주요 내용을 표시합니다.

                        ② 전자우편의 본문란 : 수신거부의 의사표시를 할 수 있는 전송자의 명칭, 전자우편주소, 전화번호 및 주소를 명시하며 수신 거부의 의사를 쉽게 표시할 수 있는 방법 및 회원이 동의를 한 시기 및 내용을 명시합니다.

                        ③ 팩스, 휴대폰 문자전송 등 전자우편 이외의 문자전송을 통해 영리목적의 광고성 정보를 전송하는 경우에는 전송내용 처음에 (광고)라는 문구를 표기하고 전송내용 중에 전송자의 연락처를 명시하도록 조치합니다.

                        ④ 회원은 영리목적의 광고성 정보를 전송 받은 경우 언제든지 이에 대해 수신거부의 의사표시를 할 수 있고, 회사 는 즉각 전송중단의 조치를 취한 후 이를 회원에게 알립니다.



                        12. 도용된 개인정보에 대한 조치

                        이용자가 타인의 개인정보를 도용하여 회원가입 등을 하였음을 알게 된 때에는 지체 없이 해당 아이디에 대한 서비스 이용정지 또는 회원탈퇴 등 필요한 조치를 취합니다.

                        자신의 개인정보 도용을 인지한 이용자가 해당 아이디에 대해 서비스 이용정지 또는 회원탈퇴를 요구하는 경우에는 즉시 조치를 취합니다.

                        ※ 이때 개인정보가 도용됨을 주장하는 이용자의 본인 확인방법으로는 전자정부에서 시행하는 주민등록증 진위확인 서비스를 이용합니다.

                        기타 개인정보에 관한 상담이 필요한 경우에는 개인정보침해신고센터, 대검찰청 인터넷범죄수사센터, 경찰청 사이버테러대응센터 등으로 문의하실 수 있습니다.

                        ① 개인정보침해신고센터

                        - 전화 : 118

                        - URL : http://privacy.kisa.or.kr

                        ② 개인정보 분쟁조정위원회

                        - 전화: 1833 – 6972

                        - URL : http://www.kopico.go.kr

                        ③ 대검찰청 사이버안전국

                        - 전화 : 국번없이 1301

                        - URL : http://www.spo.go.kr

                        ④ 경찰청 사이버안전국

                        - 전화 : 국번없이 182

                        - URL : http://cyberbureau.police.go.kr



                        13. 개인정보 보호를 위한 기술적, 관리적 보호대책

                        회사 는 이용자들의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적/관리적 보호대책을 강구하고 있습니다.

                        ① 내부관리계획 수립∙시행

                        회사 는 개인정보의 분실도난유출위조변조 또는 훼손되지 아니하도록 내부 의사결정 절차를 통하여 내부 관리계획을 수립시행하고 있습니다.

                        ②개인정보의 암호화

                        이용자의 비밀번호는 일방향 암호화하여 저장 및 관리되고 있으며, 개인정보의 확인 및 변경은 비밀번호를 알고 있는 본인에 의해서만 가능합니다. 비밀번호는 이용자의 생일, 전화번호 등 타인이 추측하기 쉬운 숫자 등을 이용하지 않도록 비밀번호 생성규칙을 수립하여 적용하고 있습니다. 개인정보는 안전한 암호 알고리즘으로 암호화되어 저장 및 관리되고 있습니다.

                        ③해킹 등에 대비한 대책

                        회사 는 해킹 등 회사 정보통신망 침입에 의해 이용자의 개인정보가 유출되는 것을 방지하기 네트워크 관련 보안 장비 등을 운영하고 있으며, 개인정보는 암호화 통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전송할 수 있도록 하고 있습니다.

                        ④개인정보 취급자의 최소화 및 교육

                        회사 는 회사의 개인정보 취급자를 최소한으로 제한하며, 개인정보 취급자에 대한 교육 등 관리적 조치를 통해 개인정보보호의 중요성을 인식시키고 있습니다.

                        ⑤접근통제

                        개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.

                        ⑥물리적 안전조치

                        회사 는 전산실, 자료보관실 등 개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 있으며, 이에 대한 출입통제 절차를 수립∙운영하고 있습니다.

                        회사 는 이용자 개인의 실수나 기본적인 인터넷의 위험성 때문에 일어나는 일들에 대해 책임을 지지 않습니다. 회사 는 회원 개개인이 본인의 개인정보를 보호하기 위해서 자신의 ID 와 비밀번호를 적절하게 관리하고 여기에 대한 책임을 져야 합니다.

                        그 외 내부 관리자의 실수나 기술관리 상의 사고로 인해 개인정보의 상실, 유출, 변조, 훼손이 유발될 경우 회사 는 즉각 회원께 사실을 알리고 적절한 대책과 보상을 강구할 것입니다.



                        14. 개인정보보호책임자

                        회사 의 개인 정보는 다음의 담당자가 책임을 맡고 있습니다.

                        담당자 성명 : 이예빈

                        부서명 : (주) Plannet

                        전화번호 :  010-1234-5678

                        E-Mail : plannet_corp@naver.com



                        15. 개인정보처리방침변경

                        현 개인정보 처리방침은 2022년 06월 21일부터 적용됩니다. 내용의 추가, 삭제 및 수정이 있을 시에는 개정 최소 7일전(중요한 사항이 변경되는 경우는 최소 30일전)부터 웹사이트의 공지사항을 통하여 고지할 것입니다. 만일, 개인정보의 수집 및 활용, 제3자 제공 등이 변경되어 동의가 필요한 경우에는, 별도 동의 절차를 마련하여 진행할 것입니다. 또한 개인정보보호정책에 버전번호 및 개정일자 등을 부여하여 개정여부를 쉽게 알 수 있도록 하고 있습니다.



                        개인정보처리방침 버전번호 : v.1.1

                        개인정보처리방침 변경공고일자 : 2022-06-14

                        변경 개인정보처리방침 시행일자 : 2022-06-21</textarea>
                    </div>
                    <div className='check2'>
                        <div className='text'>
                                <label>
                                    <input type="checkbox" checked={marketingCheck} onClick={marketingBtnEvent} id="id1"/> 마케팅 활용 약관에 동의합니다.(선택) (&nbsp;
                                        <label><input type="checkbox" checked={marketingEmailCheck} onClick={marketingEmailBtnEvent}/> 이메일&nbsp;</label>
                                        <label><input type="checkbox" checked={marketingSMSCheck} onClick={marketingSMSBtnEvent}/> SMS )</label>
                                </label>
                        </div>
                    </div>
                </div>
            </AgreeBox>
            <div><label><input type="checkbox" checked={allCheck} onClick={allBtnEvent} /><b> 전체 약관에 동의합니다.</b></label></div>
            <Button onClick={istrue} className="lastBtn">다음단계</Button>
            {/* 모달 */}
            {modalOpenSignUp && <Modal open={modalOpenSignUp} close={closeModalSignUp} header="확인">필수 항목을 모두 체크해주세요.</Modal>}
        </ContainerTerms>
    );
}

export default Terms;