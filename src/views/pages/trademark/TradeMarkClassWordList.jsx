import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import classnames from "classnames";

import {
  Table,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
  Input,
} from "reactstrap";

import MainHeader from "../../components/headers/MainHeader";
import http from "../../../helper/http";
import {
  updateClassWord,
  updateClassWordsList
} from "../../../store/actions/trademark";
import APP_CONST from "../../../helper/constant";

const INIT_ENTITIES = {
  data: [],
  page: 1,
  last_page: 1,
  per_page: 20,
  total: 1,
};

const columns = [
  { name: "no", width: "6%" },
  { name: "words", width: "20%" },
  { name: "description", width: "54%" },
  { name: "action", width: "12%" }
];

function TrademarkClassWordList() {
  const [page, setPage] = useState(1);
  const [entities, setEntities] = useState(INIT_ENTITIES);
  const [checkedItems, setCheckedItems] = useState({});
  const [isEdit, setIsEdit] = useState({});
  const [searchKey, setSearchKey] = useState("");
  const dispatch = useDispatch();
  const offset = 5;

  useEffect(() => {
    let fetchUrl = `${APP_CONST.API_URL}/trademark/classword/list/?&page=${page}&per_page=${entities.per_page}&search_key=${searchKey}`;
    http
      .get(fetchUrl)
      .then((response) => {
        setEntities(response.data.data);
        response.data.data.data.map((item, idx) => {
          setCheckedItems(prevState => (
            { ...prevState, [(page - 1) * 20 + idx + 1]: item.checked === 1 ? true : false }
          ));
        })
      })
      .catch((e) => {
        setEntities(INIT_ENTITIES);
      });
  }, [page]);

  const handleChecked = (event) => {
    const { id, name } = event.target;
    var checked = document.getElementById(id).checked;
    setCheckedItems(prevState => ({ ...prevState, [name]: checked }));
  }

  const pagesNumbers = () => {
    if (!entities.to) {
      return [];
    }

    let from = entities.current_page - offset >= 1 ? entities.current_page - offset : 1;
    let to = from + offset * 2 - 1;
    let pagesArray = [];

    if (to >= entities.last_page) {
      to = entities.last_page;
      from = entities.last_page - offset * 2 >= 1 ? entities.last_page - offset * 2 : 1;
    }

    for (let page = from; page <= to; page++) {
      pagesArray.push(page);
    }

    return pagesArray;
  }

  const handleSubmit = () => {
    let data = [];

    Object.keys(checkedItems).map(item => {
      data.push({ id: parseInt(item), checked: checkedItems[item] });
    });
    dispatch(updateClassWord({ data }));
  }

  const handleEditChange = (event) => {
    const index = parseInt(event.target.getAttribute('data'));
    entities.data[index].words = event.target.innerText;
  }

  const handleSaveEdit = (event) => {
    const { id, name } = event.currentTarget;
    const index = event.currentTarget.getAttribute('data');

    if (isEdit[id]) {
      dispatch(updateClassWordsList({ id: name, words: entities.data[index].words }));
    }
    setIsEdit(prevState => ({ ...prevState, [id]: isEdit[id] ? false : true }));
  }

  return (
    <>
      <MainHeader name="Trademark Class Word List" parentName="Trademark" />
      <Container className="mt--6 trademark-container" fluid>
        <Card style={{ minHeight: "700px" }}>
          <CardBody>
            <Row>
              <Col md={12} xl={12}>
                <Button
                  className="btn-createcategory"
                  color="primary"
                  onClick={handleSubmit}
                >
                  {"Update"}
                </Button>
              </Col>
              <Col md={12} xl={12}>
                <div className="div-tbl-categorylist">
                  <Table
                    className="align-items-center"
                    style={{ tableLayout: "fixed" }}
                    hover
                    bordered
                    responsive
                  >
                    <thead className="thead-light">
                      <tr>
                        {columns.map(item => (
                          <th
                            className="text-center"
                            style={{ width: item.width }}
                            key={item.name}
                          >
                            {item.name.toUpperCase()}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {entities.data.length > 0 &&
                        entities.data.map((data, index) => {
                          let current_number = (page - 1) * 20 + index + 1;
                          return (
                            <tr key={data.id}>
                              {Object.keys(data).map((key) => {
                                if (key == "checked") {
                                  return (
                                    <td className="text-center" key={key}>
                                      <div className="custom-control custom-checkbox">
                                        <Input
                                          id={`class-number-${current_number}`}
                                          name={current_number}
                                          className="custom-control-input"
                                          type="checkbox"
                                          checked={Object.keys(checkedItems).includes(current_number.toString()) ?
                                            checkedItems[current_number.toString()] : false
                                          }
                                          onChange={handleChecked}
                                        />
                                        <label
                                          className={`custom-control-label ${current_number < 10 ? 'pl-2' : ''}`}
                                          htmlFor={`class-number-${current_number}`}
                                        >
                                          {current_number}
                                        </label>
                                      </div>
                                    </td>
                                  )
                                }
                                else if (key === 'words') {
                                  return (
                                    <td
                                      key={`class-edit-${current_number}`}
                                      id={`class-edit-${current_number}`}
                                      name={current_number}
                                      data={index}
                                      className='text-center'
                                      contentEditable={
                                        Object.keys(isEdit).includes(`class-word-${current_number}`) ?
                                          isEdit[`class-word-${current_number}`] : false
                                      }
                                      onInput={handleEditChange}
                                      onBlur={handleEditChange}
                                      suppressContentEditableWarning={true}
                                      style={{
                                        width: '40px',
                                        height: '40px',
                                        textOverflow: 'inherit',
                                        whiteSpace: 'pre-wrap',
                                        border: Object.keys(isEdit).includes(`class-word-${current_number}`) &&
                                          isEdit[`class-word-${current_number}`] ?
                                          '2px solid' : '1px solid rgb(233, 236, 239)'
                                      }}
                                    >
                                      {data[key]}
                                    </td>
                                  );
                                } else if (key !== 'id') {
                                  return (
                                    <td key={key} style={{ whiteSpace: 'normal' }}>
                                      {data[key]}
                                    </td>
                                  );
                                }
                              })}
                              <td className="td-action">
                                <Row className="mt-1 mb-1">
                                  <Col md={12} xl={12} className="mb-2">
                                    <Button
                                      id={`class-word-${current_number}`}
                                      name={current_number}
                                      data={index}
                                      className="btn-tbl-categorylist-edit"
                                      size="sm"
                                      color="primary"
                                      onClick={handleSaveEdit}
                                      style={{ width: '100%' }}
                                    >
                                      <span className="btn-inner--icon mr-1">
                                        <i
                                          className={
                                            Object.keys(isEdit).includes(`class-word-${current_number}`) &&
                                              isEdit[`class-word-${current_number}`] ?
                                              "fas fa-save" : "fas fa-edit"
                                          }
                                          aria-hidden="true"
                                        />
                                      </span>
                                      <span className="btn-inner--text">
                                        {Object.keys(isEdit).includes(`class-word-${current_number}`) &&
                                          isEdit[`class-word-${current_number}`] ?
                                          "SAVE" : "UPDATE"
                                        }
                                      </span>
                                    </Button>
                                  </Col>
                                  <Col md={12} xl={12}>
                                    <a
                                      href={`http://xeno.ipaustralia.gov.au/tmgns/facelets/trademarkclass.xhtml?classId=${current_number}`}
                                      target="blank"
                                      style={{ color: '#fff' }}
                                    >
                                      <Button
                                        className="btn-tbl-categorylist-edit"
                                        size="sm"
                                        color="primary"
                                        style={{ width: '100%' }}
                                      >
                                        <span className="btn-inner--icon mr-1">
                                          <i className="fas fa-clone fa-flip-vertica" />
                                        </span>
                                        <span className="btn-inner--text">
                                          {"MORE INFO"}
                                        </span>
                                      </Button>
                                    </a>
                                  </Col>
                                </Row>
                              </td>
                            </tr>
                          );
                        })}
                      {!entities.data.length &&
                        <tr>
                          <td
                            colSpan={columns.length + 1}
                            className="text-center td-noredords"
                          >
                            {"No Records Found."}
                          </td>
                        </tr>
                      }
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </CardBody>
          <CardFooter className="py-4">
            <nav aria-label="...">
              <Pagination
                className="pagination justify-content-end mb-0"
                listClassName="justify-content-end mb-0"
              >
                <PaginationItem
                  className={classnames({
                    disabled: 1 == entities.page,
                  })}
                >
                  <PaginationLink
                    onClick={() => setPage(entities.page - 1)}
                  >
                    <i className="fas fa-angle-left" />
                    <span className="sr-only">{"Previous"}</span>
                  </PaginationLink>
                </PaginationItem>
                {pagesNumbers().map((page) =>
                  (
                    <PaginationItem
                      className={classnames({
                        active: page === entities.page,
                      })}
                      key={"pagination-" + page}
                    >
                      <PaginationLink onClick={() => setPage(page)}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                <PaginationItem
                  className={classnames({
                    disabled:
                      entities.last_page === entities.page
                  })}
                >
                  <PaginationLink
                    onClick={() => setPage(entities.page + 1)}
                  >
                    <i className="fas fa-angle-right" />
                    <span className="sr-only">Next</span>
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </nav>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
}

export default TrademarkClassWordList;
