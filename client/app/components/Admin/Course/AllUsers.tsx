"use client";
import React, { useState, FC } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Container } from "@mui/material";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { useSocket } from "@/context/SocketProvider"; // ✅ Import Socket Context
import Header from "../Header";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const { isLoading, data } = useGetAllUsersQuery({});
  const { newUser } = useSocket(); // ✅ Get real-time new users
  const [active, setActive] = useState(false);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.33 },
    { field: "name", headerName: "Name", flex: 0.42 },
    { field: "email", headerName: "Email", flex: 0.8 },
    { field: "role", headerName: "Role", flex: 0.38 },
    { field: "courses", headerName: "Purchased", flex: 0.53 },
    { field: "created_at", headerName: "Created At", flex: 0.53 },

    {
      field: "emailUser",
      headerName: "Email",
      flex: 0.25,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => (
        <a
          href={`mailto:${params.row.email}`}
          style={{
            color: theme === "dark" ? "#3B82F6" : "#2563EB",
            textDecoration: "none",
          }}
          onClick={(e) => e.stopPropagation()}
          onMouseOver={(e) =>
            (e.currentTarget.style.color =
              theme === "dark" ? "#2563EB" : "#1E40AF")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.color =
              theme === "dark" ? "#3B82F6" : "#2563EB")
          }
        >
          <MdOutlineMarkEmailRead
            size={18}
            style={{ marginTop: "30%", marginLeft: "20%" }}
          />
        </a>
      ),
    },
  ];

  // ✅ Combine API users and real-time users
  let usersList = [...(data?.users || []), ...newUser];

  let rows: any = usersList
    .filter((item: any) => (isTeam ? item.role === "admin" : item.role !== "admin"))
    .map((item: any) => ({
      id: item._id,
      name: item.name,
      email: item.email,
      role: item.role,
      courses: item.courses.length,
      created_at: new Date(item.createdAt).toLocaleDateString(),
    }));

  return (
    <div className="w-full  flex min-h-screen dark:bg-[#151632] ">
  
    {/* Main Content */}
    <div className="w-[80%]">
  
    <Header title="All Users" subtitle="Welcome to dashboard"/>
        
    <Container maxWidth="lg" sx={{ mt: 4, p: 3 }}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <h1 className="text-2xl font-bold text-[#003366] mb-4">
            {isTeam ? "Admins" : "Users"}
          </h1>
          {isTeam && (
            <div className="w-full flex justify-end">
              <button
                className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 !w-[170px] flex items-center justify-center"
                onClick={() => setActive(!active)}
              >
                Add New Member
              </button>
            </div>
          )}
          <Box
            height="100vh"
            sx={{
              "& .MuiDataGrid-root": {
                borderRadius: "20px",
                overflow: "hidden",
                backgroundColor: theme === "dark" ? "#1E1E2F" : "#F9FAFB",
                color: theme === "dark" ? "#E0E0E0" : "#1A202C",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: theme === "dark" ? "#2C2F48" : "#E3E8F4",
                color: theme === "dark" ? "#70d8bd" : "#1A202C",
                fontWeight: "900 !important",
              },
              "& .MuiDataGrid-row": {
                borderBottom:
                  theme === "dark" ? "1px solid #444" : "1px solid #E5E7EB",
                color: theme === "dark" ? "#FFFFFF" : "#000000",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme === "dark" ? "#2C2F48" : "#E3E8F4",
                color: theme === "dark" ? "#FFD700" : "#1A202C",
              },
              "& .MuiCheckbox-root": {
                color: theme === "dark" ? "#4CAF50" : "#008CBA",
              },
            }}
          >
            <div className="w-[100%] h-[70vh]">
              <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                autoPageSize
                disableColumnResize
              />
            </div>
          </Box>
        </Box>
      )}
    </Container>
    </div>
    </div>

  );
};

export default AllUsers;
