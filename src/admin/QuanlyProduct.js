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

function QuanlyProduct() {

    const listProduct = {
        id: "",
        image: "",
        category: {
            id: ""
        }
    };
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [click, setClick] = useState(-1);
    const [dataProduct, setDataProduct] = useState(listProduct);

    const onClickHandler = function (event, value, index) {
        setClick(index);
        setDataProduct(value);
    }

    useEffect(() => {
        const url = 'http://localhost:8080/api/v1/rest/categories';
        axios({
            url: url,
            method: 'GET',

        })
            .then((response) => {
                const { data } = response;
                setCategory(data)
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
            data: dataProduct,
        })
            .then((response) => {
                const { data } = response;
                setProduct(data)
            })
            .catch((error) => {
                console.log(error, error.response)
            })
    }, []);

    //Create
    const onCreateProduct = () => {
        const url = 'http://localhost:8080/api/v1/rest/products';
        axios({
            url: url,
            method: 'POST',
            data: dataProduct,
        })
            .then((response) => {
                const { data } = response;
                setProduct([
                    ...product,
                    data
                ])
                alert("Thêm mới Thành Công")
            })
            .catch((error) => {
                alert("Thất bại")
                console.log(error, error.response)
            })
    }

    // Update
    const onUpdateProduct = () => {
        let id1;
        if (page == 1) {
            id1 = product[click].id
        }
        else {
            const ad1 = click + 3 * (page - 1)
            id1 = product[ad1].id
        }
        const url = `http://localhost:8080/api/v1/rest/products/${id1}`;
        axios({
            url: url,
            method: 'PUT',
            data: dataProduct
        })
            .then((response) => {
                const { data } = response;
                setProduct((oldState) => {
                    let newState = oldState.map((val, idx) => {
                        return val.id == id1 ? data : val;
                    })
                    return newState;
                })
            })
            .catch((error) => {
                console.log(error, error.response)
            })
    }
    // const onFileChangeHandler = (e) => {
    //     e.preventDefault();
    //     const url = "http://localhost:8080/api/v1/rest/upload/folderimg";
    //     const formData = new FormData();
    //     formData.append("file", e.target.files[0]);
    //     console.log("formdat",  formData.append("file", e.target.files[0]))
    //     axios({
    //         url: url,
    //         method: "POST",
    //         data: formData,
    //         headers: {
    //             "content-type": "multipart/form-data",
    //         },
    //     })
    //         .then((respon) => {
    //             const { data } = respon;
    //             const img = data.name;
    //             console.log("ảnh",img);
    //             // setProduct([
    //             //     ...product,
    //             //     img
    //             // ]);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // };

    //Delete
    const onHandleDelete = (id) => {
        const url = `http://localhost:8080/api/v1/rest/products/${id}`;
        axios({
            url: url,
            method: 'DELETE',
            data: dataProduct
        })
            .then((rensponse) => {
                const dele = product.filter(pro => id !== pro.id)
                setProduct(dele)
                alert("Xóa Thành Công")
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
            onCreateProduct();
            setDataProduct("");
            handleClose();
        } else {
            onUpdateProduct();
            handleClose();

        }
    }
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setDataProduct({
            ...dataProduct,
            [name]: value
        })
        if (name === "category") {
            setDataProduct({
                ...dataProduct,
                category: {
                    id: value,
                }
            })
        }
    }

    const onFileChangeHandler = (e) => {
        e.preventDefault();
        const url = "http://localhost:8080/api/v1/rest/upload/folderimg";
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        // console.log("formdat",  formData.append("file", e.target.files[0]))
        //const { name, value } = e.target.files[0];
        axios({
            url: url,
            method: "POST",
            data: formData,
            headers: {
                "content-type": "multipart/form-data",
            },
        })
            .then((respon) => {
                const { data } = respon;
                console.log("ảnh", data);
                setDataProduct({
                    ...dataProduct,
                    image : data.name
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
        setDataProduct(listProduct);
    };
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        // console.log(newPage)
    };
    const pageff = Math.ceil(product.length / 3)
    return (
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
                    {/* <div className="input-i">
                        <TextField
                            id="outlined-name"
                            label="ID"
                            name="id"
                            onChange={onChangeHandler}
                            variant="outlined"
                            value={dataProduct.id}
                        />
                    </div> */}
                    <div className="input-name">
                        <TextField
                            id="outlined-name"
                            label="Name"
                            name="name"
                            onChange={onChangeHandler}
                            variant="outlined"
                            value={dataProduct.name}
                        />
                    </div>
                    <div className="input-name">
                        <img className="image-pr" src={`http://localhost:8080/assets/folderimg/${dataProduct.image}`} />
                        {/* <TextField
                            id="file"
                            type="file"
                            id="outlined-name"
                            onChange={onChangeHandler}
                            variant="outlined"
                            name="image"
                        //value={dataProduct.image}
                        /> */}
                        <input type="file" onChange={onFileChangeHandler} name="image" />

                    </div>
                    <div className="input-name">
                        <TextField
                            id="outlined-name"
                            label="Price"
                            onChange={onChangeHandler}
                            variant="outlined"
                            name="price"
                            value={dataProduct.price}
                        />
                    </div>
                    <div className="input-name">
                        <input
                            id="date"
                            type="date"
                            name="createDate"
                            onChange={onChangeHandler}
                            value={dataProduct.createDate}
                        />
                    </div>
                    <div className="input-name">
                        <label htmlFor="name">Available</label>
                        <RadioGroup row aria-label="ptrueosition" onChange={onChangeHandler} name="position" defaultValue="top">
                            <FormControlLabel type="radio" value="false" checked={dataProduct.available === false} name="available" control={<Radio color="primary" />} label="Đã có hàng" />
                            <FormControlLabel type="radio" value="true" checked={dataProduct.available === true} name="available" control={<Radio color="primary" />} label="Chưa có hàng" />
                        </RadioGroup>
                    </div>
                    <div className="input-name">
                        <label htmlFor="name">Category</label>
                        <FormControl variant="outlined" >
                            <Select
                                native
                                name="category"
                                onChange={onChangeHandler}
                                value={dataProduct.category.id}
                            >
                                {
                                    category.map((val, idx) => {
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
                                    <TableCell> Image </TableCell>
                                    <TableCell> Price </TableCell>
                                    <TableCell> CreateDate </TableCell>
                                    <TableCell> Available </TableCell>
                                    <TableCell> CategoryId </TableCell>
                                    < TableCell> Action </TableCell>
                                </TableRow>
                            </TableHead>
                            {product.length > 0 ?
                                <TableBody className="table-body">
                                    {product.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((value, index) => {
                                        return (
                                            <TableRow>
                                                <TableCell > {value.id} </TableCell>
                                                <TableCell> {value.name} </TableCell>
                                                <TableCell> {value.image} </TableCell>
                                                <TableCell> {value.price} </TableCell>
                                                <TableCell> {value.createDate} </TableCell>
                                                <TableCell> {value.available == 0 ? 'Đã có hàng' : 'Chưa có hàng'} </TableCell>
                                                <TableCell> {value.category.name} </TableCell>
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
                        {product.length < 0 ? <div className="table-body">dfdsfds</div> : null}
                    </TableContainer>
                </Paper>
            </div>
            <div className="trang-ad">
                <Pagination count={pageff} variant="outlined" shape="rounded" page={page} onChange={handleChangePage} />
            </div>
        </div>
    );
}
export default QuanlyProduct;