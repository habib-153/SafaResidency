/* eslint-disable no-unused-vars */
import { useCreateRoomMutation, useGetAllRoomQuery } from "../../redux/features/room/roomApi";

const Room = () => {
    const {data, isLoading} = useGetAllRoomQuery(undefined)  // ekta room near jonno undefined er jaygay room er _id pass korte hobe
    const [createRoom] = useCreateRoomMutation()  // data near por ......... createRoom()   ...........call korle post hoye jabe... delete and update same , delete and update perameter pass kora lagbe ......
    return (
        <div>
            
        </div>
    );
};

export default Room;