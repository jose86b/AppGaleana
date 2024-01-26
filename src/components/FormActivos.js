import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import '../styles/Main.css'

export default function FormActivos() {
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase text-center">Formulario de registros</h2>
                  <p className=" mb-5  text-center">¡Ingrese la informacion que se pide!</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-center">
                        Nombre
                        </Form.Label>
                        <Form.Control type="Text" placeholder="Ingresa tu nombre completo" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-center">
                        Descripción
                        </Form.Label>
                        <Form.Control type="text" placeholder="Ingrese una descripcion" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-center">
                        N° Serie
                        </Form.Label>
                        <Form.Control type="text" placeholder="Ingrese la serial" />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Ubicacion</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese su ubicacion" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Condición</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese su condición" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Guardar
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