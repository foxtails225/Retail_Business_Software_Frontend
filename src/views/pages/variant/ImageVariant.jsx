import React from "react";
import { connect } from "react-redux";

import classnames from "classnames";
import NotificationAlert from "react-notification-alert";
import {
  Table,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  Container,
} from "reactstrap";

import MainHeader from "../../components/headers/MainHeader";

import {
  updateVariantImages, getVariantImages
} from "../../../store/actions/variant";

class ImageVariant extends React.Component {
  constructor(props) {
    super(props);
    this.refImgVars = {};
    this.state = {
      data:
      {
        tshirts: ["", "", "", "", "", ""],
        mugs: ["", "", "", "", "", ""],
        toteBags: ["", "", "", "", "", ""],
        cushionCovers: ["", "", "", "", "", ""],
        kids: ["", "", "", "", "", ""],
        hoodies: ["", "", "", "", "", ""]
      },
      isEdit: {
        tshirts: false,
        mugs: false,
        toteBags: false,
        cushionCovers: false,
        kids: false,
        hoodies: false
      },
      responseErrors: "",
    };
    this.props.getVariantImages();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.images) {
      if (nextProps.images.length > 0) {
        let { data } = this.state;
        nextProps.images.map((image) => {
          switch (image.master) {
            case 'tshirts':
              data.tshirts = [image.image1, image.image2, image.image3, image.image4, image.image5, image.image6];
              break;
            case 'stickers':
              data.stickers = [image.image1, image.image2, image.image3, image.image4, image.image5, image.image6];
              break;
            case 'mugs':
              data.mugs = [image.image1, image.image2, image.image3, image.image4, image.image5, image.image6];
              break;
            case 'toteBags':
              data.toteBags = [image.image1, image.image2, image.image3, image.image4, image.image5, image.image6];
              break;
            case 'cushionCovers':
              data.cushionCovers = [image.image1, image.image2, image.image3, image.image4, image.image5, image.image6];
              break;
            case 'kids':
              data.kids = [image.image1, image.image2, image.image3, image.image4, image.image5, image.image6];
              break;
            case 'hoodies':
              data.hoodies = [image.image1, image.image2, image.image3, image.image4, image.image5, image.image6];
              break;
          }
        });
        this.setState({ data: data });
      }
    }

    if (nextProps.responseErrors) {
      this.showNotification(nextProps.responseErrors);
      if (nextProps.responseErrors != 'There is a server connection Error, Try Later.') {
        this.props.getVariantImages();
      }
    }
  }

  Capitalize(str) {
    if (str == 'cushionCovers') {
      str = 'Cushion Covers';
    } else if (str == 'toteBags') {
      str = 'Tote Bags';
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  tableHeads(type) {
    let columns = this.state.data[type].map((column, index) => {
      return (
        <th
          scope="col"
          className="text-center"
          style={{ "width": "17%" }}
          key={index}
        >
          {"Image " + (index + 1)}
        </th>
      );
    }
    );
    return columns;
  }

  emitChange(e, type, index) {
    let { data } = this.state;
    data[type][index] = e.target.innerHTML;
  }

  dataList(type) {
    var aryRef = [];
    if (this.state.data[type].length) {
      return <tr >
        {
          this.state.data[type].map((data, index) => {
            return (
              <td className="text-center" key={index}
                contentEditable={this.state.isEdit[type]}
                onInput={e => this.emitChange(e, type, index)}
                onBlur={e => this.emitChange(e, type, index)}
                dangerouslySetInnerHTML={{ __html: data }}
                style={{ width: '40px', height: '40px', border: this.state.isEdit[type] ? '2px solid' : '1px' }}>
              </td>
            )
          }
          )
        }
      </tr>
    }
  }

  handleEdit(e, type) {
    let { isEdit } = this.state;
    isEdit[type] = !isEdit[type];
    this.setState({ isEdit: isEdit });
    if (!isEdit[type]) {
      this.props.updateVariantImages({ master: type, images: this.state.data[type] });
    }
  }

  getbody() {
    var self = this;
    {
      var divTable = Object.keys(this.state.data).map(key => {
        return (
          <Row key={key}>
            <Col md={12} xl={12}>
              <div className="div-tbl-images-variant">
                <div className="div-tbl-title-imgVar">
                  <Row>
                    <Col style={{ tableLayout: 'fixed', width: "300px" }}>
                      <h2>
                        {this.Capitalize(key)}
                      </h2>
                    </Col>
                    <Col>
                      <Button size="sm" color="primary" onClick={e => self.handleEdit(e, key)}>
                        <i className={classnames({ 'fas fa-pen': !self.state.isEdit[key], 'fas fa-save': self.state.isEdit[key] })} />
                      </Button>
                    </Col>
                  </Row>

                </div>
                <Table className="align-items-center" bordered responsive>
                  <thead className="thead-light">
                    <tr>{this.tableHeads(key)}</tr>
                  </thead>
                  <tbody>
                    {this.dataList(key)}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>);
      })
    }
    return divTable;
  }

  showNotification = message => {
    let options = {
      place: "tr",
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title" dangerouslySetInnerHTML={{ __html: message }}>
          </span>
        </div>
      ),
      type: "error",
      icon: "ni ni-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  };

  render() {
    return (
      <>
        <div className="rna-wrapper">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <MainHeader name="Variant Images" parentName="Variant" />
        <Container className="mt--6 image-variant-container" fluid>
          <Card style={{ minHeight: "700px" }}>
            <CardBody>
              <Row>
                <Col md={12}>
                  <p className="font-weight-bold" style={{ fontSize: '0.9rem' }}>
                    <i
                      className="fas fa-exclamation-triangle"
                      style={{ color: "#cece14", fontSize: '1rem' }}
                    ></i>
                    <span className="ml-2">{`All URLs has to be from Cloudinary.`}</span><br />
                    <span className="ml-4">{`Shortcode: [$artwork] (for all other products); [$artwork_front]; [$artwork_back] (for mugs)`}</span>
                  </p>
                </Col>
              </Row>
              {
                this.getbody()
              }
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({ variant }) => ({
  images: variant.images,
  responseErrors: variant.errors,
  message: variant.message,
});

export default connect(mapStateToProps, {
  getVariantImages,
  updateVariantImages
})(ImageVariant);