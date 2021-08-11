import React from "react";
import "../App.css";
// import "../Register.css";
import { NavLink, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const history = useHistory();
  const validate = (values) => {
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    } else if (!regName.test(values.name)) {
      errors.name = "Invalid Name";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (values.email.length < 4) {
      errors.email = "Must be at least 4 characters long";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password < 8) {
      errors.password = "Must be at least 8 characters long";
    }

    if (!values.cpassword) {
      errors.cpassword = "Required";
    } else if (values.cpassword !== values.password) {
      errors.cpassword = "Second password must match with first password";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      work: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate,
    onSubmit: (values) => {
      console.log("Called submit button");
      postData(JSON.stringify(values, null, 2));
    },
  });

  const postData = async (jsonString) => {
    console.log("In postdata method");
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonString,
    });
    console.log(
      "In post data waiting for response, response from prev await",
      res,
    );
    const data = await res.json();
    console.log("Data got", data);

    if (res.status === 409) {
      const notify = () => {
        toast("Email already exist. Please login", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      };
      await notify();
      await setTimeout(() => {
        history.push("/login");
      }, 2000);
      return;
    }

    // !201 means User creation was not successful
    if (res.status !== 201 || data.status === 422 || !data) {
      console.log(data);
      const notify = () =>
        toast.error(
          "Registration Failed! Please try again or use a different email",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          },
        );
      notify();
    } else {
      const notify = () => {
        toast.success("Yay! Registration Successful.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log("Called notify");
      };

      await notify();

      await setTimeout(() => {
        history.push("/login");
      }, 2000);
    }
  };

  return (
    <section className="signup">
      <div className="container mt-4 register_div w-25 p-4">
        <form
          method="POST"
          class="register_form"
          onSubmit={formik.handleSubmit}
        >
          <h4>Register</h4>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <span>{formik.errors.name}</span>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <span>{formik.errors.phone}</span>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="email">Work</label>
            <input
              type="text"
              className="form-control"
              placeholder="Let us know where you excel at..."
              name="work"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.work}
            />
            {formik.touched.work && formik.errors.work ? (
              <span>{formik.errors.work}</span>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <span>{formik.errors.email}</span>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <span>{formik.errors.password}</span>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Re-Enter password"
              name="cpassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cpassword}
            />
            {formik.touched.cpassword && formik.errors.cpassword ? (
              <span>{formik.errors.cpassword}</span>
            ) : null}
          </div>
          <div className="register_btn">
            <button
              type="submit"
              className="btn btn-dark btn-block btn-md mb-2"
            >
              Register
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <NavLink to="/login">log in?</NavLink>
          </p>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Register;
