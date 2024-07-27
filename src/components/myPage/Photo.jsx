import styled from 'styled-components';

const PhotoBox = styled.div`
    background-color: white;
    box-shadow: 0px 2px 3px gray;
    border: none;
    border-radius: 10px;
    padding: 10px;
    margin: 15px;
    width: 85%;
    height: max-content;
    max-height: 500px;
`;

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 15px 5px; 
    margin-bottom: 10px;
`;

const Header = styled.div`
    font-size: 15px;
    font-family: Consolas, monospace;
    font-weight: bold;
    margin-left: 7px;
`;

const HeaderImg = styled.img`
    width: 23px;
    height: 23px; 
`;

const PhotoContainer = styled.div`
    display: flex;
`;

const PhotoTable = styled.button`
    width: 33%;
    border: solid 2px rgb(210, 201, 193);
    border-radius: 15px;
    margin: 5px; 
    height: 120px; 
    border-radius: 13px;
    background: url("src/image/myPage/photoContentImg.png") no-repeat center center; 
    background-size: 25px 25px;
    cursor: pointer;
`;

const Photo = () => {
    return (
        <PhotoBox>
            <HeaderContainer>
                <HeaderImg src="src/image/myPage/photoHeaderImg.png" alt="Header" />
                <Header>TODAY'S PHOTO</Header>
            </HeaderContainer>
            
            <PhotoContainer>
                <PhotoTable onClick={() => alert("Photo button clicked!")} />
                <PhotoTable onClick={() => alert("Photo button clicked!")} />
                <PhotoTable onClick={() => alert("Photo button clicked!")} />
            </PhotoContainer>
        </PhotoBox>
    );
};

export default Photo;
