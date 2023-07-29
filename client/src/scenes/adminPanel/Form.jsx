import React, { useState } from "react";
import { Box, Button, TextField, Typography, useMediaQuery, Modal, IconButton } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useTheme } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import CloseIcon from "@mui/icons-material/Close";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
  location: yup.string().required("Required"),
  occupation: yup.string().required("Required"),
  picture: yup.mixed().required("Required"), // Use yup.mixed() for file input
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const register = async (values, onSubmitProps,setData,setOpen) => {
  console.log("vannu");
  // this allows us to send form info with image
  const formData = new FormData();
  for (let value in values) {
    formData.append(value, values[value]);
  }
  formData.append("picturePath", values.picture.name);

  const savedUserResponse = await fetch("http://localhost:3001/auth/register", {
    method: "POST",
    body: formData,
  });
  console.log("kkkkk",savedUserResponse);
  const response = await savedUserResponse.json();
  console.log(response);
  let users =response.users
  console.log("sssss",users);
  onSubmitProps.resetForm();
  setOpen(false);
  setData(users)
  
  



};

const Form = ({ open, handleClose,setData,setOpen }) => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [pageType, setPageType] = useState("login");

  const handleFormSubmit = async (values, onSubmitProps) => {
    await register(values, onSubmitProps,setData,setOpen );
  };
  const [modalStyle] = useState({
    top: "50%",
    left: "50%",
    transform: "translate(120%, 0%)",
    maxWidth: "580px",
    width: "30%",
    backgroundColor: "#fff",
    padding: "3rem",
    borderRadius: "8px",
  });

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: "8px",
                right: "8px",
                color: palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <>
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    error={Boolean(touched.location) && Boolean(errors.location)}
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name="occupation"
                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <Box gridColumn="span 4" border={`1px solid ${palette.neutral.medium}`} borderRadius="5px" p="1rem">
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>

              <Box>
                <Button 
                  fullWidth
                  type="submit"
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  {"REGISTER"}
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      )}
    </Formik>
  );
};

export default Form;
