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
function QuanlyCategories(){

    const listCategory= {};
    const [category,setCategory] = useState([]);
    const [click,setClick] = useState(-1);
    const [dataCategory,setDataCategory] = useState(listCategory);

    const onClickHandler = function (event, value, index) {
        setClick(index);
        setDataCategory(value);
    }
    useEffect(() =>{
        const url = 'http://localhost:8080/api/v1/rest/categories';
        axios({
            url:url,
            method: 'GET',
        })
           .then((response) =>{
               const {data} = response;
               setCategory(data)
           })
           .catch((error) =>{
               console.log(error, error.response)
           })
    }, []);

    //Create
    const onCreateCategory = () => {
        const url = 'http://localhost:8080/api/v1/rest/categories';
        axios({
            url: url,
            method: 'POST',
            data: dataCategory,
        })
            .then((response,resetform) => {
                const { data } = response;
                setCategory([
                    ...category,
                    data
                ])
                alert('Thêm mới thành công')
            })
            .catch((error) => {
                alert('Thêm mới thất bại')
                console.log(error, error.response)
            })
    }
     // Update
     const onUpdateCategory = () => {
        let id1;
        if (page == 1) {
            id1 = category[click].id
        }
        else {
            const ad1 = click + 5 * (page - 1)
            id1 = category[ad1].id
        }
        const url = `http://localhost:8080/api/v1/rest/categories/${id1}`;
        axios({
            url: url,
            method: 'PUT',
            data: dataCategory
        })
            .then((response) => {
                const { data } = response;
                setCategory((oldState) => {
                    let newState = oldState.map((val, idx) => {
                        return val.id == id1 ? data : val;
                    })
                    return newState;
                })
                console.log(data)
            })
            .catch((error) => {
                console.log(error, error.response)
            })
    }
    //Delete
    const onHandleDelete = (id) => {
        const url = `http://localhost:8080/api/v1/rest/categories/${id}`;
        axios({
            url: url,
            method: 'DELETE',
            data: dataCategory
        })
            .then((rensponse) => {
                const dele = category.filter(categori => id !== categori.id)
                setCategory(dele)
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
            onCreateCategory();
            setDataCategory("");
            handleClose();
        } else {
            onUpdateCategory();
            handleClose();

        }
    }
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setDataCategory({
            ...dataCategory,
            [name]: value
        });
    }

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
        setDataCategory(listCategory);
    };
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event,newPage) => {
        setPage(newPage);
        console.log(newPage)
    };
    const pageff = Math.ceil(category.length / 5)
    return(
        <div>

            <h3>Quản Lý Category</h3>

            <Button variant="contained"
                color="primary"
               startIcon={<AddIcon />}
                onClick={() =>{handleClickOpen()}}
            >
                Thêm Mới Category
            </Button>
            <Dialog 
            onClose={handleClose}
            open={open}
              >
                <DialogTitle >
                    Thông Tin Danh Mục
                 </DialogTitle>
                <DialogContent >
                    <div className="input-id">
                        <label htmlFor="id">ID</label>
                        <input
                           onChange={onChangeHandler}
                            placeholder="ID"
                            name="id"
                            value={dataCategory.id}

                        />
                    </div>
                    <div className="input-name">
                        <label htmlFor="name">Name</label>
                        <input
                            onChange={onChangeHandler}
                            placeholder="Name"
                            name="name"
                            value={dataCategory.name}

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
                                <TableCell> Name </TableCell>
                                < TableCell> Action </TableCell>
                            </TableRow>
                        </TableHead>
                        {category.length > 0? 
                          <TableBody className="table-body">
                          {category.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((value,index) => {
                              return(
                              <TableRow> 
                                  <TableCell > {value.id} </TableCell>
                                   <TableCell> {value.name} </TableCell>

                                  <TableCell onClick={(event) => {
                                      return onClickHandler(event,value,index)          
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
                    {category.length < 0 ? <div className="table-body">dfdsfds</div>: null}
                </TableContainer>
            </Paper>
            </div>
            <div className="trang-ad">
                <Pagination count={pageff} variant="outlined" shape="rounded" page={page} onChange={handleChangePage} />
            </div>
        </div>
    );
}
export default QuanlyCategories;