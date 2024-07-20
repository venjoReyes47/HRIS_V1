import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableHead, TableRow, TableFooter, TableCell, Box, Collapse, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const Row = (props) => {
  const { row, rowDetail, rowCnt } = props;
  const [open, setOpen] = useState(row[rowDetail.childArray].length > 0 ? true : false);
  const classes = useRowStyles();
  const recordId = rowDetail.recordId;
  const recordIdMore = rowDetail.recordIdMore;

  return (
    <>
      <TableRow className={classes.root} style={{ background: "#efefef" }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <i className="fa fa-angle-up"></i> : <i className="fa fa-angle-down"></i>}
          </IconButton>
        </TableCell>
        {rowDetail.columns.map((column) => {
          const value = row[column.id];
          var dataUI;

          if (!column.hidden) {
            switch (column.type) {
              case 'index':
                dataUI = rowCnt;
                break;
              case 'boolean':
                dataUI = row[column.id] === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                break;
              case 'action':
                if (rowDetail.tableType === 'child') {
                  dataUI = <>
                    <Link to={`${rowDetail.onTypes.UPDATE_LINK}${rowDetail.parentId}/${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-info mr-1">
                      <i className="fa fa-pencil-alt text-white"></i>
                    </Link>
                    {rowDetail.withMoreButton && rowDetail.childWithMoreButton && <Link to={`${rowDetail.onTypes.MORE_LINK}${rowDetail.parentId}/${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-primary mr-1">
                      <i className="fa fa-list-alt text-white"></i>
                    </Link>}
                    {rowDetail.withMoreButton && !rowDetail.childWithMoreButton && <Link to={`${rowDetail.onTypes.MORE_LINK}${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-primary mr-1">
                      <i className="fa fa-list-alt text-white"></i>
                    </Link>}
                    <Link to={`${rowDetail.onTypes.DELETE_LINK}${rowDetail.parentId}/${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-danger">
                      <i className="fa fa-trash"></i>
                    </Link>
                  </>
                } else if (rowDetail.tableType === 'childWithMore') {
                  dataUI = <>
                    <Link to={`${rowDetail.onTypes.UPDATE_LINK}${rowDetail.childId}/${rowDetail.parentId}/${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-info mr-1">
                      <i className="fa fa-pencil-alt text-white"></i>
                    </Link>
                    {rowDetail.withMoreButton && rowDetail.childWithMoreButton && <Link to={`${rowDetail.onTypes.MORE_LINK}${rowDetail.parentId}/${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-primary mr-1">
                      <i className="fa fa-list-alt text-white"></i>
                    </Link>}
                    {rowDetail.withMoreButton && !rowDetail.childWithMoreButton && <Link to={`${rowDetail.onTypes.MORE_LINK}${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-primary mr-1">
                      <i className="fa fa-list-alt text-white"></i>
                    </Link>}
                    <Link to={`${rowDetail.onTypes.DELETE_LINK}${rowDetail.childId}/${rowDetail.parentId}/${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-danger">
                      <i className="fa fa-trash"></i>
                    </Link>
                  </>
                } else {
                  dataUI = <>
                    <Link to={`${rowDetail.onTypes.UPDATE_LINK}${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-info mr-1">
                      <i className="fa fa-pencil-alt text-white"></i>
                    </Link>
                    {rowDetail.withMoreButton && rowDetail.childWithMoreButton && <Link to={`${rowDetail.onTypes.MORE_LINK}${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-primary mr-1">
                      <i className="fa fa-list-alt text-white"></i>
                    </Link>}
                    <Link to={`${rowDetail.onTypes.DELETE_LINK}${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-danger">
                      <i className="fa fa-trash"></i>
                    </Link>
                  </>
                }
                break;
              default:
                dataUI = column.format && typeof value === 'number' ? column.format(value) : column.withDateFormat ? moment(value).format('YYYY-MM-DD') : value;
            }
          }

          return (
            !column.hidden && <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>{dataUI}</TableCell>
          );
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={rowDetail.columns.length + 1}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box ml={15} mt={2} mb={2}>
              <Table size="small" aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    {rowDetail.childColumns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        padding={column.disablePadding ? 'none' : 'default'}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.type === 'index' && column.id === 'RowCnt' ? <Link to={`${rowDetail.onTypes.CREATE_MORE_LINK}${rowDetail.parentId}/${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-primary">
                          <i className="fa fa-plus"></i>
                        </Link> : column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row[rowDetail.childArray].map((result, index) => {
                    return (
                      <TableRow key={index}>
                        {rowDetail.childColumns.map((column) => {
                          const value = result[column.id];
                          var dataUI;

                          if (!column.hidden) {
                            switch (column.type) {
                              case 'index':
                                dataUI = index + 1;
                                break;
                              case 'boolean':
                                dataUI = result[column.id] === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                                break;
                              case 'action':
                                if (rowDetail.tableType === 'child') {
                                  dataUI = <>
                                    <Link to={`${rowDetail.onTypes.UPDATE_MORE_LINK}${rowDetail.parentId}/${result[recordId]}/${result[recordIdMore]}`} className="btn btn-xs btn-icon btn-icon-xs btn-info mr-1">
                                      <i className="fa fa-pencil-alt text-white"></i>
                                    </Link>
                                    <Link to={`${rowDetail.onTypes.DELETE_MORE_LINK}${rowDetail.parentId}/${result[recordId]}/${result[recordIdMore]}`} className="btn btn-xs btn-icon btn-icon-xs btn-danger">
                                      <i className="fa fa-trash"></i>
                                    </Link>
                                  </>
                                } else if (rowDetail.tableType === 'childWithMore') {
                                  dataUI = <>
                                    <Link to={`${rowDetail.onTypes.UPDATE_MORE_LINK}${rowDetail.childId}/${result[recordId]}/${rowDetail.parentId}/${result[recordIdMore]}`} className="btn btn-xs btn-icon btn-icon-xs btn-info mr-1">
                                      <i className="fa fa-pencil-alt text-white"></i>
                                    </Link>
                                    <Link to={`${rowDetail.onTypes.DELETE_MORE_LINK}${rowDetail.childId}/${result[recordId]}/${rowDetail.parentId}/${result[recordIdMore]}`} className="btn btn-xs btn-icon btn-icon-xs btn-danger">
                                      <i className="fa fa-trash"></i>
                                    </Link>
                                  </>
                                } else {
                                  dataUI = <>
                                    <Link to={`${rowDetail.onTypes.UPDATE_MORE_LINK}${result[recordIdMore]}`} className="btn btn-xs btn-icon btn-icon-xs btn-info mr-1">
                                      <i className="fa fa-pencil-alt text-white"></i>
                                    </Link>
                                    <Link to={`${rowDetail.onTypes.DELETE_MORE_LINK}${result[recordIdMore]}`} className="btn btn-xs btn-icon btn-icon-xs btn-danger">
                                      <i className="fa fa-trash"></i>
                                    </Link>
                                  </>
                                }
                                break;
                              default:
                                dataUI = column.format && typeof value === 'number' ? column.format(value) : column.withDateFormat ? moment(value).format('YYYY-MM-DD') : value;
                            }
                          }

                          return (
                            !column.hidden && <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>{dataUI}</TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function IMCollapsibleTable(props) {
  const { tableProps } = props;
  const columns = tableProps.columns;
  const results = tableProps.rows;
  var RowCnt = tableProps.onPage * tableProps.onRowsPerPage;

  return (
    <>
      <Table size="small" aria-label="collapsible table" >
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                padding={column.disablePadding ? 'none' : 'default'}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map(row => (
            <Row key={row[tableProps.recordId]} rowDetail={tableProps} row={row} rowCnt={RowCnt += 1} />
          ))}
        </TableBody>
        <TableFooter>
            
        </TableFooter>
      </Table>
      {tableProps.withFooter && tableProps.tableType === 'child' && <Link to={tableProps.onTypes.LIST_LINK_TO_PARENT} className="btn btn-secondary m-3">Back</Link>}
      {tableProps.withFooter && tableProps.tableType === 'childWithMore' && <Link to={`${tableProps.onTypes.LIST_LINK_TO_PREVIOUS_PARENT}/${tableProps.childId}`} className="btn btn-secondary m-3">Back</Link>}
    </>
  );
}