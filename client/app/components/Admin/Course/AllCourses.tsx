'use client'
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Container } from "@mui/material";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme } = useTheme();
  const { isLoading, data, error } = useGetAllCoursesQuery({});

  const columns = [
    { field: "id", headerName: "ID", flex: 0.35 },
    { field: "name", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Rating", flex: 0.55 },
    { field: "purchased", headerName: "Purchased", flex: 0.55 },
    { field: "created_at", headerName: "Created At", flex: 0.55 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.25,
      sortable: false,
      disableColumnMenu: true,
      renderCell: () => (
        <Button
          variant="text"
          size="small"
          sx={{
            color: theme === "dark" ? "#4CAF50" : "#008CBA",
            "&:hover": {
              color: theme === "dark" ? "#45A049" : "#007BB5",
            },
            minWidth: "auto",
            padding: 0,
          }}
        >
          <FiEdit size={18} />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.25,
      sortable: false,
      disableColumnMenu: true,
      renderCell: () => (
        <Button
          variant="text"
          size="small"
          sx={{
            color: theme === "dark" ? "#E53935" : "#FF4444",
            "&:hover": {
              color: theme === "dark" ? "#D32F2F" : "#CC0000",
            },
            minWidth: "auto",
            padding: 0,
          }}
        >
          <FiTrash size={18} />
        </Button>
      ),
    },
  ];

  const rows: any = [];

  if (data) {
    data.courses.forEach((item: any) => {
      rows.push({
        id: item._id,
        name: item.name,
        ratings: item.ratings,
        purchased: item.purchased,
        created_at: new Date(item.createdAt).toLocaleDateString(),
      });
    });
  }

  return (
    <Container maxWidth="lg"sx={{ mt: 4, p: 3}}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1 className="text-2xl font-bold text-[#003366] mb-4">
            All Courses
          </h1>
          <Box
            height="100vh"
            sx={{
              "& .MuiDataGrid-root": {
                borderRadius: "20px",
                overflow: "hidden",
                backgroundColor: theme === "dark" ? "#1E1E2F" : "#F9FAFB",
                color: theme === "dark" ? "#E0E0E0" : "#1A202C",
              },
              // "& .MuiDataGrid-columnHeaders": {
              //   backgroundColor: theme === "dark" ? "#2C2F48" : "#E3E8F4",
              //   color: theme === "dark" ? "#FFD700" : "#1A202C",
              //   fontWeight: "900 !important", 
              // },
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
  );
};

export default AllCourses;
