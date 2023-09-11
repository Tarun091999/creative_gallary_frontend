import { Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useState , useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";


export default function Signup() {
  const navigate = useNavigate();
  useEffect(()=>{
   
  },[])
  const initialValues = {
    userEmail: "",
    userPassword: "",
    confirmUserPass: "",
  };
  

  const onSubmit = (values) => {
    console.log("form data", values);
    if (values.userPassword != values.confirmUserPass) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Enter Same Password",
        showConfirmButton: false,
        timer: 650,
        width: "250px",
      });
    }
    else{
        axios.post("https://localhost:7133/api/Authorization/signup", {
            "userEmail":values.userEmail,
            "userPassword":values.userPassword,
            "userName":values.userEmail
        }).then((res)=>{
              navigate("/login")
        }).catch(err=>{
          Swal.fire({
            position: "center",
            icon: "error",
            title: "You Already Have An Account ",
            showConfirmButton: false,
            timer: 1500,
            width: "300px",
          });
        })
    }
  };

  const validationSchema = Yup.object({
    userEmail: Yup.string().required("UserName is required"),
    userPassword: Yup.string().required("Userpassword is required"),
    confirmUserPass: Yup.string().required(" Confirm Userpassword is required"),
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
          
            <h4 className="text-center "> Add With Creative Gallary  </h4>
            <hr className="w-50 m-auto p-2" />  
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              id="userEmail"
              name="userEmail"
              className="form-control"
              placeholder="Please Enter Your Email Address "
              {...formik.getFieldProps("userEmail")}
              value={formik.values.userName}
              onChange={formik.handleChange}
            />
            {formik.touched.userEmail && formik.errors.userEmail ? (
              <div style={{ color: "black" }}>{formik.errors.userEmail}</div>
            ) : null}
            <br />
            <input
              type="password"
              id="userPass"
              name="userPass"
              className="form-control"
              placeholder="Please Enter Your Password"
              {...formik.getFieldProps("userPassword")}
              value={formik.values.userPassword}
              onChange={formik.handleChange}
            />
            {formik.touched.userPassword && formik.errors.userPassword ? (
              <div style={{ color: "black"}}>{formik.errors.userPassword}</div>
            ) : null}
            <br />
            <input
              type="password"
              id="confirmUserPass"
              name="confirmUserPass"
              className="form-control"
              placeholder="Please Enter Your Password"
              {...formik.getFieldProps("confirmUserPass")}
              value={formik.values.confirmUserPass}
              onChange={formik.handleChange}
            />
            {formik.touched.confirmUserPass && formik.errors.confirmUserPass ? (
              <div style={{ color: "black"}}>
                {formik.errors.confirmUserPass}
              </div>
            ) : null}
            <br />

            <Button type="submit" className="w-100" variant="contained" color="secondary">
              Create Account
            </Button>
          </form>

          <div className="account-link-div">
          <Link to="/login" className="bottom-account-link">Already have an account?</Link>
          </div>
          </div>
      </div>
      </div>
    </>
  );
}
