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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
function QuanlyOrderDetails() {
  const listOrderDetails = {
    id: "",
    price: "",
    quantity: "",
    orders: {
      id: "",
    },
    products: {
      id: "",
    }
  };
  const [orderDetails, setOrderDetails] = useState([]);
  const [click, setClick] = useState(-1);
  const [dataOrderDetails, setDataOrderDetails] = useState(listOrderDetails);
  const [orders, setOrders] = useState([]);
  const [products, setProduct] = useState([]);
  const onClickHandler = function (event, value, index) {
    setClick(index);
    setDataOrderDetails(value);

  }

  useEffect(() => {
    const url = 'http://localhost:8080/api/v1/rest/order';
    axios({
      url: url,
      method: 'GET',
    })
      .then((response) => {
        const { data } = response;
        setOrders(data)
      })
      .catch((error) => {
        console.log(error, error.response)
      })
  }, []);

  useEffect(() => {
    const url = 'http://localhost:8080/api/v1/rest/products';
    axios({
      url: url,
      method: 'GET',
    })
      .then((response) => {
        const { data } = response;
        setProduct(data)
      })
      .catch((error) => {
        console.log(error, error.response)
      })
  }, []);

  useEffect(() => {
    const url = 'http://localhost:8080/api/v1/rest/orderDetail';
    axios({
      url: url,
      method: 'GET',
      data: dataOrderDetails
    })
      .then((response) => {
        const { data } = response;
        setOrderDetails(data)
        console.log('DATA', data)
      })
      .catch((error) => {
        console.log(error, error.response)
      })
  }, []);

  //Create
  const onCreateOrderDetail = () => {
    const url = 'http://localhost:8080/api/v1/rest/orderDetail';
    axios({
      url: url,
      method: 'POST',
      data: dataOrderDetails,
    })
      .then((response) => {
        const { data } = response;
        setOrderDetails([
          ...orderDetails,
          data
        ])
        alert("Th??m M???i Th??nh C??ng")
      })
      .catch((error) => {
        alert("Th??m m???i th???t b???i! H??y th??? l???i..")
        console.log(error, error.response)
      })

  }
  // Update
  const onUpdateOrderDetail = () => {
    let id1;
    if (page == 1) {
      id1 = orderDetails[click].id
    }
    else {
      const ad1 = click + 5 * (page - 1)
      id1 = orderDetails[ad1].id
    }
    const url = `http://localhost:8080/api/v1/rest/orderDetail/${id1}`;
    axios({
      url: url,
      method: 'PUT',
      data: dataOrderDetails
    })
      .then((response) => {
        const { data } = response;
        setOrderDetails((oldState) => {
          let newState = oldState.map((val, idx) => {
            return val.id == id1 ? data : val;
          })
          return newState;
        })
        alert("Update Th??nh C??ng")
      })
      .catch((error) => {
        alert("Update Th???t b???i")
        console.log(error, error.response)
      })
  }
  //Delete
  const onHandleDelete = (id) => {
    const url = `http://localhost:8080/api/v1/rest/orderDetail/${id}`;
    axios({
      url: url,
      method: 'DELETE',
      data: dataOrderDetails
    })
      .then((rensponse) => {
        const dele = orderDetails.filter(ac => id !== ac.id)
        setOrderDetails(dele)
        alert("Delete Th??nh C??ng")
        setDataOrderDetails(listOrderDetails)

      })
      .catch((error) => {
        console.log(error.rensponse)
        alert("Xo?? kh??ng th??nh c??ng")
      })

  }

  const onSubmitHanler = (event) => {
    event.preventDefault();
    if (click == -1) {
      //T???o m???i
      onCreateOrderDetail();
      setDataOrderDetails("");
      handleClose();
    } else {
      onUpdateOrderDetail();
      handleClose();

    }
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setDataOrderDetails({
      ...dataOrderDetails,
      [name]: value
    });
    if (name === "orders") {
      setDataOrderDetails({
        ...dataOrderDetails,
        orders: {
          id: value
        }
      })
    }
    if (name === "product") {
      setDataOrderDetails({
        ...dataOrderDetails,
        products: {
          id: value
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
    setDataOrderDetails(listOrderDetails);
  };
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // console.log(newPage)
  };
  const pageff = Math.ceil(orderDetails.length / 5)
  return (
    <div>
      <h3>Qu???n L?? OrderDetails</h3>

      <Button variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => { handleClickOpen() }}
      >
        Th??m M???i OrderDetails
      </Button>
      <Dialog
        onClose={handleClose}
        open={open}
      >
        <DialogTitle >
          Th??ng Tin OrderDetails
        </DialogTitle>
        <DialogContent >
          {/* <div className="input-id">
                        <TextField
                            id="outlined-name"
                            label="ID"
                            onChange={onChangeHandler}
                            variant="outlined"
                            value={dataOrderDetails.id}
                        />
                    </div> */}
          <div className="input-name">
            <label htmlFor="name">OrderID</label>
            <FormControl variant="outlined" >
              <Select
                native
                name="orders"
                onChange={onChangeHandler}
                value={dataOrderDetails.orders.Id}
              >
                {
                  orders.map((val, idx) => {
                    return (
                      <option key={idx} value={val.id}>
                        {val.id}
                      </option>
                    );
                  })
                }
              </Select>
            </FormControl>
          </div>
          <div className="input-name">
            <label htmlFor="name">Product</label>
            <FormControl variant="outlined" >
              <Select
                native
                name="products"
                onChange={onChangeHandler}
                value={dataOrderDetails.products.id}
              >
                {
                  products.map((val, idx) => {
                    return (
                      <option key={idx} value={val.id}>
                        {val.name}
                      </option>
                    );
                  })
                }
              </Select>
            </FormControl>
          </div>

          <div className="input-name">
            <TextField
              id="outlined-name"
              label="Price"
              name="price"
              onChange={onChangeHandler}
              variant="outlined"
              value={dataOrderDetails.price}
            />
          </div>

          <div className="input-name">
            <TextField
              id="outlined-name"
              label="Quantity"
              name="quantity"
              onChange={onChangeHandler}
              variant="outlined"
              value={dataOrderDetails.quantity}
            />
          </div>
          <div className="input-name">
                        <label htmlFor="name">Available</label>
                        <RadioGroup row aria-label="ptrueosition" onChange={onChangeHandler} name="position" defaultValue="top">
                            <FormControlLabel type="radio" value="Ch??? x??c nh???n" checked={dataOrderDetails.statusdeli === 'Ch??? x??c nh???n'} name="statusdeli" control={<Radio color="primary" />} label="Ch??? x??c nh???n" />
                            <FormControlLabel type="radio" value="??ang giao" checked={dataOrderDetails.statusdeli === '??ang giao'} name="statusdeli" control={<Radio color="primary" />} label="??ang giao" />
                            <FormControlLabel type="radio" value="???? nh???n h??ng" checked={dataOrderDetails.statusdeli === '???? nh???n h??ng'} name="statusdeli" control={<Radio color="primary" />} label="???? nh???n h??ng" />
                        </RadioGroup>
                    </div>
        </DialogContent>
        <DialogActions className="createall">
          <Button
            onClick={onSubmitHanler}
            color="primary">
            Th??m M???i
          </Button>
          <Button onClick={handleClose} color="primary">H???y</Button>
        </DialogActions>
      </Dialog>
      <div className="content-table">

        <Paper>
          <TableContainer className="table" >
            {/* < TextField fullWidth="50px" label="T??m ki???m danh m???c" margin="normal" variant="outlined" /> */}

            <Table stickyHeader label="sticky table" >
              <TableHead>
                <TableRow className="table-content">
                  <TableCell> ID </TableCell>
                  <TableCell> OrderId </TableCell>
                  <TableCell> ProductId </TableCell>
                  <TableCell> Price </TableCell>
                  <TableCell> Quantity </TableCell>
                  <TableCell> Statusdeli </TableCell>
                  < TableCell> Action </TableCell>
                </TableRow>
              </TableHead>
              {orderDetails.length > 0 ?
                <TableBody className="table-body">
                  {orderDetails.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((value, index) => {
                    return (
                      <TableRow>
                        <TableCell > {value.id} </TableCell>
                        <TableCell> {value.orders.id} </TableCell>
                        <TableCell> {value.products.id} </TableCell>
                        <TableCell> {value.price} </TableCell>
                        <TableCell> {value.quantity} </TableCell>
                        <TableCell> {value.statusdeli} </TableCell>
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
            {orderDetails.length < 0 ? <div className="table-body">dfdsfds</div> : null}
          </TableContainer>
        </Paper>
      </div>
      <div className="trang-ad">
        <Pagination count={pageff} variant="outlined" shape="rounded" page={page} onChange={handleChangePage} />
      </div>
    </div>
  );
}
export default QuanlyOrderDetails;