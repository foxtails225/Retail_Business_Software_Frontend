import React from "react";
import { connect } from "react-redux";
import ReeValidate from "ree-validate";

import NotificationAlert from "react-notification-alert";
import {
    Table,
    Button,
    Row,
    Col,
    Card,
    CardBody,
    Container,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Form,
    Input,
    FormGroup,
    UncontrolledAlert
} from "reactstrap";

import MainHeader from "../../components/headers/MainHeader";

import {
    getVariantPrices,
    addVariantPrice,
    deleteVariantPrice,
    defaultVariantPrice
} from "../../../store/actions/variant";

class PriceVariant extends React.Component {
    constructor(props) {
        super(props);
        this.refPriceVars = {};
        this.state = {
            data:
            {
                tshirts: [],
                stickers: [],
                msgs: [],
                mxgs: [],
                toteBags: [],
                cushionCovers: [],
                kids: [],
                hoodies: []
            },
            modalPrice: {
                price: 0
            },
            responseErrors: "",
            errors: {},
            isModal: false,
            master: 'tshirts',
            isDeleteModal: false
        }

        this.validator = new ReeValidate({
            price: "required|min_value:0",
        });

        this.props.getVariantPrices();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.message) {
            this.showNotification(nextProps.message);
            this.setState(
                { isModal: false },
                () => {
                    this.props.getVariantPrices();
                }
            );
        }

        if (nextProps.prices) {
            var masters = Object.keys(nextProps.prices);
            if (masters.length > 0) {
                let { data } = this.state;
                for (let master of masters) {
                    data[master] = nextProps.prices[master];
                }
                this.setState({ data: data });
            }
        }

        if (nextProps.responseErrors) {
            this.showNotification(nextProps.responseErrors);
            this.setState({ responseErrors: nextProps.responseErrors });
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        const { modalPrice } = this.state;
        modalPrice[name] = value;
        this.setState({ modalPrice });
        const { errors } = this.state;
        if (name in errors) {
            const validation = this.validator.errors;
            this.validator.validate(name, value).then(() => {
                if (!validation.has(name)) {
                    delete errors[name];
                    this.setState({ errors });
                }
            });
        }
    };

    handleBlur = e => {
        const { name, value } = e.target;
        const validation = this.validator.errors;

        if (value === "") {
            return;
        }

        this.validator.validate(name, value).then(() => {
            if (validation.has(name)) {
                const { errors } = this.state;
                errors[name] = validation.first(name);
                this.setState({ errors });
            }
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { modalPrice, master } = this.state;
        this.validator.validateAll(modalPrice).then(success => {
            if (success) {
                modalPrice.master = master;
                this.props.addVariantPrice(modalPrice);
            }
        });
    };

    showPriceModal(master) {
        this.setState({
            isModal: true,
            modalPrice: {
                price: ""
            },
            responseErrors: "",
            errors: {}
        });
        this.setState({ master: master });
    }

    getModal() {
        const {
            master,
            errors,
            isModal,
            modalPrice,
            responseErrors,
        } = this.state;
        return (
            <Modal
                isOpen={isModal}
                toggle={() => {
                    this.setState({ isModal: !isModal });
                }}
            >
                <Form
                    role="form"
                    method="POST"
                    onSubmit={this.handleSubmit}
                >
                    <ModalHeader color="primary">Variant Price Add</ModalHeader>
                    <ModalBody>
                        {responseErrors && (
                            <UncontrolledAlert color="warning">
                                <span className="alert-text ml-1">
                                    <strong>{responseErrors}</strong>
                                </span>
                            </UncontrolledAlert>
                        )}
                        <FormGroup>
                            <label htmlFor="tshirtsFormControlInput">
                                {this.Capitalize(master)}
                            </label>
                            <Input
                                name="price"
                                required
                                value={modalPrice.price}
                                placeholder="Please Input Price"
                                type="number"
                                onBlur={this.handleBlur}
                                onChange={this.handleChange}
                                invalid={'price' in errors}
                            />
                            <div className="invalid-feedback">
                                {errors.price}
                            </div>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="secondary"
                            onClick={e => {
                                this.setState({ isModal: false });
                            }}
                        >
                            Cancel
                        </Button>
                        <Button color="primary" type="submit">
                            Save
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }

    Capitalize(str) {
        if (str === 'cushionCovers') {
            str = `Cushion<br>Covers`;
        } else if (str === 'toteBags') {
            str = 'Tote Bags';
        } else if (str === 'msgs') {
            str = 'Mugs 11oz'
        } else if (str === 'mxgs') {
            str = 'Mugs 15oz'
        } else if (str === 'kids') {
            str = 'Kids Tshirt'
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    tableHeads(master) {
        return (
            <>
                <th
                    scope="col"
                    className="text-center"
                    style={{paddingLeft: '3px', paddingRight: '3px'}}
                    dangerouslySetInnerHTML={{ __html: this.Capitalize(master) }}
                >
                </th>
                <th
                    scope="col"
                    className="text-center"
                >
                    <Button
                        size="sm"
                        color="primary"
                        data-dz-remove
                        className="btn-createprice"
                        color="primary"
                        onClick={() => { this.showPriceModal(master) }}
                    >
                        <i className="fas fa-pen" />
                    </Button>
                </th>
            </>
        );
    }

    defaultItem(id) {
        this.props.defaultVariantPrice(id);
    }

    deleteItem(id) {
        this.props.deleteVariantPrice(id);
    }

    dataList(master) {
        var aryRef = [];
        if (this.state.data[master]) {
            return this.state.data[master].map((item) => {
                return (
                    <tr key={master + item.id}>
                        <td style={{paddingLeft: '3px', paddingRight: '3px'}}>
                            {item.price} {item.default == 1 && <span style={{ 'color': 'green' }}>&#10004;</span>}
                        </td>
                        <td>
                            {
                                item.default == 0 && <Button
                                    size="sm"
                                    color="primary"
                                    data-dz-remove
                                    className="btn-createprice"
                                    color="primary"
                                    onClick={() => { this.defaultItem(item.id) }}
                                >
                                    <i className="fas fa-check" />
                                </Button>
                            }
                            <Button
                                size="sm"
                                color="primary"
                                data-dz-remove
                                className="btn-createprice"
                                color="primary"
                                onClick={() => { this.deleteItem(item.id) }}
                            >
                                <i className="fas fa-trash" />
                            </Button>
                        </td>
                    </tr>
                );
            });
        }
    }

    getbody() {
        var self = this;
        return Object.keys(this.state.data).map(key => {
            return (
                <Col style={{ 'width': '9.2%' }} key={key}>
                    <div className="div-tbl-prices-variant" style={{ 'marginTop': '30px' }}>
                        <div className="tbl-wrapper">
                            {this.getModal()}
                            <Table className="align-items-center" responsive>
                                <thead className="thead-light">
                                    <tr>{this.tableHeads(key)}</tr>
                                </thead>
                                <tbody>
                                    {this.dataList(key)}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Col>);
        })
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
            type: "success",
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
                <MainHeader name="Variant Prices" parentName="Variant" />
                <Container className="mt--6 price-variant-container" fluid>
                    <Card style={{ minHeight: "700px" }}>
                        <CardBody>
                            <Row>
                                {this.getbody()}
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
            </>
        );
    }
}

const mapStateToProps = ({ variant }) => ({
    prices: variant.prices,
    responseErrors: variant.errors,
    message: variant.message,
});

export default connect(mapStateToProps, {
    getVariantPrices,
    addVariantPrice,
    deleteVariantPrice,
    defaultVariantPrice
})(PriceVariant);