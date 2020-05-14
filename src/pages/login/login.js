import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import styles from "./login.module.css";
import administradorImg from "./../../assets/images/administrador.png"

import LoginForm from "../../components/loginForm/loginForm";

export default function login() {
  return (
    <Container className={styles.Login}>
      <Row>
        <Col xs={6} className="p-0 p-lg-5 mb-5">
          <LoginForm />
        </Col>
        <Col xs={6} className="p-0">
          <div className={styles.AdministradorImg}>
                    <img src={administradorImg} alt="administrador"/>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
