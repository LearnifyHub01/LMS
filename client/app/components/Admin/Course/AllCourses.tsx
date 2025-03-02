"use client";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Container, Typography, Modal, Fade } from "@mui/material";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { useSocket } from "../../../../context/SocketProvider";
import {
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
} from "@/redux/features/courses/coursesApi";
import Header from "../Header";
import Link from "next/link";

const AllCourses = () => {
  const { theme } = useTheme();
  const { isLoading, data } = useGetAllCoursesQuery({});
  const [deleteCourse, { isLoading: deleteLoading }] =
    useDeleteCourseMutation();
  const { courses, updateCourses } = useSocket();
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Sync initial data from query
  useEffect(() => {
    if (data) {
      setAllCourses(data.courses);
    }
  }, [data]);

  // Sync with socket updates
  useEffect(() => {
    if (courses && courses.length > 0) {
      setAllCourses(courses);
    }
  }, [courses]);

  const handleOpenModal = (courseId: string, courseName: string) => {
    setSelectedCourse({ id: courseId, name: courseName });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCourse(null);
  };

  const handleDelete = async () => {
    if (!selectedCourse) return;

    try {
      const updatedCourses = allCourses.filter(
        (course) => course._id !== selectedCourse.id
      );
      setAllCourses(updatedCourses);
      updateCourses(updatedCourses);

      await deleteCourse(selectedCourse.id).unwrap();
      handleCloseModal();
    } catch (err: any) {
      if (data) {
        setAllCourses(data.courses);
        updateCourses(data.courses);
      }
      console.error("Delete error:", err);
      alert(err?.data?.message || "Failed to delete course");
    }
  };

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
      disableClickEventBubbling: true,
      renderCell: (params: any) => {
        return (
          <Link href={`/admin/edit-course/${params.row.id}`}>
            <FiEdit
              size={18}
              style={{
                color: theme === "dark" ? "#4CAF50" : "#008CBA",
                minWidth: "auto",
                padding: 0,
                marginTop: "58%",
                marginLeft: "25%",
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </Link>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.25,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => (
        <Button
          variant="text"
          size="small"
          onClick={() => handleOpenModal(params.row.id, params.row.name)}
          disabled={deleteLoading}
          sx={{
            color: theme === "dark" ? "#E53935" : "#FF4444",
            "&:hover": { color: theme === "dark" ? "#D32F2F" : "#CC0000" },
            minWidth: "auto",
            padding: 0,
          }}
        >
          <FiTrash size={18} />
        </Button>
      ),
    },
  ];

  const rows = allCourses.map((item: any) => ({
    id: item._id,
    name: item.name,
    ratings: item.ratings,
    purchased: item.purchased,
    created_at: new Date(item.createdAt).toLocaleDateString(),
  }));

  return (
    <div className="w-full  flex min-h-screen dark:bg-[#151632] ">
      {/* Main Content */}
      <div className="w-[80%]">
        <Header title="All Courses" subtitle="Welcome to dashboard" />
        <Container maxWidth="lg" sx={{ mt: 4, p: 3 }}>
          {isLoading || deleteLoading ? (
            <Loader />
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  bgcolor: theme === "dark" ? "#1a1a1a" : "#fff",
                  borderRadius: 2,
                  boxShadow: 3,
                  overflow: "hidden",
                }}
              >
                <div className="w-full h-[70vh]">
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    autoPageSize
                    disableColumnResize
                    sx={{
                      "& .MuiDataGrid-root": { border: "none" },
                      "& .MuiDataGrid-cell": {
                        borderBottom: `1px solid ${
                          theme === "dark" ? "#333" : "#eee"
                        }`,
                      },
                      "& .MuiDataGrid-columnHeaders": {
                        bgcolor: theme === "dark" ? "#2a2a2a" : "#f5f5f5",
                      },
                    }}
                  />
                </div>
              </Box>
            </Box>
          )}

          {/* Delete Confirmation Modal */}
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Fade in={openModal}>
              <Box
                sx={{
                  bgcolor: theme === "dark" ? "#2a2a2a" : "#fff",
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 4,
                  width: "90%",
                  maxWidth: 400,
                  border: `1px solid ${theme === "dark" ? "#444" : "#ddd"}`,
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    mb: 2,
                    color: theme === "dark" ? "#fff" : "#000",
                    fontWeight: "bold",
                  }}
                >
                  Confirm Deletion
                </Typography>
                <Typography
                  sx={{ mb: 3, color: theme === "dark" ? "#ddd" : "#666" }}
                >
                  Are you sure you want to delete{" "}
                  <strong>{selectedCourse?.name}</strong>?
                  <br />
                  This action cannot be undone.
                </Typography>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}
                >
                  <Button
                    onClick={handleCloseModal}
                    variant="outlined"
                    sx={{
                      color: theme === "dark" ? "#ddd" : "#666",
                      borderColor: theme === "dark" ? "#666" : "#ccc",
                      "&:hover": {
                        borderColor: theme === "dark" ? "#888" : "#999",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDelete}
                    variant="contained"
                    color="error"
                    disabled={deleteLoading}
                    sx={{
                      bgcolor: "#FF4444",
                      "&:hover": {
                        bgcolor: "#CC0000",
                      },
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Modal>
        </Container>
      </div>
    </div>
  );
};

export default AllCourses;
