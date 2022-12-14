import styled from 'styled-components';

const Friends = styled.div`
    overflow-y: scroll;
    width: 100%;
    height: calc(100% - 80px);
    border-radius: 5px;
    background-color: #f9f9f9;
    transition: all .5s ease-in;
    margin-top: 10px;
    text-align: center;
    &::-webkit-scrollbar {
        display: none;
    }
    p.nothing{
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        color: #d9d9d9;
        b{
            color: #d9d9d9;
            font-size: 17px;
        }
    }
    ul>p{
        margin-top: 10px;
        color: #bbb;
        font-size: 12px;
    }
    li{
        height: 70px;
        background-color: #f9f9f9;
        border-radius: 5px;
        padding: 10px 25px;
        position: relative;
        margin-bottom: 5px;
        transition: all .3s ease-in;
        &:hover {
            background-color: #f4f4f4;
            i {
                color: #888;
            }
            >div{
                border: 3px solid #a5c6ff;
            }
        }
        >div{
            transition: all .3s ease-in;
            width: 50px;
            height: 50px;
            position: absolute;
            overflow: hidden;
            border-radius: 50px;
            border: 3px solid #ebebeb;
            >img{
                width: 46px;
            }
        }
        p{
            text-align: left;
            position: absolute;
            left: 90px;
            top: 16px;
            width: 350px;
            span:first-child{
                font-size: 16px;
                font-weight: 700;
                margin-right: 5px;
            }
            span:last-child{
                color: #bbb;
            }
            &:last-of-type{
            top: 38px;
            color: #888;
            }
        }
    }        
    .unfriend_btn{
        transition: all .3s ease-in;
        cursor: pointer;
        position: absolute;
        font-size: 30px;
        color: #f9f9f9;
        right: 30px;
        top: 50%;
        transform:translateY(-50%);
    }
    .scalFriend_btn {
        font-size: 20px;
        float: right;
    }
`;

const FriendList = ({setCommnet,setModalHeader,setModalOpen,friendList,isAdd,setOption, isPage}) => {

    // 친구삭제 버튼 팝업(수정해야함)
    const onClickUnfriend = (e) => {
        setOption(e);
        setCommnet("친구를 삭제하시겠습니까?</br>(삭제 시 상호 삭제됩니다)");
        setModalHeader("친구삭제");
        setModalOpen(true);
    }
// 친구 추가?
    const onClickSCalfriend = () => {

    }

    return (
        <Friends className={(friendList? 'is_list' : '') + ' ' + (isAdd? 'add_active_box' : '')}>
            {friendList? 
            <ul>
                {friendList.map(e =>{return(
                    <li>
                        <div><img src={"https://plannetmanager5.s3.ap-northeast-2.amazonaws.com/" + e.proImg} alt="profileImg" /></div>
                        <p>
                            <span>{e.nickname}</span>
                            <span>&#35;{e.userCode}</span>
                        </p>
                        <p>{e.profile}</p>
                        {isPage === "친구삭제" && <i className="bi bi-x-lg unfriend_btn" onClick={() => onClickUnfriend(e.key)}></i>}
                        {isPage === "공유캘린더" && <i className="bi bi-plus-lg scalFriend_btn" onClick={onClickSCalfriend}></i>}

                    </li>
                );})}
                {isPage === "친구추가" && <p>더 많은 친구를 추가해보세요!</p>}
            </ul>
            :
            <p className='nothing'><b>등록된 친구가 아직 없습니다.</b><br/>상단 오른쪽의 버튼을 눌러 친구를 추가해보세요!</p>}
        </Friends>
    );
}

export default FriendList;