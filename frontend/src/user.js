import Cookies from "js-cookie";

const user = () => {
    let jwtPayload = JSON.parse(atob(Cookies.get("jwt").split(".")[1]));
    let userInfo = {
        userID: jwtPayload.email.split("@")[0],
        email: jwtPayload.email,
        admin: jwtPayload.admin,
        instructor: jwtPayload.instructor,
        reviewer: jwtPayload.reviewer,
    }
    return (userInfo);
}

export default user;