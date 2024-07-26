import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './ComunityPage.css'

const CateList = styled.ul `
    width: 94%;
    background-color:  rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0px 5px 4px rgb(182, 182, 182);
    margin: 10px;
    padding: 10px 5px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    cursor: pointer;
`;

const CateItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #f1f1f1;
        border-radius: 10%;
    }

    a {
        text-align: center;
        text-decoration: none;
        color: #40300E;
        font-family: Pretendard_SemiBold;
        font-size: 10px;
    }
`;

const CateImg = styled.img`
    width: 70%
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 17px;

    span {
        display: inline-block;
        width: 7px;
        height: 7px;
        margin: 0 10px;
        background-color: #ccc;
        border-radius: 50%;
        cursor: pointer;

        &.active {
            background-color: #40300E;
        }
    }
`;

const Cate = [
    { name: '자유 게시판', path: '/board1' },
    { name: '한방', path: '/board2' },
    { name: '안과', path: '/board3' },
    { name: '치과', path: '/board4' },
    { name: '피부과', path: '/board5' },
    { name: '산부인과', path: '/board6' },
    { name: '성형외과', path: '/board7' },
    { name: '비뇨기과', path: '/board8' },
    { name: '외과', path: '/board9' },
    { name: '내과', path: '/board10' },
    { name: '신경과', path: '/board11' },
    { name: '재활의학과', path: '/board12' },
    { name: '소아청소년과', path: '/board13' },
    { name: '암센터', path: '/board14' },
    { name: '정신건강의학과', path: '/board15' },
    { name: '이비인후과', path: '/board16' },
    { name: '기타 게시판', path: '/board17' },
];

const CategoryList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const totalPages = Math.ceil(Cate.length / itemsPerPage); 

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Cate.slice(indexOfFirstItem, indexOfLastItem);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <CateList>
                {currentItems.map(cate => (
                    <CateItem key={cate.path}>
                        <CateImg src="src/image/comunityPage/categoryImg.png" />
                        <Link to={cate.path}>{cate.name}</Link>
                    </CateItem>
                ))}
            </CateList>
            <Pagination>
                {Array.from({ length: totalPages }, (_, index) => (
                    <span
                        key={index + 1}
                        className={index + 1 === currentPage ? 'active' : ''}
                        onClick={() => handleClick(index + 1)}
                    />
                ))}
            </Pagination>
        </>
    );
};

export default CategoryList;
