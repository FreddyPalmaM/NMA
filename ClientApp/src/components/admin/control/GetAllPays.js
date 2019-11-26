import React, { Component } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Jumbotron,
  Card,
  CardBody,
  Label
} from "reactstrap";
import Session from "../../auth/Session";
import { DateUtil } from "../../../Utils";

export class GetAllPays extends Component {
  constructor(props) {
    super(props);
    (this.state = {
      formValues: {
        run: Session.getUser().run
      },
      data: [],
      isLoading: false
    }),
      console.log(this);
  }

  componentWillMount() {
    const newStates = { ...this.state};
    newStates.isLoading = true;
    this.setState(newStates, () =>{
      fetch("http://localhost:51424/api/Pays/getAllPays/", {
        method: "get",
        mode: "cors"
      })
        .then(response => response.json())
        .then(json =>{
          newStates.data = json;
        })
        .catch(e => console.log(e.message))
        .finally( () => {
          newStates.isLoading = false;
          this.setState(newStates);
        });
    });
    
  }

  render() {

    if (this.state.isLoading) {
      return (
        <Container>
          <Row>
            <Col lg={{ size: 4, offset: 4 }}>
              <Jumbotron>
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status" style={{ marginRight: 9, color: "#5e8f3c" }}>
                    <span class="sr-only"></span>
                  </div>
                    <Label>Cargando...</Label>
                </div>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      );
    }

    if (this.state.data.length == 0) {
      return (
        <Container>
          <Row>
            <Col lg={{ size: 4, offset: 4 }}>
              <Jumbotron>
                <h3>No hay datos</h3>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      );
    }

    return (
      <Container>
        <Row>
          <Col lg="12">
            <Jumbotron>
              <div>
                <h1>Pagos</h1>
                <hr />
                <div1></div1>
                <div2>
                  <Table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>RUT</th>
                        <th>Pago</th>
                        <th>Fecha del Pago</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map(element => {
                        var date = element.datePay.split("T");
                        return (
                          <tr>
                            <td>{element.id}</td>
                            <td>{element.idCompany}</td>
                            <td>{element.cost}</td>
                            <td>{DateUtil.toString(date[0])}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div2>
              </div>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}
