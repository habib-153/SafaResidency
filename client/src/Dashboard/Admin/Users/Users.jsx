



import { useEffect, useState } from 'react';

import '../../../Shared/style.css'
// import axios from 'axios';

const PaymentHistory = () => {
    // const { state, setState, user } = useAuth()
    
    // const [filter, setFilter] = useState('');
    // const [error, setError] = useState(null);

    const [participants, setParticipants] = useState([])
    // const [sort, setSort] = useState('')
    // const axiosSecure = useAxiosSecure()

    // const {
    //     isLoading,
    //     refetch,
    // } = useQuery({
    //     queryKey: [],
    //     queryFn: async () => {
    //         const { data } = await axiosSecure(`/participants`)
    //         // setParticipants(data)
    //         return data
    //     },
    // // })
    // useEffect(() => {
    //     try {
    //         axiosSecure.get(`payment/${user.email}`)
    //             .then(data => {
    //                 setParticipants(data.data)
    //                 setState(!state)

    //             })
    //     } catch (error) {
    //         // setError(error.message);
    //         console.log(error);
    //     }
        
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [axiosSecure, refetch])

    // const pages = []
    // for (let i = 0; i < numbersOfPage; i++) {
    //     pages.push(i)
    // }
    // const pages = [...Array(numbersOfPage).keys()]




    // const handlePrev = () => {
    //     if (currentPage > 1) {
    //         setCurrentPage(currentPage - 1)
    //         refetch()
    //     }
    // }
    // const handleNext = () => {
    //     if (currentPage < numbersOfPage) {
    //         setCurrentPage(currentPage + 1)
    //         refetch()
    //     }
    // }
    const handleFilter = (e) => {
        e.preventDefault();
        const filter = e.target.search.value;
        if (!filter) {
            // setError('Please enter a search term');
            return;
        }
        // setFilter(filter)
        // refetch()
    }


    // if (isLoading) return <Loadin />
    return (
        <>
            <div className='container mx-auto px-4 sm:px-8'>
               
                <div className='py-8'>
                    <div className='text-center'>
                        <h1 className='text-2xl font-bold '>
                            See all Users
                        </h1>
                        <p className=''>See your all users here</p>
                        <div className='md:flex gap-4 mx-auto w-full justify-center  text-center'>
                            <div className="text-center md:mr-20  ">
                                <form className="w-32 space-y-1 dark:text-gray-800 mx-auto" onSubmit={handleFilter}>
                                    <label htmlFor="Search" className="hidden">Search</label>
                                    <div className="relative mx-auto">
                                        <input type="search" name="search" placeholder="Search participant names..." className="w-32 py-2 pl-10 text-sm  border border-primary rounded-md sm:w-auto focus:outline-none text-black bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50 focus:dark:border-violet-600" />
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">

                                            <button type="submit" title="search" className="p-1  focus:outline-none focus:ring">
                                                <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 dark:text-gray-800 text-primary">
                                                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                                </svg>
                                            </button>
                                        </span>

                                    </div>
                                    {/* {error && <p className='text-red-700 w-full'>Error: {error}</p>} */}
                                </form>
                            </div>
                            <div>

                                {/* <Menu>
                                    <MenuHandler>
                                        <Button className="bg-primary  text-white w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200">{sort ? `${sort}` : 'Sort'}</Button>
                                    </MenuHandler>
                                    <MenuList className="bg-primary bg-opacity-45">
                                        <MenuItem value={'healthcareProfessional'}
                                            onClick={() => { setSort('healthcareProfessional'), refetch() }} className="bg-primary bg-opacity-55 text-white" >Healthcare Professional Name</MenuItem>
                                        <MenuItem value={'dateTime'}
                                            className="bg-primary bg-opacity-55 text-white" onClick={() => { setSort('dateTime'), refetch() }}
                                        > Date</MenuItem>
                                        <MenuItem value={'participantName'}
                                            className="bg-primary bg-opacity-55 text-white"
                                            onClick={() => { setSort('participantName'), refetch() }}>participant Name</MenuItem>
                                    </MenuList>
                                </Menu> */}
                            </div>
                        </div>

                    </div>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-auto'>
                            <table className='min-w-full leading-normal bg-primary text-white overflow-auto'>
                                <thead>
                                    <tr>

                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-gold border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                                        >
                                            User Name
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-gold border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                                        >
                                           User Email
                                        </th>

                                       
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-gold border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                                        >
                                             Id
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-gold border-b border-gray-200 text-white  text-left text-sm uppercase font-normal'
                                        >
                                            Last CheckIn
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {participants?.map(participant => {


                                        return <tr key={participant._id} className='border border-secondary'>

                                            <td className='px-5 py-3'>{participant.campName}</td>
                                            <td className='px-5 py-3'>{participant.campFees}</td>
                                            <td className='px-5 py-3'>{participant.payment_status}</td>
                                            <td className='px-5 py-3'>{participant.transactionId}</td>
                                            <td className='px-5 py-3'>

                                                {participant.date}


                                            </td>

                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
             
            </div>
        </>
    )
}

export default PaymentHistory