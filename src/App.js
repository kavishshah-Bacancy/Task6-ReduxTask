import React, { useState } from "react";
import "./App.css";
import DisplayUsers from "./component/displayUsers";
import UsersFromApi from "./component/usersFromApi";
import Button from "@material-ui/core/Button";
import SideDrawer from "./component/sideDrawer";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { BsFillPersonPlusFill } from "react-icons/bs";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  deleteUser,
  addUser,
  updateUser,
} from "./component/store/actions/userAction";
import { connect } from "react-redux";
import { Card } from "@material-ui/core";

function App(props) {
  const [userField, setUserField] = useState({
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [userFieldError, setUserFieldError] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState();
  const onOpenDrawer = () => {
    setDrawerOpen(true);
  };
  const onCloseDrawer = () => {
    setEditIndex(null);
    setIsEdit(false);
    setUserField({ firstName: "", lastName: "", email: "", phone: "" });
    setDrawerOpen(false);
  };
  const onHandleChange = (e) => {
    if (
      e.target.value.length <= 0 ||
      e.target.name === "email" ||
      e.target.name === "phone"
    ) {
      if (e.target.name === "email") {
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(e.target.value)) {
          setUserFieldError({
            ...userFieldError,
            [e.target.name]: true,
          });
        } else {
          setUserFieldError({
            ...userFieldError,
            [e.target.name]: false,
          });
        }
      } else if (e.target.name === "phone") {
        let regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!regex.test(e.target.value)) {
          setUserFieldError({
            ...userFieldError,
            [e.target.name]: true,
          });
        } else {
          setUserFieldError({
            ...userFieldError,
            [e.target.name]: false,
          });
        }
      } else {
        setUserFieldError({
          ...userFieldError,
          [e.target.name]: true,
        });
      }
    } else {
      setUserFieldError({
        ...userFieldError,
        [e.target.name]: false,
      });
    }
    setUserField({
      ...userField,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (isEdit !== true) {
      let id = Math.random(100);
      userField.id = id;
      props.addUser(userField);
      setDrawerOpen(false);
      setUserField({ firstName: "", lastName: "", email: "", phone: "" });
    } else {
      let updatedUser = [...props.user];
      let findIndex = props.user.findIndex((item) => item.id === editIndex);
      updatedUser[findIndex] = userField;
      props.updateUser(updatedUser);
      setDrawerOpen(false);
      setUserField({ firstName: "", lastName: "", email: "", phone: "" });
      setIsEdit(false);
    }
  };
  const onDelete = (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete this user.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            props.deleteUser(id);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  const onEdit = (id) => {
    setEditIndex(id);
    const getUserData = props.user.filter((item) => item.id === id);
    setUserField({
      firstName: getUserData[0].firstName,
      lastName: getUserData[0].lastName,
      phone: getUserData[0].phone,
      email: getUserData[0].email,
    });
    setIsEdit(true);
    setDrawerOpen(true);
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Users Details</Typography>
        </Toolbar>
      </AppBar>
      <Button
        style={{ width: "20%", marginTop: "3%" }}
        onClick={onOpenDrawer}
        variant="contained"
        color="secondary"
      >
        <BsFillPersonPlusFill />
        &nbsp;Add New User
      </Button>
      <DisplayUsers onDelete={onDelete} onEdit={onEdit} />
      <SideDrawer
        onHandleChange={onHandleChange}
        isOpen={drawerOpen}
        onClose={onCloseDrawer}
        onSubmit={onSubmit}
        user={userField}
        isEdit={isEdit}
        userFieldError={userFieldError}
      />
      <Card style={{ marginTop: "15%" }}>
        <UsersFromApi />
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    addUser: (userData) => dispatch(addUser(userData)),
    deleteUser: (id) => dispatch(deleteUser(id)),
    updateUser: (users) => dispatch(updateUser(users)),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(App);
