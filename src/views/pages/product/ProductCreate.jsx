import React from 'react';
import ReeValidate from 'ree-validate';
import classnames from 'classnames';
import { connect } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import http from '../../../helper/http';
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
} from 'reactstrap';

import MainHeader from '../../components/headers/MainHeader';
import ProductImage from '../product/ProductImage';
import ProductUpload from '../product/ProductUpload';
import { allCategories } from '../../../store/actions/category';
import { allKeywords } from '../../../store/actions/keyword';
import { createProduct, allProductInfo } from '../../../store/actions/product';
import APP_CONST from '../../../helper/constant';

class ProductCreate extends React.Component {
  state = {
    messsge: [],
    artist_list: [],
    printMode_list: [],
    stickerType_list: [],
    price_tshirt: [],
    price_sticker: [],
    price_msg: [],
    price_totebag: [],
    price_cushioncover: [],
    price_Hoodies: [],
    price_kid: [],
    product_image: [],
    price_mxg: [],
    setting: {},
    product: {
      product_title: '',
      source: '',
      tshirt_printmode: '',
      tshirt_image: '',
      p_tshirt: '',
      stickers_width: '',
      stickers_height: '',
      stickers_type: '',
      p_sticker: '',
      artist: '',
      p_msg: '',
      p_mxg: '',
      p_totebag: '',
      p_cushioncover: '',
      p_Hoodies: '',
      p_kid: '',
      tshirt_weight: 0,
      stickers_weight: 0,
      mug_weight: 0,
      totebag_weight: 0,
      cushioncover_weight: 0,
      hoodie_weight: 0,
      kid_weight: 0,
      category: 0,
      keyword: 0,
      shopify_tags: ''
    },
    product_title: '',
    source: '',
    tshirt_printmode: '',
    tshirt_image: '',
    p_tshirt: '',
    stickers_width: '',
    stickers_height: '',
    stickers_type: '',
    p_sticker: '',
    artist: '',
    p_msg: '',
    p_mxg: '',
    p_totebag: '',
    p_cushioncover: '',
    p_Hoodies: '',
    p_kid: '',
    tshirt_weight: 0.2,
    stickers_weight: 0.2,
    mug_weight: 0.2,
    totebag_weight: 0.2,
    cushioncover_weight: 0.2,
    hoodie_weight: 0.2,
    kid_weight: 0.2,
    category: 0,
    keyword: 0,
    shopify_tags: '',

    isShowError: false,
    errors: {},
    success: false,
    categories: [],
    keywords: [],
    searchKeywords: [],
    searchCategories: [],
    tempKeywords: [],
    uploadData: {},
    artworks: {},
    masterUrl: {},
    skipItems: [],
    keyword_value: '',
    category_value: '',
    isActive: false,
    isButtonActive: false,
    responseErrors: '',
    isUploadpanel: false,

    isCheckWin: true,
    isSubmit: false,
    checkResult: {},
    isNext: false,
    isProductImage: false,
  };

