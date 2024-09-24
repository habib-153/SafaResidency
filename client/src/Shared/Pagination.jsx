/* eslint-disable react/prop-types */
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import './style.css';
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/features/filter/filterSlice";

const Pagination = ({ numbersOfPage }) => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.filter.page);

    const pages = [];
    for (let i = 0; i < numbersOfPage; i++) {
        pages.push(i);
    }

    const handlePrev = () => {
        if (currentPage > 1) {
            dispatch(setPage(currentPage - 1));
        }
    };

    const handleNext = () => {
        if (currentPage < numbersOfPage) {
            dispatch(setPage(currentPage + 1));
        }
    };

    return (
        <div>
            <div>
                <div className="flex justify-center space-x-1 px-2 dark:text-gray-800 pagination">
                    <button title="previous" type="button" className="w-8 h-8 py-0 px-2 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100 bg-[#ece07f]" onClick={handlePrev}>
                        <GrFormPrevious className='text-2xl text-black'></GrFormPrevious>
                    </button>
                    {
                        pages.map(page => (
                            <button
                                key={page}
                                onClick={() => { dispatch(setPage(page + 1)) }}
                                type="button"
                                title={`Page ${page + 1}`}
                                className={currentPage === page + 1 ? 'selected' : ''}
                            >
                                {page + 1}
                            </button>
                        ))
                    }
                    <button title="next" type="button" onClick={handleNext} className="px-2 text-center mx-auto w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100 bg-[#ece07f] ">
                        <GrFormNext className='text-2xl text-black'></GrFormNext>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;