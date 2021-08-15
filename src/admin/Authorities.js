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
function Authorities(){
    const listAuthorities = {
        authorities:{
            id:"",
        },
        account:{
            username:"",
        },
        role:{
            id:"",
        }
    };
    const [authorities, setAuthorities] = useState([]);
    const [role, setRole] = useState([]);
    const [account,setAccount] = useState([]);
    const [click, setClick] = useState(-1);
    const [dataAuthorities, setDataAuthorities] = useState(listAuthorities);

    const onClickHandler = function (event, value, index) {
        setClick(index);
        setDataAuthorities(value);
    }
    useEffect(() =>{
        const url = 'http://localhost:8080/api/v1/rest/accounts';
        axios({
            url:url,
            method: 'GET',
        })
           .then((response) =>{
               const {data} = response;
               setAccount(data)
           })
           .catch((error) =>{
               console.log(error, error.response)
           })
    }, []);
    useEffect(() => {
        const url = 'http://localhost:8080/api/v1/rest/roles';
        axios({
            url: url,
            method: 'GET',
        })
            .then((response) => {
                const { data } = response;
                setRole(data)
            })
            .catch((error) => {
                console.log(error, error.response)
            })
    }, []);
    useEffect(() => {
        const url = 'http://localhost:8080/api/v1/rest/authorities';
        axios({
            url: url,
            method: 'GET',
        })
            .then((response) => {
                const { data } = response;
                setAuthorities(data)
            })
            .catch((error) => {
                console.log(error, error.response)
            })
    }, []);
    const onCreateAuhthor = () => {
        const url = 'http://localhost:8080/api/v1/rest/authorities';
        axios({
            url: url,
            method: 'POST',
            data: dataAuthorities,
        })
            .then((response,resetform) => {
                const { data } = response;
                setAuthorities([
                    ...authorities,
                    data
                ])
                resetform({ rensponse: '' })
            })
            .catch((error) => {
                console.log(error, error.response)
            })
    }


    const onSubmitHanler = (event) => {
        event.preventDefault();
        if (click == -1) {
            //Tạo mới
            onCreateAuhthor();
            setDataAuthorities("");
            handleClose();
        } else {
            // onUpdateCategory();
            handleClose();

        }
    }
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setDataAuthorities({
            ...dataAuthorities,
            [name]: value
        })
        if(name === "account"){
            setDataAuthorities({
                ...dataAuthorities,
                account:{
                    username:value,
                },
            })
        }
        if(name === "role"){
            setDataAuthorities({
                ...dataAuthorities,
                role:{
                    id:value,
                },
            })
        }
    }

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
        setDataAuthorities(listAuthorities);
    };
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        // console.log(newPage)
    };
    const pageff = Math.ceil(authorities.length / 5)
    return(
        <div>
            <h3>Quản Lý Authorities</h3>

            <Button variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => { handleClickOpen() }}
            >
                Thêm Mới Authorities
            </Button>
            <Dialog
                onClose={handleClose}
                open={open}
            >
                <DialogTitle >
                    Thông Tin Authorities
                </DialogTitle>
                <DialogContent >
                    <div className="input-id">
                        <TextField
                            id="outlined-name"
                            label="ID"
                            name="id"
                            onChange={onChangeHandler}
                            variant="outlined"
                            value={dataAuthorities.id}
                        />
                    </div>
                    <div className="input-name">
                    <label htmlFor="name">User name</label>
                        <FormControl variant="outlined" >
                            <Select
                            native
                            name="account"
                            onChange={onChangeHandler}
                            value={dataAuthorities.account.username}
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
                    <label htmlFor="name">Role ID</label>
                        <FormControl variant="outlined" >
                            <Select
                            native
                            name="role"
                            onChange={onChangeHandler}
                            value={dataAuthorities.role.id}
                            >
                                {
                                    role.map((val, idx) => {
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
                                    <TableCell> RoleID </TableCell>
                                    < TableCell> Action </TableCell>
                                </TableRow>
                            </TableHead>
                            {authorities.length > 0 ?
                                <TableBody className="table-body">
                                    {authorities.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((value, index) => {
                                        return (
                                            <TableRow>
                                                <TableCell > {value.id} </TableCell>
                                                <TableCell> {value.account.username} </TableCell>
                                                <TableCell> {value.role.id} </TableCell>
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
                        {authorities.length < 0 ? <div className="table-body">dfdsfds</div> : null}
                    </TableContainer>
                </Paper>
            </div>
            <div className="trang-ad">
                <Pagination count={pageff} variant="outlined" shape="rounded" page={page} onChange={handleChangePage} />
            </div>
        </div>
    );
}
export default Authorities;