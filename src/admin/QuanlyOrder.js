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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
function QuanlyOrder() {
  const listOrder = {
    createDate: "",
    address: "",

    account: {
      username: "",
      order: {
        createDate: "",
        address: "",
      },
    }
  };
  const [order, setOrder] = useState([]);
  const [account, setAccount] = useState([]);
  const [click, setClick] = useState(-1);
  const [dataOrder, setDataOrder] = useState(listOrder);

  const onClickHandler = function (event, value, index) {
    setClick(index);
    setDataOrder(value);
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


  useEffect(() => {
    const url = 'http://localhost:8080/api/v1/rest/order';
    axios({
      url: url,
      method: 'GET',
      data: dataOrder
    })
      .then((response) => {
        const { data } = response;
        setOrder(data)
      })
      .catch((error) => {
        console.log(error, error.response)
      })
  }, []);




  //Create
  const onCreateAccount = () => {
    const url = 'http://localhost:8080/api/v1/rest/order';
    console.log("Create", dataOrder)
    axios({
      url: url,
      method: 'POST',
      data: dataOrder,
    })
      .then((response) => {
        const { data } = response;
        setOrder([
          ...order,
          data
        ])
        alert("Thêm Mới Thành Công")
      })
      .catch((error) => {
        alert("Thêm mới thất bại! Hãy thử lại..")
        console.log(error, error.response)
      })

  }
  // Update
  const onUpdateAccount = () => {
    let id1;
    if (page == 1) {
      id1 = order[click].id
    }
    else {
      const ad1 = click + 5 * (page - 1)
      id1 = order[ad1].id
    }
    const url = `http://localhost:8080/api/v1/rest/order/${id1}`;
    axios({
      url: url,
      method: 'PUT',
      data: dataOrder
    })
      .then((response) => {
        const { data } = response;
        setOrder((oldState) => {
          let newState = oldState.map((val, idx) => {
            return val.id == id1 ? data : val;
          })
          return newState;
        })
        alert("Update Thành Công")
      })
      .catch((error) => {
        alert("Update Thất bại")
        console.log(error, error.response)
      })
  }
  //Delete
  const onHandleDelete = (id) => {
    const url = `http://localhost:8080/api/v1/rest/order/${id}`;
    axios({
      url: url,
      method: 'DELETE',
      data: dataOrder
    })
      .then((rensponse) => {
        const dele = order.filter(ac => id !== ac.id)
        setOrder(dele)
        alert("Delete Thành Công")
        setDataOrder(listOrder)

      })
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
      setDataOrder("");
      handleClose();
    } else {
      onUpdateAccount();
      handleClose();

    }
  }
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setDataOrder({
      ...dataOrder,
      [name]: value
    })
    if (name === "account") {
      setDataOrder({
        ...dataOrder,
        account: {
          username: value,
        }
      })
    }
  }

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);

  };
  const handleClose = () => {
    setOpen(false);
    setDataOrder(listOrder);
  };
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // console.log(newPage)
  };
  const pageff = Math.ceil(order.length / 5)
  return (
    <div>
      <h3>Quản Lý Order</h3>

      <Button variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => { handleClickOpen() }}
      >
        Thêm Mới Order
      </Button>
      <Dialog
        onClose={handleClose}
        open={open}
      >
        <DialogTitle >
          Thông Tin Order
        </DialogTitle>
        <DialogContent >
          {/* <div className="input-id">
                        <TextField
                            id="outlined-name"
                            label="ID"
                            onChange={onChangeHandler}
                            variant="outlined"
                            name="id"
                            value={dataOrder.id}
                        />
                    </div> */}
          <div className="input-name">
            <label htmlFor="name">Username</label>
            <FormControl variant="outlined" >
              <Select
                native
                name="account"
                onChange={onChangeHandler}
                value={dataOrder.account.username}
              >
                {
                  account.map((val, idx) => {
                    return (
                      <option key={idx} value={val.username}>
                        {val.username}
                      </option>
                    );
                  })
                }
              </Select>
            </FormControl>
          </div>
          <div className="input-name">
            <label htmlFor="name">Create Date</label>
            <input
              variant="outlined"
              type="date"
              name="createDate"
              onChange={onChangeHandler}
              value={dataOrder.createDate}
            />
          </div>
          <div className="input-name">
            <TextField
              id="outlined-name"
              label="Address"
              onChange={onChangeHandler}
              variant="outlined"
              name="address"
              value={dataOrder.address}
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
                  <TableCell> ID </TableCell>
                  <TableCell> Username </TableCell>
                  <TableCell> CreateDate </TableCell>
                  <TableCell> Address </TableCell>
                  < TableCell> Action </TableCell>
                </TableRow>
              </TableHead>
              {order.length > 0 ?
                <TableBody className="table-body">
                  {order.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((value, index) => {
                    return (
                      <TableRow>
                        <TableCell > {value.id} </TableCell>
                        <TableCell> {value.account.username} </TableCell>
                        <TableCell> {value.createDate} </TableCell>
                        <TableCell> {value.address} </TableCell>
                        <TableCell onClick={(event) => {
                          return onClickHandler(event, value, index)
                        }} key={index}>

                          <Button variant="contained" color="primary" startIcon={< Edit />} onClick={handleClickOpen}>Edit</Button>
                          &nbsp; &nbsp; &nbsp;
                          <Button variant="contained" color="primary" startIcon={< Delete />} onClick={() => onHandleDelete(value.id)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
                : null}

            </Table>
            {order.length < 0 ? <div className="table-body">dfdsfds</div> : null}
          </TableContainer>
        </Paper>
      </div>
      <div className="trang-ad">
        <Pagination count={pageff} variant="outlined" shape="rounded" page={page} onChange={handleChangePage} />
      </div>
    </div>
  );
}
export default QuanlyOrder;