  constructor(props) {
    super(props);
    this.validator = new ReeValidate({
      product_title: 'required|min:3',
      source: 'required|min:5|max:120',
      shopify_tags: 'max:120',
      stickers_width: 'required|min_value:0',
      stickers_height: 'required|min_value:0',
      tshirt_weight: 'required|min_value:0',
      stickers_weight: 'required|min_value:0',
      mug_weight: 'required|min_value:0',
      totebag_weight: 'required|min_value:0',
      cushioncover_weight: 'required|min_value:0',
      hoodie_weight: 'required|min_value:0',
      kid_weight: 'required|min_value:0',
      category: 'required|min_value:1',
      keyword: 'required|min_value:1',
    });
    this.props.allProductInfo();
    this.props.allCategories();
    this.props.allKeywords();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories) {
      this.setState({
        categories: nextProps.categories,
        searchCategories: nextProps.categories,
      });
    }
    if (nextProps.keywords) {
      this.setState({
        keywords: nextProps.keywords,
        searchKeywords: nextProps.keywords,
        tempKeywords: nextProps.keywords,
      });
    }
    if (nextProps.artist_list) {
      if (nextProps.artist_list.length > 0) {
        this.setState({
          artist_list: nextProps.artist_list,
          artist: nextProps.artist_list[0].id,
        });
      }
    }
    if (nextProps.printMode_list) {
      if (nextProps.printMode_list.length > 0) {
        this.setState({
          printMode_list: nextProps.printMode_list,
          tshirt_printmode: nextProps.printMode_list[0].key,
        });
      }
    }
    if (nextProps.stickerType_list) {
      if (nextProps.stickerType_list.length > 0) {
        this.setState({
          stickerType_list: nextProps.stickerType_list,
          stickers_type: nextProps.stickerType_list[0].key,
        });
      }
    }
    if (nextProps.price_tshirt) {
      if (nextProps.price_tshirt.length > 0) {
        nextProps.price_tshirt.map((item) => {
          if (item.default == 1) {
            this.setState({
              price_tshirt: nextProps.price_tshirt,
              p_tshirt: item.id,
            });
          }
        });
      }
    }
    if (nextProps.price_sticker) {
      if (nextProps.price_sticker.length > 0) {
        nextProps.price_sticker.map((item) => {
          if (item.default == 1) {
            this.setState({
              price_sticker: nextProps.price_sticker,
              p_sticker: item.id,
            });
          }
        });
      }
    }
    if (nextProps.price_msg) {
      if (nextProps.price_msg.length > 0) {
        nextProps.price_msg.map((item) => {
          if (item.default == 1) {
            this.setState({ price_msg: nextProps.price_msg, p_msg: item.id });
          }
        });
      }
    }
    if (nextProps.price_cushioncover) {
      if (nextProps.price_cushioncover.length > 0) {
        nextProps.price_cushioncover.map((item) => {
          if (item.default == 1) {
            this.setState({
              price_cushioncover: nextProps.price_cushioncover,
              p_cushioncover: item.id,
            });
          }
        });
      }
    }
    if (nextProps.price_totebag) {
      if (nextProps.price_totebag.length > 0) {
        nextProps.price_totebag.map((item) => {
          if (item.default == 1) {
            this.setState({
              price_totebag: nextProps.price_totebag,
              p_totebag: item.id,
            });
          }
        });
      }
    }
    if (nextProps.price_Hoodies) {
      if (nextProps.price_Hoodies.length > 0) {
        nextProps.price_Hoodies.map((item) => {
          if (item.default == 1) {
            this.setState({
              price_Hoodies: nextProps.price_Hoodies,
              p_Hoodies: item.id,
            });
          }
        });
      }
    }
    if (nextProps.price_kid) {
      if (nextProps.price_kid.length > 0) {
        nextProps.price_kid.map((item) => {
          if (item.default == 1) {
            this.setState({ price_kid: nextProps.price_kid, p_kid: item.id });
          }
        });
      }
    }
    if (nextProps.product_image) {
      if (nextProps.product_image.length > 0) {
        this.setState({
          product_image: nextProps.product_image,
          tshirt_image: nextProps.product_image[0].name,
        });
      }
    }
    if (nextProps.price_mxg) {
      if (nextProps.price_mxg.length > 0) {
        nextProps.price_mxg.map((item) => {
          if (item.default == 1) {
            this.setState({ price_mxg: nextProps.price_mxg, p_mxg: item.id });
          }
        });
      }
    }
    if (nextProps.setting) {
      this.setState({ setting: nextProps.setting });
    }
    if (nextProps.message) {
      this.setState({ isActive: false, isButtonActive: false });
    }
    if (nextProps.responseErrors) {
      this.setState({ isActive: false, isButtonActive: false });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'product_title') {
      this.setState({ product_title: value });
    }
    if (name === 'stickers_width') {
      this.setState({ stickers_width: value });
    }
    if (name === 'stickers_height') {
      this.setState({ stickers_height: value });
    }
    if (name === 'tshirt_weight') {
      this.setState({ tshirt_weight: value });
    }
    if (name === 'stickers_weight') {
      this.setState({ stickers_weight: value });
    }
    if (name === 'mug_weight') {
      this.setState({ mug_weight: value });
    }
    if (name === 'totebag_weight') {
      this.setState({ totebag_weight: value });
    }
    if (name === 'cushioncover_weight') {
      this.setState({ cushioncover_weight: value });
    }
    if (name === 'hoodie_weight') {
      this.setState({ hoodie_weight: value });
    }
    if (name === 'kid_weight') {
      this.setState({ kid_weight: value });
    }
    if (name === 'mxg_weight') {
      this.setState({ mxg_weight: value });
    }
    if (name === 'source') {
      this.setState({ source: value });
    }
    if (name === 'shopify_tags') {
      this.setState({ shopify_tags: value });
    }

    const { product } = this.state;
    product[name] = value;
    this.setState({ product });

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

