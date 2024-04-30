import {Pagination} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getAllFilteredProjectsForFreelancer} from "../../../services/project-service";

const FindJobPagePagination = ({paginationValue, setPaginationValue, setProjects, token, formData}) => {
    const [prevButton, setPrevButton] = useState(true);
    const [nextButton, setNextButton] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const serverResponseProjectsForNewPage = await getAllFilteredProjectsForFreelancer(JSON.stringify(formData), token, paginationValue.currentPage);
            setProjects(serverResponseProjectsForNewPage.listOfProjects);
        }

        fetchData();

    }, [paginationValue.currentPage]);

    useEffect(() => {
        if (paginationValue.currentPage === 1) {
            setPrevButton(true);
        } else {
            setPrevButton(false);
        }

        if (paginationValue.currentPage === paginationValue.numberOfPages) {
            setNextButton(true);
        } else {
            setNextButton(false);
        }
    }, [paginationValue.currentPage, paginationValue.numberOfPages]);

    const handleNextPagination = (e) => {
        e.preventDefault();
        const {currentPage, numberOfPages} = paginationValue;

        if (currentPage < numberOfPages) {
            setPaginationValue({...paginationValue, currentPage: currentPage + 1});
        }
    }

    const renderPaginationItems = () => {
        const { currentPage, numberOfPages } = paginationValue;
        const items = [];

        const maxVisibleButtons = 5;

        const middleButton = Math.ceil(maxVisibleButtons / 2);

        let startPage = Math.max(1, currentPage - middleButton + 1);

        let endPage = Math.min(numberOfPages, startPage + maxVisibleButtons - 1);

        if (endPage - startPage + 1 < maxVisibleButtons) {
            startPage = Math.max(1, endPage - maxVisibleButtons + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <Pagination.Item
                    onClick={handleCurrentPageButton}
                    key={i}
                    data-page={i}
                    active={i === currentPage}
                >
                    {i}
                </Pagination.Item>
            );
        }

        return items;
    }

    const handlePrevPagination = (e) => {
        e.preventDefault();
        const {currentPage} = paginationValue;

        if (currentPage > 1) {
            setPaginationValue({...paginationValue, currentPage: currentPage - 1});
        }
    }

    const handleCurrentPageButton = (e) => {
        e.preventDefault();
        const newCurrentPage = e.target.getAttribute("data-page");

        setPaginationValue({...paginationValue, currentPage: parseInt(newCurrentPage)});
    }

    return (
        <nav aria-label="Page navigation example">
            <Pagination className="justify-content-center">
                <Pagination.Prev onClick={handlePrevPagination} disabled={prevButton}/>
                {renderPaginationItems()}
                <Pagination.Next onClick={handleNextPagination} disabled={nextButton}/>
            </Pagination>
        </nav>
    )
}
export default FindJobPagePagination;