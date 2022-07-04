// (window, $);
import React, { Fragment, useEffect, useState } from "react";

//dayjs
import dayjs from "dayjs";

//redux
import { useDispatch, connect, useSelector } from "react-redux";
import { getPurchaseCoinHistory } from "../../store/purchaseCoinHistory/action";

//MUI
import { TablePagination } from "@material-ui/core";
import TablePaginationActions from "./TablePagination";

//datatable
import $ from "jquery";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

const PurchaseCoinHistoryTable = (props) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const history = useSelector((state) => state.history.history);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setData(history);
  }, [history]);

  // $(document).ready(function () {
  //   $("#zero_config").DataTable();
  //   $(".dataTables_empty").empty();
  // });

  useEffect(() => {
    props.getPurchaseCoinHistory();
  }, []);

  const blockUnblock = (data) => {
    props.blockUnblockUser(data._id);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = history.filter((data) => {
        return data?.who?.toUpperCase()?.indexOf(value) > -1;
      });
      setData(data);
    } else {
      return setData(history);
    }
  };

  return (
    <>
      <div class="page-breadcrumb">
        <div class="row">
          <div class="col-7 align-self-center">
            <div class="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb m-0 p-0">
                  <li class="breadcrumb-item">
                    <a href="index.html" class="text-muted">
                      Home
                    </a>
                  </li>
                  <li
                    class="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Purchase Coin History
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-8 mt-4 float-left mb-0">
                    <h3 class="card-title mb-4">Purchase Coin History</h3>
                  </div>

                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 mt-3 float-right">
                    <form action="">
                      <div class="input-group mb-4 border rounded-pill p-1">
                        <div class="input-group-prepend border-0">
                          <div
                            id="button-addon4"
                            class="btn btn-link text-primary"
                          >
                            <i class="fa fa-search"></i>
                          </div>
                        </div>
                        <input
                          type="search"
                          placeholder="What're you searching for?"
                          aria-describedby="button-addon4"
                          class="form-control bg-none border-0 rounded-pill mr-1"
                          onChange={handleSearch}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                {/* <hr class=" mb-4" />   */}
                {/* <div class="col-3"> */}

                {/* </div> */}
                <div class="table-responsive">
                  <table
                    id="zero_config"
                    class="table table-striped table-bordered no-wrap"
                  >
                    <thead>
                      <tr>
                        <th>UserName</th>
                        <th>Coin</th>
                        <th>Rupee</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        <Fragment>
                          {(rowsPerPage > 0
                            ? data.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : data
                          ).map((data, index) => {
                            return (
                              <tr key={index}>
                                <td>@{data.who}</td>
                                <td>{data.coin}</td>
                                <td>{data.rupee}</td>

                                <td>
                                  {dayjs(data.date).format("DD MMM, YYYY")}
                                </td>
                              </tr>
                            );
                          })}
                        </Fragment>
                      ) : (
                        <tr>
                          <td colSpan="5" align="center">
                            Nothing to show!!
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>UserName</th>
                        <th>Coin</th>
                        <th>Rupee</th>
                        <th>Created At</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div class="py-2">
                  <TablePagination
                    id="pagination"
                    component="div"
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      100,
                      { label: "All", value: -1 },
                    ]}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { getPurchaseCoinHistory })(
  PurchaseCoinHistoryTable
);