  handleBlur = (e) => {
    const { name, value } = e.target;
    const validation = this.validator.errors;
    if (value === '') {
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

  handleSelect = (e) => {
    const { name, value } = e.target;
    if (name === 'artist') {
      this.setState({ artist: value });
    }
    if (name === 'tshirt_print') {
      this.setState({ tshirt_printmode: value });
    }
    if (name === 'tshirt_image') {
      this.setState({ tshirt_image: value });
    }
    if (name === 'stickers_type') {
      this.setState({ stickers_type: value });
    }
    if (name === 'price_tshirt') {
      this.setState({ p_tshirt: value });
    }
    if (name === 'price_sticker') {
      this.setState({ p_sticker: value });
    }
    if (name === 'price_msg') {
      this.setState({ p_msg: value });
    }
    if (name === 'price_mxg') {
      this.setState({ p_mxg: value });
    }
    if (name === 'price_totebag') {
      this.setState({ p_totebag: value });
    }
    if (name === 'price_cushioncover') {
      this.setState({ p_cushioncover: value });
    }
    if (name === 'price_Hoodies') {
      this.setState({ p_Hoodies: value });
    }
    if (name === 'price_kid') {
      this.setState({ p_kid: value });
    }
  };

  handleSearchTitleSubmit = (e) => {
    e.preventDefault();
    if (this.state.product_title) {
      let fetchUrl = `${APP_CONST.API_URL}/trademark/word/check?title=${this.state.product_title}`;
      this.setState({ isActive: true, isNext: false });
      http
        .get(fetchUrl)
        .then(({ data }) => {
          if (Object.keys(data.data.result).includes('error')) {
            this.setState({
              isActive: false,
              isNext: false,
              checkResult: data.data.result,
            });
          } else {
            this.setState({
              isActive: false,
              isNext: true,
              checkResult: data.data.result,
            });
          }
        })
        .catch((e) => {
          this.setState({ isActive: false });
        });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { product } = this.state;
    product['product_title'] = this.state.product_title;
    product['source'] = this.state.source;
    product['shopify_tags'] = this.state.shopify_tags;
    product['tshirt_printmode'] = this.state.tshirt_printmode;
    product['tshirt_image'] = this.state.tshirt_image;
    product['p_tshirt'] = this.state.p_tshirt;
    product['stickers_width'] = this.state.stickers_width;
    product['stickers_height'] = this.state.stickers_height;
    product['stickers_type'] = this.state.stickers_type;
    product['p_sticker'] = this.state.p_sticker;
    product['artist'] = this.state.artist;
    product['p_msg'] = this.state.p_msg;
    product['p_mxg'] = this.state.p_mxg;
    product['p_totebag'] = this.state.p_totebag;
    product['p_cushioncover'] = this.state.p_cushioncover;
    product['p_Hoodies'] = this.state.p_Hoodies;
    product['p_kid'] = this.state.p_kid;
    product['tshirt_weight'] = this.state.tshirt_weight;
    product['stickers_weight'] = this.state.stickers_weight;
    product['mug_weight'] = this.state.mug_weight;
    product['totebag_weight'] = this.state.totebag_weight;
    product['cushioncover_weight'] = this.state.cushioncover_weight;
    product['hoodie_weight'] = this.state.hoodie_weight;
    product['kid_weight'] = this.state.kid_weight;
    product['category'] = this.state.category;
    product['keyword'] = this.state.keyword;
    this.setState({ isShowError: true });

    this.validator.validateAll(product).then((success) => {
      if (success) {
        const {
          product_title,
          keyword,
          source,
          shopify_tags,
          category,
          p_tshirt,
          tshirt_printmode,
          artist,
          tshirt_image,
          stickers_width,
          stickers_height,
          stickers_type,
          p_sticker,
          p_msg,
          p_mxg,
          p_totebag,
          p_cushioncover,
          p_kid,
          p_Hoodies,
          tshirt_weight,
          stickers_weight,
          mug_weight,
          totebag_weight,
          cushioncover_weight,
          hoodie_weight,
          kid_weight,
        } = this.state.product;
        
        this.setState({ isActive: true, isButtonActive: true, isProductImage: true });
        this.setState((state) => {
          const searchCategories = state.categories;
          const searchKeywords = state.keywords;
          return {
            searchCategories,
            searchKeywords,
          };
        });

        this.props.createProduct({
          product_title,
          source,
          shopify_tags,
          keyword,
          category,
          p_tshirt,
          tshirt_printmode,
          artist,
          tshirt_image,
          stickers_width,
          stickers_height,
          stickers_type,
          p_sticker,
          p_msg,
          p_mxg,
          p_totebag,
          p_cushioncover,
          p_kid,
          p_Hoodies,
          tshirt_weight,
          stickers_weight,
          mug_weight,
          totebag_weight,
          cushioncover_weight,
          hoodie_weight,
          kid_weight,
        });
        
        
      }
    });
  };

  handleCategorySelect = (id) => {
    let value;
    this.setState({ category: id });
    this.state.categories.map((item) => {
      if (item.id === id) {
        value = item.name;
        return value;
      }
    });

    this.setState((state) => {
      const tempKeywords = state.keywords.filter((item) =>
        item.tshirts.toLowerCase().includes(value.toLowerCase())
      );
      const searchKeywords = tempKeywords;
      return {
        tempKeywords,
        searchKeywords,
      };
    });
  };

  handleKeywordSelect = (id) => {
    this.setState({ keyword: id });
  };

  handleSearchKeyword = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ keyword: 0, keyword_value: value });
    this.setState((state) => {
      const searchKeywords = state.tempKeywords.filter((item) =>
        item.tshirts.toLowerCase().includes(value.toLowerCase())
      );
      const keyword = 0;
      return {
        searchKeywords,
        keyword,
      };
    });

    if (
      this.state.keyword === 0 &&
      this.state.keyword_value === '' &&
      this.state.category === 0
    ) {
      this.setState((state) => {
        const tempKeywords = state.keywords;
        const searchKeywords = tempKeywords;
        return {
          tempKeywords,
          searchKeywords,
        };
      });
    }
  };

