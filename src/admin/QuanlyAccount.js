import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import { Edit, Delete } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
function QuanlyAccount() {
  const listAccount = {};
  const [account, setAccount] = useState([]);
  const [click, setClick] = useState(-1);
  const [dataAccount, setDataAccount] = useState(listAccount);

  const onClickHandler = function (event, value, index) {
    setClick(index);
    setDataAccount(value);
  }
  useEffect(() => {
    const url = 'http://localhost:8080/api/v1/rest/accounts';
    axios({
      url: url,
      method: 'GET',
    })
      .then((response) => {
        const { data } = response;
        setAccount(data)
      })
      .catch((error) => {
        console.log(error, error.response)
      })
  }, []);

  //Create
  const onCreateAccount = () => {
    const url = 'http://localhost:8080/api/v1/rest/accounts';
    axios({
      url: url,
      method: 'POST',
      data: dataAccount,
    })
      .then((response, resetform) => {
        const { data } = response;
        setAccount([
          ...account,
          data
        ])
        alert("Thêm mới thành công")
      })
      .catch((error) => {
        alert("Thêm mới thất bại")
        console.log(error, error.response)
      })
  }
  // Update
  const onUpdateAccount = () => {
    let id1;
    if (page == 1) {
      id1 = account[click].username
    }
    else {
      const ad1 = click + 5 * (page - 1)
      id1 = account[ad1].username
    }
    const url = `http://localhost:8080/api/v1/rest/accounts/${id1}`;
    axios({
      url: url,
      method: 'PUT',
      data: dataAccount
    })
      .then((response) => {
        const { data } = response;
        setAccount((oldState) => {
          let newState = oldState.map((val, idx) => {
            return val.username == id1 ? data : val;
          })
          return newState;
        })
        alert("Update thành công")
      })
      .catch((error) => {
        alert("Update thất bại")
        console.log(error, error.response)
      })
  }
  //Delete
  const onHandleDelete = (username) => {
    const url = `http://localhost:8080/api/v1/rest/accounts/${username}`;
    axios({
      url: url,
      method: 'DELETE',
      data: dataAccount
    })
      .then((rensponse) => {
        const dele = account.filter(ac => username !== ac.username)
        setAccount(dele)
      })
      alert("Xóa thành công")

      .catch((error) => {
        console.log(error.rensponse)
        alert("Xoá không thành công")
      })
  }



  const onSubmitHanler = (event) => {
    event.preventDefault();
    if (click == -1) {
      //Tạo mới
      onCreateAccount();
      setDataAccount("");
      handleClose();
    } else {
      onUpdateAccount();
      handleClose();

    }
  }
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setDataAccount({
      ...dataAccount,
      [name]: value
    });
  }

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);

  };
  const handleClose = () => {
    setOpen(false);
    setDataAccount(listAccount);
  };
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // console.log(newPage)
  };
  const pageff = Math.ceil(account.length / 5)
  return (
    <div>
      <h3>Quản Lý Account</h3>

      <Button variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => { handleClickOpen() }}
      >
        Thêm Mới Account
      </Button>
      <Dialog
        onClose={handleClose}
        open={open}
      >
        <DialogTitle >
          Thông Tin Account
        </DialogTitle>
        <DialogContent >
          <div className="input-id">
            <label htmlFor="id">UserName</label>
            <input
              onChange={onChangeHandler}
              placeholder="User Name"
              name="username"
              value={dataAccount.username}

            />
          </div>
          <div className="input-name">
            <label htmlFor="name">Password</label>
            <input
              onChange={onChangeHandler}
              placeholder="Password"
              name="password"
              value={dataAccount.password}
            />
          </div>
          <div className="input-name">
            <label htmlFor="name">Full Name</label>
            <input
              onChange={onChangeHandler}
              placeholder="Full Name"
              name="fullname"
              value={dataAccount.fullname}
            />
          </div>
          <div className="input-name">
            <label htmlFor="name">Email</label>
            <input
              onChange={onChangeHandler}
              placeholder="Email"
              name="email"
              value={dataAccount.email}
            />
          </div>
          <div className="input-name">
            <label htmlFor="name">Photo</label>
            <input
              onChange={onChangeHandler}
              placeholder="Photo"
              name="photo"
              value={dataAccount.photo}
            />
          </div>

        </DialogContent>
        <DialogActions className="createall">
          <Button
            onClick={onSubmitHanler}
            color="primary">
            Thêm Mới
          </Button>
          <Button onClick={handleClose} color="primary">Hủy</Button>
        </DialogActions>
      </Dialog>
      <div className="content-table">

        <Paper>
          <TableContainer className="table" >
            {/* < TextField fullWidth="50px" label="Tìm kiếm danh mục" margin="normal" variant="outlined" /> */}

            <Table stickyHeader label="sticky table" >
              <TableHead>
                <TableRow className="table-content">
                  <TableCell> Username </TableCell>
                  <TableCell> PassWord </TableCell>
                  <TableCell> FullName </TableCell>
                  <TableCell> Email </TableCell>
                  <TableCell> Photo </TableCell>
                  < TableCell> Action </TableCell>
                </TableRow>
              </TableHead>
              {account.length > 0 ?
                <TableBody className="table-body">
                  {account.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((value, index) => {
                    return (
                      <TableRow>
                        <TableCell > {value.username} </TableCell>
                        <TableCell> {value.password} </TableCell>
                        <TableCell> {value.fullname} </TableCell>
                        <TableCell> {value.email} </TableCell>
                        <TableCell> {value.photo} </TableCell>
                        <TableCell onClick={(event) => {
                          return onClickHandler(event, value, index)
                        }} key={index}>

                          <Button variant="contained" color="primary" startIcon={< Edit />} onClick={handleClickOpen}>Edit</Button>
                          &nbsp; &nbsp; &nbsp;
                          <Button variant="contained" color="primary" startIcon={< Delete />} onClick={() => onHandleDelete(value.username)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
                : null}

            </Table>
            {account.length < 0 ? <div className="table-body">dfdsfds</div> : null}
          </TableContainer>
        </Paper>
      </div>
      <div className="trang-ad">
        <Pagination count={pageff} variant="outlined" shape="rounded" page={page} onChange={handleChangePage} />
      </div>
    </div>
  );
}
export default QuanlyAccount;