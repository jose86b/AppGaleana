import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import '../styles/Main.css'

export default function Register() {
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase text-center">Municipio De Galeana</h2>
                  <p className=" mb-5  text-center">¡Ingrese la informacion que se pide!</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-center">
                        Nombre
                        </Form.Label>
                        <Form.Control type="Text" placeholder="Ingresa tu nombre completo" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                        Dirección de correo electrónico
                        </Form.Label>
                        <Form.Control type="email" placeholder="Ingresa tu correo electronico" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-center">
                        Puesto
                        </Form.Label>
                        <Form.Control type="text" placeholder="Ingresa tu puesto" />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Contraseña" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Confirma tu contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Contraseña" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Registrarse
                        </Button>
                      </div>
                      <p></p>
                      <div className="d-grid">
                        <Button variant="danger" type="submit">
                          Cancelar
                        </Button>
                      </div>
                    </Form>
                    
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}