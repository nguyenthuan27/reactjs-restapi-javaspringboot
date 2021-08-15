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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControlLabel from '@material-ui/core/FormControlLabel';
function Roles(){
    const listRoles = {};
    const [roles, setRoles] = useState([]);
    const [click, setClick] = useState(-1);
    const [dataRoles, setDataRoles] = useState(listRoles);

    const onClickHandler = function (event, value, index) {
        setClick(index);
        setDataRoles(value);
    }

    useEffect(() => {
        const url = 'http://localhost:8080/api/v1/rest/roles';
        axios({
            url: url,
            method: 'GET',
        })
            .then((response) => {
                const { data } = response;
                setRoles(data)
            })
            .catch((error) => {
                console.log(error, error.response)
            })
    }, []);
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setDataRoles({
            ...dataRoles,
            [name]: value
        });
    }

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
        setDataRoles(listRoles);
    };
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        // console.log(newPage)
    };
    const pageff = Math.ceil(roles.length / 5)
    return(
        <div>
            <h3>Quản Lý Product</h3>

            <Button variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => { handleClickOpen() }}
            >
                Thêm Mới product
            </Button>
            <Dialog
                onClose={handleClose}
                open={open}
            >
                <DialogTitle >
                    Thông Tin Product
                </DialogTitle>
                <DialogContent >
                    <div className="input-id">
                        <TextField
                            id="outlined-name"
                            label="ID"
                            name="id"
                            onChange={onChangeHandler}
                            variant="outlined"
                            value={dataRoles.id}
                        />
                    </div>
                    <div className="input-name">
                        <TextField
                            id="outlined-name"
                            label="Name"
                            name="name"
                            onChange={onChangeHandler}
                            variant="outlined"
                            value={dataRoles.name}
                        />
                    </div>
                    
                    
                </DialogContent>
                <DialogActions className="createall">
                    <Button
                        //onClick={onSubmitHanler}
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
                            {roles.length > 0 ?
                                <TableBody className="table-body">
                                    {roles.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((value, index) => {
                                        return (
                                            <TableRow>
                                                <TableCell > {value.id} </TableCell>
                                                <TableCell> {value.name} </TableCell>
                                                <TableCell onClick={(event) => {
                                                    return onClickHandler(event, value, index)
                                                }} key={index}>

                                                    <Button variant="contained" color="primary" startIcon={< Edit />} onClick={handleClickOpen}>Edit</Button>
                                                    &nbsp; &nbsp; &nbsp;
                                                    <Button variant="contained" color="primary" startIcon={< Delete />} >Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                                : null}

                        </Table>
                        {roles.length < 0 ? <div className="table-body">dfdsfds</div> : null}
                    </TableContainer>
                </Paper>
            </div>
            <div className="trang-ad">
                <Pagination count={pageff} variant="outlined" shape="rounded" page={page} onChange={handleChangePage} />
            </div>
        </div>
    );
}
export default Roles;