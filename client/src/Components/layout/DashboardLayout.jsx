import { Outlet } from "react-router-dom";
import Sidebar from "../../Dashboard/Sidebar";
import { Helmet } from "react-helmet";

const Dashboard = () => {
    return (
        <div className="">
             <Helmet>
        <title>{`Dashboard | Safa Residency`}</title>
       
        <meta property="og:title" content={'Dashboard | Safa Residency'} />

      </Helmet>
            <Sidebar></Sidebar>
            <div className="mt-2 lg:ml-64">
                <Outlet></Outlet>
            </div>
        </div>
    );
};
export default Dashboard;