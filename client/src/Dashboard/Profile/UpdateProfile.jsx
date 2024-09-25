/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import auth from "../../utils/firebase.config";
import { updateProfile } from "firebase/auth";


const UpdateProfile = ({user}) => {

    const handleUpdate = e => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photoURL = form.get('photoURL');
         
            return updateProfile(auth.currentUser, {
                displayName: `${name || user?.name}`, photoURL: `${photoURL || user?.image}`
            })
                // .then(() => {
                 
                // })
                // .catch((error) => {
                   
                //     console.log(error);
                   
                // });
        



    }


    return (
        <div>
            <div className="flex flex-col w-full max-w-md p-12 space-y-4  bg-primary bg-opacity-45 text-center dark:bg-gray-50 dark:text-gray-800 mx-auto text-black">
                <h1 className="text-3xl font-semibold">Update your Profile</h1>

                <form noValidate="" action="" className="space-y-6" onSubmit={handleUpdate}>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="username" className="block font-bold  dark:text-gray-600">User Name</label>
                        <input type="text" name="name" id="name" placeholder="Name" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600 text-black" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="photoURL" className="block dark:text-gray-600 font-bold ">Photo URL</label>
                        <input type="text" name="photoURL" id="photoURL" placeholder="photoURL" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600 text-black" />
                        <div className="flex justify-end text-xs dark:text-gray-600">

                        </div>
                    </div>
                    <Button className="mt-6  btn" fullWidth type="submit">
                        Update Profile
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;