  handleSearchCategory = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ category_value: value });
    this.setState((state) => {
      const searchCategories = state.categories.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      const category = 0;
      return {
        searchCategories,
        category,
      };
    });

    if (this.state.category === 0 && this.state.keyword_value === '') {
      this.setState((state) => {
        const tempKeywords = state.keywords;
        const searchKeywords = tempKeywords;
        return {
          tempKeywords,
          searchKeywords,
        };
      });
    }
  };

  render() {
    const {
      errors,
      isActive,
      isButtonActive,
      isNext,
      isCheckWin,
      checkResult,
      product,
      isProductImage,
      isSubmit,
      uploadData,
      artworks,
      masterUrl,
      isUploadpanel,
      skipItems,
    } = this.state;
    const self = this;

    return (
      <>
        {!isProductImage &&
          <>
            <MainHeader name='Product Create' parentName='Product' />
            <Container className='mt--6 product-create-container' fluid>
              <LoadingOverlay
                active={isActive}
                spinner
                text={
                  isCheckWin
                    ? 'Checking trademark. Just a wait.'
                    : 'Creating your product. Just a wait. It takes several minutes ...'
                }
              >
                <Card style={{ minHeight: '700px' }}>
                  <CardBody>
                    <Form
                      role='form'
                      method='POST'
                      onSubmit={this.handleSearchTitleSubmit}
                      hidden={!isCheckWin}
                    >
                      <Row>
                        <Col md={7}>
                          <h4>Product Title</h4>
                          <hr />
                          <Row>
                            <Col md={8}>
                              <Input
                                type='text'
                                name='product_title'
                                onBlur={this.handleBlur}
                                onChange={this.handleChange}
                                maxLength={25}
                                invalid={'product_title' in errors}
                                placeholder='Enter Product Title'
                                className='form-control form-control'
                                required
                              />
                            </Col>
                            <Col md={4}>
                              <Button type='submit' color='primary'>
                                {"Check"}
                              </Button>
                              <Button
                                type='button'
                                color='warning'
                                disabled={!isNext}
                                onClick={() => {
                                  this.setState({
                                    isCheckWin: false,
                                    isNext: false,
                                    checkResult: {},
                                  });
                                }}
                              >
                                Next
                         </Button>
                            </Col>
                          </Row>
                          {Object.keys(checkResult).length == 0 && isNext ? (
                            <Row>
                              <p className='mt-2 mb-1 ml-3 check-text'>
                                {"No trademark issues found"}
                              </p>
                            </Row>
                          ) : null}

                          {Object.keys(checkResult).includes('error') ?
                            Object.keys(this.state.checkResult['error']).map(item => (
                              <Row key={`check-result-error-${item}`}>
                                <small className='mt-3 mb-1 ml-3'>
                                  {this.state.checkResult['error'][item]}
                                </small>
                              </Row>
                            )) : null}

                          {Object.keys(checkResult).includes('US') ? <>
                            <Row className='mt-4 ml-1'>
                              <img
                                src={require(`assets/img/flag/us.png`)}
                                style={{ width: '18px', height: '18px' }}
                              />
                              <h4 className='ml-2'>{"US"}</h4>
                            </Row>
                            <hr style={{ borderTop: '1px solid rgba(0, 0, 0, 0.3)' }} />
                            <Row className='mt-2 mb-1'>
                              {Object.keys(this.state.checkResult['US']).map(item => (
                                <React.Fragment key={`check-result-us-${item}`}>
                                  <small className='mb-2 ml-3'>
                                    {this.state.checkResult['US'][item].map(el => (
                                      <React.Fragment key={`check-result-us-${el.id}`}>
                                        {el}<br />
                                      </React.Fragment>
                                    ))}
                                  </small>
                                  <br />
                                </React.Fragment>
                              ))}
                            </Row>
                          </> : null}

                          {Object.keys(checkResult).includes('UK') ?
                            <>
                              <Row className='mt-4 ml-1'>
                                <img
                                  src={require(`assets/img/flag/uk.png`)}
                                  style={{ width: '18px', height: '18px' }}
                                />
                                <h4 className='ml-2'>{'UK'}</h4>
                              </Row>
                              <hr style={{ borderTop: '1px solid rgba(0, 0, 0, 0.3)' }} />

                              <Row className='mt-2 mb-1'>
                                {Object.keys(this.state.checkResult['UK']).map(item => {
                                  return (
                                    <small className='mb-2 ml-3' key={`check-result-uk-${item}`}>
                                      {`${item.toUpperCase()} -`}
                                      {this.state.checkResult['UK'][item].map(el => (
                                        <React.Fragment key={`check-result-uk-${el.trademark}`}>
                                          <a href={el.link} target="blank">{` ${el.trademark} | `}</a>
                                          {`${el.words} ${el.status.charAt(0).toUpperCase() + el.status.slice(1).toUpperCase()}`}<br />
                                        </React.Fragment>
                                      ))}
                                    </small>
                                  );
                                })}
                              </Row>
                            </>
                            : null}

                          {Object.keys(checkResult).includes('AU') ? <>
                            <Row className='mt-4 ml-1'>
                              <img
                                src={require(`assets/img/flag/au.png`)}
                                style={{ width: '18px', height: '18px' }}
                              />
                              <h4 className='ml-2'>{'AU'}</h4>
                            </Row>
                            <hr style={{ borderTop: '1px solid rgba(0, 0, 0, 0.3)' }} />

                            <Row className='mt-2 mb-1'>
                              {Object.keys(this.state.checkResult['AU']).map(item => {
                                return (
                                  <small className='mb-2 ml-3' key={`check-result-au-${item}`}>
                                    {`${item.toUpperCase()} -`}
                                    {this.state.checkResult['AU'][item].map(el => (
                                      <React.Fragment key={`check-result-au-${el.trademark}`}>
                                        <a href={el.link} target="blank">{` ${el.trademark} | `}</a>
                                        {`${el.words} ${el.status.charAt(0).toUpperCase() + el.status.slice(1).toUpperCase()}`}<br />
                                      </React.Fragment>
                                    ))}
                                  </small>
                                );
                              })}
                            </Row>
                          </> : null}
                        </Col>
                        <Col md={4}>
                          <h4>{"Product Create Instructions"}</h4>
                          <hr />
                          <small className='text-uppercase text-muted font-weight-bold' style={{
                            'whiteSpace': 'pre-wrap'
                          }}>
                            {this.state.setting.product_create_guide}
                          </small>
                        </Col>
                      </Row>
                    </Form>
                    <form
                      method='POST'
                      onSubmit={this.handleSubmit}
                      ref={(el) => (this.myFormRef = el)}
                      hidden={isCheckWin}
                    >
                      <Row>
                        <Col md={7}>
                          <Row>
                            <Col md={8}>
                              <h4>Product Title</h4>
                              <hr />
                              <FormGroup>
                                <Input
                                  type='text'
                                  name='product_title'
                                  value={this.state.product_title}
                                  readOnly={true}
                                  maxLength={25}
                                  invalid={'product_title' in errors}
                                  placeholder='Enter Product Title'
                                  className='form-control form-control'
                                  required
                                />
                                <div className='invalid-feedback ml-2'>
                                  {errors.product_title}
                                </div>
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <h4>Artist</h4>
                              <hr></hr>
                              <FormGroup>
                                <Input
                                  type='select'
                                  name='artist'
                                  value={this.state.artist}
                                  onChange={this.handleSelect}
                                  className='form-control form-control'
                                >
                                  {this.state.artist_list.map(function (item) {
                                    return (
                                      <option key={item.key} value={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  })}
                                </Input>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={12}>
                              <h4>Source</h4>
                              <hr className='label-hr' />
                              <FormGroup>
                                <Input
                                  type='textarea'
                                  name='source'
                                  onBlur={this.handleBlur}
                                  onChange={this.handleChange}
                                  invalid={'source' in errors}
                                  value={this.state.source}
                                  className='form-control form-control'
                                  placeholder='Enter Source'
                                  required
                                ></Input>
                                <div className='invalid-feedback ml-2'>
                                  {errors.source}
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={12}>
                              <h4>Shopify Tags</h4>
                              <hr className='label-hr' />
                              <FormGroup>
                                <Input
                                  type='text'
                                  name='shopify_tags'
                                  onBlur={this.handleBlur}
                                  onChange={this.handleChange}
                                  invalid={'shopify_tags' in errors}
                                  value={this.state.shopify_tags}
                                  className='form-control form-control'
                                  placeholder='Enter Shopify Tags'
                                  required
                                ></Input>
                                <div className='invalid-feedback ml-2'>
                                  {errors.shopify_tags}
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={4}>
                              <h4>Adult Tshirts</h4>
                              <hr className='label-hr' />
                              <Row>
                                <Col md={6}>
                                  <FormGroup>
                                    <Label>Price</Label>
                                    <Input
                                      type='select'
                                      name='price_tshirt'
                                      onChange={this.handleSelect}
                                      value={this.state.p_tshirt}
                                      className='form-control form-control'
                                      placeholder='Enter Price'
                                      required
                                    >
                                      {this.state.price_tshirt.map((item) => {
                                        return (
                                          <option key={item.key} value={item.id}>
                                            {item.name}
                                          </option>
                                        );
                                      })}
                                    </Input>
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup>
                                    <Label>Weight</Label>
                                    <Input
                                      type='number'
                                      name='tshirt_weight'
                                      onBlur={this.handleBlur}
                                      onChange={this.handleChange}
                                      invalid={'tshirt_weight' in errors}
                                      className='form-control form-control'
                                      value={this.state.tshirt_weight}
                                      placeholder=''
                                      step='0.1'
                                      required
                                    />
                                    <div className='invalid-feedback ml-2'>
                                      {errors.tshirt_weight}
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Col>
                            <Col md={4}>
                              <h4>Print Mode</h4>
                              <hr className='label-hr' />
                              <Label>&nbsp;</Label>
                              <FormGroup>
                                <Input
                                  type='select'
                                  name='tshirt_print'
                                  value={this.state.tshirt_print}
                                  className='form-control form-control'
                                  onChange={this.handleSelect}
                                >
                                  {this.state.printMode_list.map(function (item) {
                                    return (
                                      <option key={item.key} value={item.key}>
                                        {item.name}
                                      </option>
                                    );
                                  })}
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <h4>Product Image</h4>
                              <hr className='label-hr' />
                              <Label>&nbsp;</Label>
                              <FormGroup>
                                <Input
                                  type='select'
                                  name='tshirt_image'
                                  value={this.state.tshirt_image}
                                  onChange={this.handleSelect}
                                  className='form-control form-control'
                                >
                                  {this.state.product_image.map(function (item) {
                                    return (
                                      <option key={item.key} value={item.name}>
                                        {item.name}
                                      </option>
                                    );
                                  })}
                                </Input>
                              </FormGroup>
                            </Col>
                          </Row>
                          <h4>Stickers</h4>
                          <hr className='label-hr' />
                          <Row>
                            <Col md={3}>
                              <FormGroup>
                                <Label>Width</Label>
                                <Input
                                  type='number'
                                  name='stickers_width'
                                  onBlur={this.handleBlur}
                                  onChange={this.handleChange}
                                  invalid={'stickers_width' in errors}
                                  className='form-control form-control'
                                  placeholder='Enter Width'
                                  required
                                />
                                <div className='invalid-feedback ml-2'>
                                  {errors.stickers_width}
                                </div>
                              </FormGroup>
                            </Col>
                            <Col md={3}>
                              <FormGroup>
                                <Label>Height</Label>
                                <Input
                                  type='number'
                                  name='stickers_height'
                                  onBlur={this.handleBlur}
                                  onChange={this.handleChange}
                                  invalid={'stickers_height' in errors}
                                  className='form-control form-control'
                                  placeholder='Enter Height'
                                  required
                                  min='0'
                                />
                                <div className='invalid-feedback ml-2'>
                                  {errors.stickers_height}
                                </div>
                              </FormGroup>
                            </Col>
                            <Col md={2}>
                              <FormGroup>
                                <Label>Type</Label>
                                <Input
                                  type='select'
                                  name='stickers_type'
                                  value={this.state.sticker_type}
                                  onChange={this.handleSelect}
                                  className='form-control form-control'
                                >
                                  {this.state.stickerType_list.map(function (item) {
                                    return (
                                      <option key={item.key} value={item.key}>
                                        {item.key}
                                      </option>
                                    );
                                  })}
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md={2}>
                              <FormGroup>
                                <Label>Price</Label>
                                <Input
                                  type='select'
                                  name='price_sticker'
                                  value={this.state.p_sticker}
                                  onChange={this.handleSelect}
                                  className='form-control form-control'
                                >
                                  {this.state.price_sticker.map((item) => {
                                    return (
                                      <option key={item.key} value={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  })}
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md={2}>
                              <FormGroup>
                                <Label>Weight</Label>
                                <Input
                                  type='number'
                                  name='stickers_weight'
                                  onBlur={this.handleBlur}
                                  onChange={this.handleChange}
                                  invalid={'stickers_weight' in errors}
                                  value={this.state.stickers_weight}
                                  className='form-control form-control'
                                  placeholder=''
                                  step='0.1'
                                  required
                                />
                                <div className='invalid-feedback ml-2'>
                                  {errors.stickers_weight}
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <h4>Mugs</h4>
                              <hr />
                              <Row>
                                <Col md={4}>
                                  <FormGroup>
                                    <Label>11oz Price</Label>
                                    <Input
                                      type='select'
                                      name='price_msg'
                                      value={this.state.p_msg}
                                      onChange={this.handleSelect}
                                      className='form-control form-control'
                                    >
                                      {this.state.price_msg.map((item) => {
                                        return (
                                          <option key={item.key} value={item.id}>
                                            {item.name}
                                          </option>
                                        );
                                      })}
                                    </Input>
                                  </FormGroup>
                                </Col>
                                <Col md={4}>
                                  <FormGroup>
                                    <Label>15oz Price</Label>
                                    <Input
                                      type='select'
                                      name='price_mxg'
                                      value={this.state.p_mxg}
                                      onChange={this.handleSelect}
                                      className='form-control form-control'
                                    >
                                      {this.state.price_mxg.map((item) => {
                                        return (
                                          <option key={item.key} value={item.id}>
                                            {item.name}
                                          </option>
                                        );
                                      })}
                                    </Input>
                                  </FormGroup>
                                </Col>
                                <Col md={4}>
                                  <FormGroup>
                                    <Label>Weight</Label>
                                    <Input
                                      type='number'
                                      name='mug_weight'
                                      onBlur={this.handleBlur}
                                      onChange={this.handleChange}
                                      invalid={'mug_weight' in errors}
                                      value={this.state.mug_weight}
                                      className='form-control form-control'
                                      placeholder=''
                                      step='0.1'
                                      required
                                    />
                                    <div className='invalid-feedback ml-2'>
                                      {errors.mug_weight}
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Col>
                            <Col md={6}>
                              <h4>Tote Bags</h4>
                              <hr />
                              <Row>
                                <Col md={6}>
                                  <FormGroup>
                                    <Label>Price</Label>
                                    <Input
                                      type='select'
                                      name='price_totebag'
                                      onChange={this.handleSelect}
                                      value={this.state.p_totebag}
                                      className='form-control form-control'
                                    >
                                      {this.state.price_totebag.map((item) => {
                                        return (
                                          <option key={item.key} value={item.id}>
                                            {item.name}
                                          </option>
                                        );
                                      })}
                                    </Input>
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup>
                                    <Label>Weight</Label>
                                    <Input
                                      type='number'
                                      name='totebag_weight'
                                      onBlur={this.handleBlur}
                                      onChange={this.handleChange}
                                      invalid={'totebag_weight' in errors}
                                      value={this.state.totebag_weight}
                                      className='form-control form-control'
                                      placeholder=''
                                      step='0.1'
                                      required
                                    />
                                    <div className='invalid-feedback ml-2'>
                                      {errors.totebag_weight}
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <h4>Cushion Covers</h4>
                              <hr />
                              <Row>
                                <Col md={6}>
                                  <Label>Price</Label>
                                  <FormGroup>
                                    <Input
                                      type='select'
                                      name='price_cushioncover'
                                      value={this.state.p_cushioncover}
                                      onChange={this.handleSelect}
                                      className='form-control form-control'
                                    >
                                      {this.state.price_cushioncover.map((item) => {
                                        return (
                                          <option key={item.key} value={item.id}>
                                            {item.name}
                                          </option>
                                        );
                                      })}
                                    </Input>
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup>
                                    <Label>Weight</Label>
                                    <Input
                                      type='number'
                                      name='cushioncover_weight'
                                      onBlur={this.handleBlur}
                                      onChange={this.handleChange}
                                      value={this.state.cushioncover_weight}
                                      invalid={'cushioncover_weight' in errors}
                                      className='form-control form-control'
                                      placeholder=''
                                      step='0.1'
                                      required
                                    />
                                    <div className='invalid-feedback ml-2'>
                                      {errors.cushioncover_weight}
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Col>
                            <Col md={6}>
                              <h4>Hoodies</h4>
                              <hr />
                              <Row>
                                <Col md={6}>
                                  <FormGroup>
                                    <Label>Price</Label>
                                    <Input
                                      type='select'
                                      name='price_Hoodies'
                                      value={this.state.p_Hoodies}
                                      onChange={this.handleSelect}
                                      className='form-control form-control'
                                      required
                                    >
                                      {this.state.price_Hoodies.map((item) => {
                                        return (
                                          <option key={item.key} value={item.id}>
                                            {item.name}
                                          </option>
                                        );
                                      })}
                                    </Input>
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup>
                                    <Label>Weight</Label>
                                    <Input
                                      type='number'
                                      name='hoodie_weight'
                                      onBlur={this.handleBlur}
                                      onChange={this.handleChange}
                                      value={this.state.hoodie_weight}
                                      invalid={'hoodie_weight' in errors}
                                      className='form-control form-control'
                                      placeholder=''
                                      step='0.1'
                                      required
                                    />
                                    <div className='invalid-feedback ml-2'>
                                      {errors.hoodie_weight}
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <h4>Kids</h4>
                              <hr />
                              <Row>
                                <Col md={6}>
                                  <FormGroup>
                                    <Label>Price</Label>
                                    <Input
                                      type='select'
                                      name='price_kid'
                                      value={this.state.p_kid}
                                      onChange={this.handleSelect}
                                      className='form-control form-control'
                                      required
                                    >
                                      {this.state.price_kid.map((item) => {
                                        return (
                                          <option key={item.key} value={item.id}>
                                            {item.name}
                                          </option>
                                        );
                                      })}
                                    </Input>
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup>
                                    <Label>Weight</Label>
                                    <Input
                                      type='number'
                                      name='kid_weight'
                                      onBlur={this.handleBlur}
                                      onChange={this.handleChange}
                                      value={this.state.kid_weight}
                                      invalid={'kid_weight' in errors}
                                      className='form-control form-control'
                                      placeholder=''
                                      step='0.1'
                                      required
                                    />
                                    <div className='invalid-feedback ml-2'>
                                      {errors.kid_weight}
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={12}>
                              <Button
                                type='submit'
                                className='float-left btn btn-info'
                                disabled={isButtonActive}
                              >
                                {"Create"}
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                        <Col md={2}>
                          <h4>Category</h4>
                          <hr />
                          <FormGroup className='mb-3'>
                            <InputGroup
                              className='input-group-alternative input-group-merge'
                              style={{ borderRadius: '0px', width: '100%' }}
                            >
                              <InputGroupAddon addonType='prepend'>
                                <InputGroupText>
                                  <i className='fas fa-search' />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder='Search'
                                type='text'
                                name='searchCategory'
                                onChange={this.handleSearchCategory}
                                style={{ width: '50%' }}
                              />
                            </InputGroup>
                          </FormGroup>
                          <ul className='list-group list-group-flush'>
                            {this.state.searchCategories.map(function (item) {
                              return (
                                <li
                                  className={classnames(
                                    'list-group-item list-group-item-action',
                                    { active: item.id === self.state.category }
                                  )}
                                  onClick={() => self.handleCategorySelect(item.id)}
                                  action='true'
                                  key={item.id}
                                >
                                  {item.name}
                                </li>
                              );
                            })}
                          </ul>
                          {this.state.isShowError && this.state.category === 0 && (
                            <div className='invalid-category'>
                              <p>{"Please select category"}</p>
                            </div>
                          )}
                        </Col>
                        <Col md={3}>
                          <div>
                            <h4>Keyword</h4>
                            <hr />
                            <FormGroup className='mb-3' style={{ width: '100%' }}>
                              <InputGroup
                                className='input-group-alternative input-group-merge'
                                style={{ borderRadius: '0px', width: '100%' }}
                              >
                                <InputGroupAddon addonType='prepend'>
                                  <InputGroupText>
                                    <i className='fas fa-search' />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  placeholder='Search'
                                  type='text'
                                  name='searchKeyword'
                                  onChange={this.handleSearchKeyword}
                                  style={{ width: '80%' }}
                                />
                              </InputGroup>
                            </FormGroup>
                            <ul className='list-group list-group-flush'>
                              {this.state.searchKeywords.map(function (item) {
                                return (
                                  <li
                                    className={classnames(
                                      'list-group-item list-group-item-action',
                                      { active: item.id === self.state.keyword }
                                    )}
                                    onClick={() =>
                                      self.handleKeywordSelect(item.id)
                                    }
                                    action='true'
                                    key={item.id}
                                  >
                                    {item.tshirts}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          {this.state.isShowError && this.state.keyword === 0 && (
                            <div className='invalid-keyword'>
                              <p>{"Please select keyword"}</p>
                            </div>
                          )}
                        </Col>
                      </Row>
                    </form>
                  </CardBody>
                </Card>
              </LoadingOverlay>
            </Container>
          </>
        }
        {(isProductImage && !isUploadpanel) &&
          <>
            <MainHeader name='Product Image' parentName='Product' />
            <Container className='mt--6 product-image-container' fluid>
              <LoadingOverlay
                active={isActive}
                text={'Creating your product. Just a wait. It takes several minutes ...'}
                spinner
              >
                <ProductImage
                  isSubmit={isSubmit}
                  isActive={isActive}
                  onSubmit={(value) => this.setState({ isActive: value })}
                  onCheckIsSubmit={() => this.setState({ isSubmit: true })}
                  onIsUploadPanel={() => this.setState({ isUploadpanel: true })}
                  onUpload={(data, imageUrl, masterUrl, skipItems) => this.setState({ uploadData: data, artworks: imageUrl, masterUrl, skipItems })}
                />
              </LoadingOverlay>
            </Container>
          </>
        }
        { isUploadpanel &&
          <>
            <MainHeader name='Product Upload' parentName='Product' />
            <Container className='mt--6 product-upload-container' fluid>
              <LoadingOverlay
                active={isActive}
                text={'Creating your product. Just a wait. It takes several minutes ...'}
                spinner
              >
                <ProductUpload
                  isActive={isActive}
                  source={uploadData}
                  artworks={artworks}
                  masterUrl={masterUrl}
                  skipItems={skipItems}
                  onSubmit={(value) => this.setState({ isActive: value })}
                />
              </LoadingOverlay>
            </Container>
          </>
        }
      </>
    );
  }
}

const mapStateToProps = ({ category, keyword, product }) => {
  if (product.all_product && product.all_product.length == 13) {
    return {
      categories: category.categories,
      keywords: keyword.keywords,
      artist_list: product.all_product[0],
      stickerType_list: product.all_product[1],
      printMode_list: product.all_product[2],
      price_tshirt: product.all_product[3],
      price_sticker: product.all_product[4],
      price_msg: product.all_product[5],
      price_mxg: product.all_product[6],
      price_totebag: product.all_product[7],
      price_cushioncover: product.all_product[8],
      price_Hoodies: product.all_product[9],
      price_kid: product.all_product[10],
      product_image: product.all_product[11],
      setting: product.all_product[12],
      message: product.message,
      responseErrors: product.errors,
    };
  } else {
    return {
      categories: category.categories,
      keywords: keyword.keywords,
      artist_list: [],
      stickerType_list: [],
      printMode_list: [],
      price_tshirt: [],
      price_sticker: [],
      price_msg: [],
      price_mxg: [],
      price_totebag: [],
      price_cushioncover: [],
      price_Hoodies: [],
      price_kid: [],
      product_image: [],
      setting: {},
      message: product.message,
      responseErrors: product.errors,
    };
  }
};

export default connect(mapStateToProps, {
  allCategories,
  allKeywords,
  createProduct,
  allProductInfo,
})(ProductCreate);
