import React, { useState, useEffect } from "react";
import "./AdminPanel.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./Form";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Modal,
  Button,
} from "@mui/material";
import Navbaradmin from "scenes/adminNavbar";

const AdminPanel = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/admin/userlist");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const onDelete = async (userId) => {
    try {
      const response = await fetch("http://localhost:3001/admin/deleteUser", {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const users = await response.json();

      setData(users);

      toast("User deleted successfully!", {
        autoClose: 2000,
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className: "toastify-body",
        bodyClassName: "toastify-message",
        closeButton: <span className="toastify-close-button">×</span>,
      });
    } catch (error) {
      toast(error.message, {
        autoClose: 2000,
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className: "toastify-body",
        bodyClassName: "toastify-message",
        closeButton: <span className="toastify-close-button">×</span>,
      });
    }
  };

  const onBlockUnblock = async (userId) => {
    try {
      const response = await fetch("http://localhost:3001/admin/blockUnblock", {
        method: "PATCH",
        body: JSON.stringify({ userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let users = await response.json();
      setData(users);
    } catch (error) {}
  };

  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Navbaradmin />

      <Box textAlign="center" mt={2}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add user
        </Button>
      </Box>

      <Box
        display="grid"
        gap="10px"
        gridTemplateColumns="1fr 1fr 1fr auto auto"
        sx={{
          maxWidth: "774px",
          maxHeight: "458px",
          overflow: "auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          margin: "auto",
          textAlign: "center",
          marginTop: "90px",
        }}
      >
        <Box sx={{ fontWeight: "bold" }}>First Name</Box>
        <Box sx={{ fontWeight: "bold" }}>Location</Box>
        <Box sx={{ fontWeight: "bold" }}>Email</Box>
        <Box sx={{ fontWeight: "bold" }}>Block/Unblock</Box>
        <Box sx={{ fontWeight: "bold" }}>Delete</Box>

        {data.map((user) => (
          <React.Fragment key={user._id}>
            <Box>{user.firstName}</Box>
            <Box>{user.location}</Box>
            <Box>{user.email}</Box>
            <Box>
              <Button
                variant="outlined"
                onClick={() => onBlockUnblock(user._id)}
                className={user.block ? "unblock-button" : "block-button"}
              >
                {user.block ? "Unblock" : "Block"}
              </Button>
            </Box>
            <Box>
              <Button
                variant="outlined"
                onClick={() => onDelete(user._id)}
                className="delete-button"
              >
                Delete
              </Button>
            </Box>
          </React.Fragment>
        ))}
      </Box>
      <Box
        // width={isNonMobileScreens ? "50%" : "93%"}
        // p="2rem"
        // m="2rem auto"
        // borderRadius="1.5rem"
        // backgroundColor={theme.palette.background.alt}
      >
       

        <Form open={open} handleClose={handleClose} />
      </Box>
    </Box>
  );
};

export default AdminPanel;
