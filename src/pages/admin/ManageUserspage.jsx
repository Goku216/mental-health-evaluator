import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { Alert } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PreviewIcon from "@mui/icons-material/Preview";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [successmessage, setSuccessMessage] = useState("");
  const [errormessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/admin/getusers");
        const data = await response.data;
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage(""); // Clear the message after a certain time
    }, 3000); // 3000ms = 3 seconds

    return () => clearTimeout(timer); // Cleanup function to prevent memory leaks
  }, []);

  const handleView = (id) => {
    navigate(`/admin/manageUsers/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/admin/deleteuser/${id}`);
      const data = response.data;
      if (data) {
        setSuccessMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Something went wrong");
    }
  };
  return (
    <TableContainer component={Paper}>
      {successmessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successmessage}
        </Alert>
      )}

      {errormessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errormessage}
        </Alert>
      )}

      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Joined At</StyledTableCell>
            <StyledTableCell align="left">View</StyledTableCell>
            <StyledTableCell align="left">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <StyledTableRow key={row.username}>
              <StyledTableCell component="th" scope="row">
                {row.username}
              </StyledTableCell>
              <StyledTableCell align="left">{row.email}</StyledTableCell>
              <StyledTableCell align="left">
                {row.createdAt.split("T")[0]}
              </StyledTableCell>
              <StyledTableCell align="left">
                <PreviewIcon onClick={() => handleView(row.userid)} />
              </StyledTableCell>
              <StyledTableCell align="left">
                <DeleteForeverIcon
                  onClick={() => {
                    handleDelete(row.userid);
                    window.location.reload();
                  }}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
