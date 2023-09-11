import "../App.css";
import { useFormik } from "formik";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import * as Yup from "yup";
import LoginIcon from "@mui/icons-material/Login";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const initialValues = {
    userEmail: "",
    userPass: "",
  };

  const onSubmit = (values) => {
    console.log("form data", values);
    axios
      .post("https://localhost:7133/api/Authorization/login", {
        userEmail: values.userEmail,
        userPassword: values.userPass,
      })
      .then((res) => {
        console.log(res.data);
        var data = res.data;
        var userEmail = data.email;
        var userId = data.id;
        console.log(userEmail, userId);
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("userEmail", userEmail);
        navigate("/gallary");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "bottom-end",
          icon: "error",
          title: "Incorrect Username And Password",
          showConfirmButton: false,
          timer: 2000,
          width: "250px",
        });
      });
  };

  const validationSchema = Yup.object({
    userEmail: Yup.string().required("UserName is required"),
    userPass: Yup.string().required("Userpassword is required"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <>
      <div className="login-container">
        <div className="login-page-container">
          <div className="login-form-container">
            <div className=" my-2">
              <h4 className="text-center "> Login To Creative Gallary</h4>
              <hr className="w-50 m-auto p-2" />
            </div>
            <form className="login-form" onSubmit={formik.handleSubmit}>
              <input
                type="text"
                placeholder="Enter Your Login Id  "
                id="userEmail"
                name="userEmail"
                className="form-control"
                {...formik.getFieldProps("userEmail")}
                value={formik.values.userEmail}
              />

              {formik.touched.userEmail && formik.errors.userEmail ? (
                <div style={{ color: "black"}}>{formik.errors.userEmail}</div>
              ) : null}

              <br />
              <input
                type="password"
                placeholder="Enter Your Password"
                {...formik.getFieldProps("userPass")}
                name="userPass"
                className="form-control"
                id="userPass"
              />
              {formik.touched.userPass && formik.errors.userPass ? (
                <div style={{ color: "black"}}>{formik.errors.userPass}</div>
              ) : null}

              <br />
              {/* <input type="submit btn btn-primary" value={"Log In"} className="login-button" /> */}
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className="w-100"
                endIcon={<LoginIcon />}
              >
                Login
              </Button>
            </form>

            <div className="account-link-div">
              <Link to="/signup" className="bottom-account-link">
                Click me to create an account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
