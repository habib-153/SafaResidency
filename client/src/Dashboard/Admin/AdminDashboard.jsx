/* eslint-disable react/prop-types */
import { useState } from "react";
import { useGetAdminStatsQuery } from "../../redux/features/auth/authApi";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Progress,
} from "@material-tailwind/react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Loading from "../../Components/ui/Loading";

const AdminDashboard = () => {
  const { data: AdminStats, isLoading } = useGetAdminStatsQuery();

  const stats = AdminStats?.data;
  const [activeTab, setActiveTab] = useState("revenue");

  // Room type distribution data
  const serviceData = [
    { name: "Total Requests", value: stats?.totalServiceRequest },
    { name: "Completed", value: stats?.totalCompletedServiceRequest },
    { name: "Pending", value: stats?.totalPendingServices },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const StatCard = ({ title, value, subtext, color = "blue", percentage }) => (
    <Card className="shadow-lg">
      <CardBody>
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-2">
              {title}
            </Typography>
            <Typography variant="h3" color={color} className="font-bold">
              {value}
            </Typography>
            {subtext && (
              <Typography variant="small" color="gray" className="mt-1">
                {subtext}
              </Typography>
            )}
          </div>
          {percentage && (
            <div className="w-20 h-20">
              <Progress
                value={percentage}
                size="lg"
                color={color}
                type="circular"
              />
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );

  if (isLoading){
    return <Loading />;
  }
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with Time Range Selector */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <Typography variant="h2" color="blue-gray" className="mb-2">
            Dashboard Overview
          </Typography>
          <Typography variant="paragraph" color="gray">
            Monitor your hotel&apos;s key metrics
          </Typography>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={`$${stats?.totalIncome.toLocaleString()}`}
          //subtext="15% increase from last month"
          color="green"
        />
        <StatCard
          title="Total Bookings"
          value={stats?.totalBookings}
          //subtext={`${stats?.averageStayDuration} days avg. stay`}
          color="purple"
        />
        <StatCard
          title="Total Users"
          value={stats?.totalUsers}
          subtext="2 new users this week"
          color="orange"
        />
        <StatCard
          title="Total Staff"
          value={stats?.totalStaffs}
          color="orange"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue & Bookings Chart */}
        <Card className="shadow-lg">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="p-4"
          >
            <Typography variant="h4" color="blue-gray">
              Revenue & Bookings Overview
            </Typography>
            <Tabs value={activeTab} className="mt-4">
              <TabsHeader>
                <Tab value="revenue" onClick={() => setActiveTab("revenue")}>
                  Revenue
                </Tab>
                <Tab value="bookings" onClick={() => setActiveTab("bookings")}>
                  Bookings
                </Tab>
              </TabsHeader>
            </Tabs>
          </CardHeader>
          <CardBody className="px-4 pb-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats?.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey={activeTab === "revenue" ? "revenue" : "bookings"}
                    stroke="#2196f3"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="occupancy"
                    stroke="#4CAF50"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        {/* Room Distribution Chart */}
        <Card className="shadow-lg">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="p-4"
          >
            <Typography variant="h4" color="blue-gray">
              Room Type Distribution
            </Typography>
          </CardHeader>
          <CardBody className="px-4 pb-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats?.roomData}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats?.roomData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Service Requests Chart */}
      <Card className="shadow-lg mb-8">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="p-4"
        >
          <Typography variant="h4" color="blue-gray">
            Service Requests Overview
          </Typography>
        </CardHeader>
        <CardBody className="px-4 pb-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceData}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats?.roomData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminDashboard;