import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import cookies from 'js-cookie';

const AdminWrapper = () => {

    const [admin, isAdmin] = useState(false);
    const [serverFinished, setServerFinished] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:9000/api/allUsers/info", { headers: { "token": cookies.get("jwt") } })
            .then(res => {
                if (res.data.administrator === 1) {
                    isAdmin(true);
                }
                setServerFinished(true);
            })
            .catch(err => {
                alert(err);
                setServerFinished(true);
            });
    }, []);

    //returns to home page
    return (serverFinished ? (admin ? <Outlet /> : <Navigate to="/home" />) : "");
}

export default AdminWrapper;