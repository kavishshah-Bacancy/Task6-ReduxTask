import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import { connect } from "react-redux";
import { fetchUserInit } from "./store/actions/userAction";
import CircularProgress from "@material-ui/core/CircularProgress";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  root: {
    minWidth: 275,
  },
});
function UsersFromApi(props) {
  const classes = useStyles();
  useEffect(() => {
    props.fetchUsers();
  }, []);

  let userData = props.error ? (
    <p>Something went wrong while fetching User details</p>
  ) : (
    <CircularProgress />
  );
  if (!props.loading && props.error === null) {
    userData = props.users.map((row) => (
      <StyledTableRow key={row.id}>
        <StyledTableCell component="th" scope="row">
          {row.name}
        </StyledTableCell>
        <StyledTableCell align="right">{row.username}</StyledTableCell>
        <StyledTableCell align="right">{row.email}</StyledTableCell>
        <StyledTableCell align="right">{row.phone}</StyledTableCell>
        <StyledTableCell align="right">{row.website}</StyledTableCell>
      </StyledTableRow>
    ));
  }
  return (
    <Card>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">username</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Phone</StyledTableCell>
              <StyledTableCell align="right">Website</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{userData}</TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.userApi.user,
    loading: state.userApi.loading,
    error: state.userApi.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUserInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersFromApi);
