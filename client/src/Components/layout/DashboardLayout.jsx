import { Outlet } from "react-router-dom";
import Sidebar from "../../Dashboard/Sidebar";

const Dashboard = () => {
    // const { user } = useAuth()
    return (
        <div className="">
            <Sidebar></Sidebar>
            <div className="mt-8 lg:ml-64">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;