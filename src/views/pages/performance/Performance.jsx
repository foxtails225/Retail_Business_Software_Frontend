import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { connect } from 'react-redux';
import { allArtists } from '../../../store/actions/artist';
import NotificationAlert from 'react-notification-alert';
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
  ButtonGroup,
} from 'reactstrap';

import MainHeader from '../../components/headers/MainHeader';
import APP_CONST from '../../../helper/constant';
import http from '../../../helper/http';

class Performance extends React.Component {
  constructor(props) {
    super(props);
    this.columns = ['id', 'name'];
    this.state = {
      isModal: false,
      artists: [],
      artistsSelected: [],
      weekData: [],
      monthData: [],
      monthCount: 12,
      weekCount: 4,
    };
    this.props.allArtists();
  }

  componentWillMount() {
    if (localStorage.getItem('artists-selected')) {
      this.setState(
        {
          ...this.state,
          artistsSelected: JSON.parse(localStorage.getItem('artists-selected')),
        },
        () => {
          this.getProductsCreatedLast4Weeks();
          this.getProductsCreatedLast12Months();
        }
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.artists.length !== nextProps.artists) {
      this.setState({ ...this.state, artists: nextProps.artists });
    }
  }

  handleArtistSelectChange(e, artist) {
    var artistsSelected = this.state.artistsSelected;
    if (e.target.checked) {
      if (!artistsSelected.includes(artist.id)) {
        artistsSelected.push(artist.id);
      }
    } else {
      if (artistsSelected.includes(artist.id)) {
        artistsSelected = artistsSelected.filter(
          (artistSelected) => artistSelected !== artist.id
        );
      }
    }

    this.setState({ artistsSelected });
  }

  handleArtistsSelect() {
    localStorage.setItem(
      'artists-selected',
      JSON.stringify(this.state.artistsSelected)
    );
    this.setState({ ...this.state, isModal: false });
    this.getProductsCreatedLast4Weeks();
    this.getProductsCreatedLast12Months();
  }

  getProductsCreatedLast4Weeks() {
    let fetchUrl = `${APP_CONST.API_URL}/performance/weeks`;
    http
      .post(fetchUrl, {
        week: this.state.weekCount,
        artistsSelected: this.state.artistsSelected,
      })
      .then((response) => {
        this.setState({ ...this.state, weekData: response.data.data });
      })
      .catch((e) => {
        this.setState({ ...this.state, weekData: [] });
      });
  }

  getProductsCreatedLast12Months() {
    let fetchUrl = `${APP_CONST.API_URL}/performance/months`;
    http
      .post(fetchUrl, {
        month: this.state.monthCount,
        artistsSelected: this.state.artistsSelected,
      })
      .then((response) => {
        this.setState({ ...this.state, monthData: response.data.data });
      })
      .catch((e) => {
        this.setState({ ...this.state, monthData: [] });
      });
  }
  render() {
    const { isModal, artists, weekData, monthData } = this.state;
    return (
      <>
        <div className='rna-wrapper'>
          <NotificationAlert ref='notificationAlert' />
        </div>
        <MainHeader name='Performance' />
        <Container className='mt--6 performance-container' fluid>
          <Card style={{ minHeight: '700px' }}>
            <CardBody>
              <Row>
                <Col md={8}>
                  <Button
                    name='createBtn'
                    className='btn-select-artist'
                    color='primary'
                    onClick={() => this.setState({ isModal: true })}
                  >
                    Select Artist
                  </Button>
                  <Modal
                    isOpen={isModal}
                    toggle={() => {
                      this.setState({ isModal: !this.state.isModal });
                    }}
                    size='lg'
                  >
                    <ModalHeader color='primary'>Select Artist</ModalHeader>
                    <ModalBody>
                      <Table
                        className='align-items-center'
                        bordered
                        responsive
                        style={{ maxHeight: '300px', display: 'block' }}
                      >
                        <thead className='thead-light'>
                          <tr>
                            <th
                              scope='col'
                              className='text-center'
                              style={{ width: '15%' }}
                            >
                              ARTIST
                            </th>
                            <th
                              scope='col'
                              className='text-center'
                              style={{ width: '25%' }}
                            >
                              NAME
                            </th>
                            <th
                              scope='col'
                              className='text-center'
                              style={{ width: '30%' }}
                            >
                              Email
                            </th>
                            <th
                              scope='col'
                              className='text-center'
                              style={{ width: '20%' }}
                            >
                              Target
                            </th>
                            <th
                              scope='col'
                              className='text-center'
                              style={{ width: '10%' }}
                            ></th>
                          </tr>
                        </thead>
                        <tbody>
                          {artists.map((artist) => {
                            return (
                              <tr key={artist.id}>
                                <td className='text-center'>{artist.code}</td>
                                <td className='text-center'>{artist.name}</td>
                                <td className='text-center'>{artist.email}</td>
                                <td className='text-center'>{artist.target}</td>
                                <td className='text-center'>
                                  <div className='custom-control custom-checkbox artist-item-checkbox'>
                                    <Input
                                      className='custom-control-input'
                                      type='checkbox'
                                      checked={this.state.artistsSelected.includes(
                                        artist.id
                                      )}
                                      onChange={(e) =>
                                        this.handleArtistSelectChange(e, artist)
                                      }
                                      id={'artist-' + artist.id}
                                    />
                                    <label
                                      className='custom-control-label'
                                      htmlFor={'artist-' + artist.id}
                                    ></label>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color='secondary'
                        onClick={(e) => {
                          this.setState({ isModal: false });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        color='primary'
                        onClick={() => this.handleArtistsSelect()}
                      >
                        Select
                      </Button>
                    </ModalFooter>
                  </Modal>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <h2 className=' mt-3'>Prducts Created - Last 4 weeks</h2>
                  <hr />
                  <Table
                    className='align-items-center'
                    bordered
                    responsive
                    style={{
                      maxHeight: '300px',
                      display: 'block',
                      minHeight: '100px',
                    }}
                  >
                    <thead className='thead-light'>
                      <tr>
                        <th scope='col' className='text-center'>
                          ARTIST
                        </th>
                        {[...Array(this.state.weekCount).keys()].map(
                          (weekNo) => {
                            return (
                              <th
                                scope='col'
                                className='text-center'
                                key={weekNo}
                              >
                                WEEK {weekNo + 1}
                              </th>
                            );
                          }
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {weekData.map((weekDataItem, index) => (
                        <tr key={index}>
                          <td className='text-center'>
                            {weekDataItem.artist.code}
                          </td>
                          {weekDataItem.weeks.map((weekCount, index1) => (
                            <td className='text-center' key={index1}>
                              <ButtonGroup role='group'>
                                <Button
                                  color='primary'
                                  type='button'
                                  size='sm'
                                  style={{
                                    width: '30px',
                                    fontSize: '10px',
                                    paddingLeft: '1px',
                                    paddingRight: '1px',
                                  }}
                                >
                                  {weekCount}
                                </Button>
                                <Button
                                  color='danger'
                                  type='button'
                                  size='sm'
                                  style={{
                                    width: '30px',
                                    fontSize: '10px',
                                    paddingLeft: '1px',
                                    paddingRight: '1px',
                                  }}
                                >
                                  {weekDataItem.artist.target}
                                </Button>
                              </ButtonGroup>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <h2 className=' mt-3'>Prducts Created - Monthly</h2>
                  <hr />
                  <Table
                    className='align-items-center'
                    bordered
                    responsive
                    style={{ maxHeight: '400px', display: 'block' }}
                  >
                    <thead className='thead-light'>
                      <tr>
                        <th scope='col' className='text-center'>
                          ARTIST
                        </th>
                        {[...Array(this.state.monthCount).keys()].map(
                          (monthNo) => {
                            return (
                              <th
                                scope='col'
                                className='text-center'
                                key={monthNo}
                              >
                                {moment()
                                  .subtract(monthNo, 'months')
                                  .format('MMM')}
                              </th>
                            );
                          }
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {monthData.map((monthDataItem, index) => (
                        <tr key={index}>
                          <td className='text-center'>
                            {monthDataItem.artist.code}
                          </td>
                          {monthDataItem.months.map((monthCount, index1) => (
                            <td className='text-center' key={index1}>
                              <ButtonGroup role='group'>
                                <Button
                                  color='primary'
                                  type='button'
                                  size='sm'
                                  style={{
                                    width: '30px',
                                    fontSize: '10px',
                                    paddingLeft: '1px',
                                    paddingRight: '1px',
                                  }}
                                >
                                  {monthCount}
                                </Button>
                                <Button
                                  color='danger'
                                  type='button'
                                  size='sm'
                                  style={{
                                    width: '30px',
                                    fontSize: '10px',
                                    paddingLeft: '1px',
                                    paddingRight: '1px',
                                  }}
                                >
                                  {monthDataItem.artist.target}
                                </Button>
                              </ButtonGroup>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col md={12} className='mt-3'>
                  <p>
                    <Button
                      color='primary'
                      type='button'
                      size='sm'
                      style={{
                        width: '20px',
                        height: '20px',
                      }}
                    ></Button>
                    <span style={{ marginLeft: '5px', fontSize: '15px' }}>
                      Actual
                    </span>
                  </p>
                  <p>
                    <Button
                      color='danger'
                      type='button'
                      size='sm'
                      style={{
                        width: '20px',
                        height: '20px',
                      }}
                    ></Button>
                    <span style={{ marginLeft: '5px', fontSize: '15px' }}>
                      Target
                    </span>
                  </p>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({ artist }) => ({
  artists: artist.artists,
});

export default connect(mapStateToProps, {
  allArtists,
})(Performance);
