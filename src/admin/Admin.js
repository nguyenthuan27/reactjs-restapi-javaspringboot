import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import QuanlyAccount from "./QuanlyAccount";
import QuanlyCategories from "./QuanlyCategories";
import QuanlyOrder from "./QuanlyOrder";
import QuanlyProduct from "./QuanlyProduct";
import QuanlyOrderDetails from "./QuanlyOrderDetails";
import Home from "./Home";
import Roles from "./Roles";
import Authorities from "./Authorities";
function Admin() {
    return (
        <Router>
            <div className="form-admin">
                <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
                <link href='https://unpkg.com/boxicons@2.0.8/css/boxicons.min.css' rel='stylesheet'></link>
                <header className="header">
                    <div className="admin-logo"></div>
                    <div className="header-nav">

                        <div className="admin-menu"><Link to="/"><i class='bx bx-home'></i>Home</Link></div>
                        <div className="admin-menu"><Link to="/Account"><i class='bx bxs-user-account'></i>Account</Link></div>
                        <div className="admin-menu"><Link to="/Quanlycategories"><i class='bx bx-category'></i>Category</Link></div>
                        <div className="admin-menu"><Link to="/Product"><i class='bx bxs-data'></i>Product</Link></div>
                        <div className="admin-menu"><Link to="/Order"><i class='bx bx-spreadsheet'></i>Order</Link></div>
                        <div className="admin-menu"><Link to="/OrderDetails"><i class='bx bx-file'></i>OrderDetails</Link></div>
                        <div className="admin-menu"><Link to="/Roles"><i class='bx bxs-user-check'></i>Roles</Link></div>
                        <div className="admin-menu"><Link to="/Authorities"><i class='bx bxs-user-badge'></i>Authorities</Link></div>

                    </div>
                </header>
                <div className="admin-content">
                    <div className="infor-user"></div>
                    <div className="content-use">
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route path="/Quanlycategories">
                                <QuanlyCategories />
                            </Route>
                            <Route path="/Account">
                                <QuanlyAccount />
                            </Route>
                            <Route path="/Product">
                                <QuanlyProduct />
                            </Route>
                            <Route path="/Order">
                                <QuanlyOrder />
                            </Route>
                            <Route path="/OrderDetails">
                                <QuanlyOrderDetails />
                            </Route>
                            <Route path="/Roles">
                                <Roles />
                            </Route>
                            <Route path="/Authorities">
                                <Authorities />
                            </Route>
                        </Switch>

                    </div>
                    <div className="admin-footer"></div>
                </div>
            </div>
        </Router>
    );
}
export default Admin;