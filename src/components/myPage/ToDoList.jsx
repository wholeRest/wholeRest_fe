import styled from 'styled-components';

const ToDoListBox = styled.div`
    margin: 15px;
    width: 88%;
    background-color: rgb(255, 225, 56);
    border-radius: 15px 50px 15px 15px;
    box-shadow: 0px 5px 4px rgb(182, 182, 182);
    padding: 20px 5px;
    color: #312626;
`;

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 0px 15px; 
    margin-bottom: 10px;
`;

const Header = styled.div`
    font-size: 15px;
    font-family: Consolas;
    font-weight: bold;
`;

const CheckImage = styled.img`
    width: 30px;
    height: 30px; 
`;

const ListContainer = styled.div`
    padding: 3px 15px;
    display: flex;
    align-items: center;
`;

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
    margin-right: 10px;
    accent-color: #312626; 
    width: 15px;
    height: 15px;
    margin-top: 3px; 
`;

const ListText = styled.input`
    width: 87%;
    border: none;
    font-family: Pretendard_SemiBold; 
    font-size: 14px; 
    background-color: rgb(255, 225, 56);

    &:focus {
        outline: none;
    }
`;

const Divider = styled.div`
    width: 81%;
    height: 0.5px;
    background-color: #312626;
    margin: -2px auto;
    margin-right: 26px;
    margin-bottom: 15px;
`;

const ToDoList = () => {
    return (
        <>
            <ToDoListBox>
                <HeaderContainer>
                    <CheckImage src="src/image/myPage/checkImg.png" />
                    <Header>TODAY'S TO DO LIST</Header>
                </HeaderContainer>
                <ListContainer>
                    <CheckBox /><ListText />
                </ListContainer>
                <Divider />
                <ListContainer>
                    <CheckBox /><ListText />
                </ListContainer>
                <Divider />
            </ToDoListBox>
        </>
    );
};

export default ToDoList;
