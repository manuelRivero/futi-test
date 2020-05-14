import React, { useState } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import styles from "./loginForm.module.css";
import eyeIcon from "./../../assets/images/group-7.png";
import logo from "./../../assets/images/combined-shape.png";

const url =
  "http://futi-dev-lb-2118413634.us-west-2.elb.amazonaws.com/futi/v1.0/login/internal";

export default function LoginForm() {
  const [form, setForm] = useState({
    user: "jpacheco@muy3o2c.com",
    password: "password",
  });

  const [rememberAccount, setRememberAccount] = useState(true);
  const [passwordHidden, setpasswordHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setuserData] = useState(null);
  const [tokenData, settokenData] = useState(null);

  const changeHandler = (e) => {
    let input = e.target.name;
    let newValue = e.target.value;
    setForm((oldState) => ({ ...oldState, [input]: newValue }));
  };
  const checkBoxHandler = (e) => {
    setRememberAccount(e.target.checked);
  };
  const togglePasswordVisivility = () => {
    setpasswordHidden((passwordHidden) => !passwordHidden);
  };

  const submitHandler = (e) => {
    const form = e.currentTarget;
    setIsLoading(true)
    // request data
    let data = {
      email: "jpacheco@muy3o2c.com",
      password: "password",
      grant_type: "password",
      client_id: "futi",
      client_secret: "winmorefuti",
    };
    e.preventDefault();
    e.stopPropagation();

    if (form.checkValidity() === false) {
      return null;
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {

        const {
          access_token,
          expires_in,
          refresh_token,
          scope,
          token_type,
          user,
        } = res.data;
        setIsLoading(false)
        setuserData(user);
        settokenData({
          access_token,
          expires_in,
          refresh_token,
          scope,
          token_type,
        });
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      });
  };

  return (
    <div className="p-5">
      <img src={logo} alt="logo" className="mb-5 pb-3 " />
      <h3>
        <strong>¡Bienvenido!</strong>
      </h3>
      <p>Ingresa a tu cuenta</p>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Control
            required
            id="user"
            value={form.user}
            onChange={changeHandler}
            name="user"
            type="email"
            placeholder="Correo"
            className={styles.input}
          />
        </Form.Group>

        <Form.Group className={styles.EyeInput}>
          <Form.Control
            required
            id="password"
            minLength={6}
            type={passwordHidden ? "password" : "text"}
            value={form.password}
            onChange={changeHandler}
            name="password"
            placeholder="Contraseña"
            className={styles.input}
          />
          <div className={styles.EyeBtn} onClick={togglePasswordVisivility}>
            <img src={eyeIcon} alt="password visivility" />
          </div>
        </Form.Group>
        <Button
          variant="success"
          className={styles.SubmitBtn}
          type="submit"
          block
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            "Ingresar"
          )}
        </Button>
        <Row style={{ fontSize: "14px" }} className="mt-3">
          <Col xs={12} sm={6}>
            <Form.Group>
              <Form.Check
                type="checkbox"
                name="remember"
                id="checkbox"
                checked={rememberAccount}
                label="Recordarme"
                custom
                onChange={checkBoxHandler}
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} className="text-right">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
