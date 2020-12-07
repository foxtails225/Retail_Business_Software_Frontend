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
    updateMerchantVariantPrices, getMerchantVariantPrices
} from "../../../store/actions/variant";

class PriceMerchantVariant extends React.Component {
    constructor(props) {
        super(props);
        this.refPriceVars = {};
        this.state = {
            data:
            {
                tshirts: ['', '', '', '', ''],
                stickers: ['', '', '', '', ''],
                mugs: ['', '', '', '', ''],
                toteBags: ['', '', '', '', ''],
                cushionCovers: ['', '', '', '', ''],
                kids: ['', '', '', '', ''],
                hoodies: ['', '', '', '', ''],
            },
            isEdit: {
                tshirts: false,
                stickers: false,
                mugs: false,
                toteBags: false,
                cushionCovers: false,
                kids: false,
                hoodies: false
            },
            data_th: [
                'Australia(AUD)',
                'Cananda(CAD)',
                'United States(USD)',
                'United Kingdom(GBP)',
                'Europe (EUR)',
            ],
        };
        this.props.getMerchantVariantPrices();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.prices) {
            if (nextProps.prices.length > 0) {
                let { data } = this.state;
                nextProps.prices.map((price) => {
                    switch (price.master) {
                        case 'tshirts':
                            data.tshirts = [price.australia_price, price.canada_price, price.usa_price, price.uk_price, price.europe_price];
                            break;
                        case 'stickers':
                            data.stickers = [price.australia_price, price.canada_price, price.usa_price, price.uk_price, price.europe_price];
                            break;
                        case 'mugs':
                            data.mugs = [price.australia_price, price.canada_price, price.usa_price, price.uk_price, price.europe_price];
                            break;
                        case 'toteBags':
                            data.toteBags = [price.australia_price, price.canada_price, price.usa_price, price.uk_price, price.europe_price];
                            break;
                        case 'cushionCovers':
                            data.cushionCovers = [price.australia_price, price.canada_price, price.usa_price, price.uk_price, price.europe_price];
                            break;
                        case 'kids':
                            data.kids = [price.australia_price, price.canada_price, price.usa_price, price.uk_price, price.europe_price];
                            break;
                        case 'hoodies':
                            data.hoodies = [price.australia_price, price.canada_price, price.usa_price, price.uk_price, price.europe_price];
                            break;
                    }
                });
                this.setState({ data: data });
            }
        }

        if (nextProps.responseErrors) {
            this.showNotification(nextProps.responseErrors);
            this.props.getMerchantVariantPrices();
        }
    }

    Capitalize(str) {
        if (str == 'cushioncovers') {
            str = 'cushion Covers';
        } else if (str == 'totebags') {
            str = 'tote bags';
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
                    {this.state.data_th[index]}
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
        if (this.state.data[type].length) {
            return (<tr >
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
                    })
                }
            </tr>)
        }
    }

    handleEdit(e, type) {
        let { isEdit } = this.state;
        isEdit[type] = !isEdit[type];
        this.setState({ isEdit: isEdit });
        if (!isEdit[type]) {
            this.props.updateMerchantVariantPrices({ master: type, prices: this.state.data[type] });
        }
    }

    getbody() {
        var self = this;
        {
            var divTable = Object.keys(this.state.data).map(key => {
                return (
                    <Row key={key}>
                        <Col md={12} xl={12}>
                            <div className="div-tbl-merchant-prices-variant">
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
                <MainHeader name="Variant Merchant Prices" parentName="Variant" />
                <Container className="mt--6 merchant-price-variant-container" fluid>
                    <Card style={{ minHeight: "700px" }}>
                        <CardBody>
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
    prices: variant.merchantPrices,
    responseErrors: variant.errors,
    message: variant.message,
});

export default connect(mapStateToProps, {
    getMerchantVariantPrices,
    updateMerchantVariantPrices
})(PriceMerchantVariant);