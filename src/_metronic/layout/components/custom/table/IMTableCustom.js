import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TablePagination, TableRow, TableSortLabel,
} from '@material-ui/core/';
import { Link } from 'react-router-dom';
import { scroller } from "react-scroll";
import moment from 'moment'
import StudentDetailsModal from "../modal/StudentDetailsModal"
const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    }
});



const StyledTableRow = withStyles(theme => ({
    root: {
        '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: '#d1edff'
        }
    },
}))(TableRow)

export default function IMTableCustom(props) {
    const classes = useStyles();
    const [tableTitle, setTableTitle] = useState(props.tableProps.tableTitle);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(props.tableProps.sortField);
    const [selected, setSelected] = useState([]);
    const recordId = props.tableProps.recordId;
    const columns = props.tableProps.columns;
    const results = props.tableProps.rows;
    const studentSubjects = props.tableProps.studentSubjects
    const activeSem = props.tableProps.activeSem
    const activeSchoolYear = props.tableProps.activeSchoolYear

    const totalRecords = props.tableProps.totalRecords;
    const page = props.tableProps.onPage;
    const rowsPerPage = props.tableProps.onRowsPerPage;
    var RowCnt = page * rowsPerPage;
    var onSearch = props.tableProps.onSearch;
    var keyword = props.tableProps.keyword;
    const cashierData = props.data
    useEffect(() => {
        props.tableProps.lastUpdateId !== null && results.length > 0 && scroller.scrollTo(`custom-row-${props.tableProps.lastUpdateId}`, {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart',
            offset: -350,
        });
        setTableTitle(props.tableProps.tableTitle);
    }, [props.tableProps.lastUpdateId, results.length, props.tableProps.tableTitle])

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const EnhancedTableHead = (props) => {
        const { classes, order, orderBy, onRequestSort } = props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>

                    {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                            padding={column.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === column.id ? order : false}
                            style={{ minWidth: column.minWidth }}
                        >
                            {column.withSorting ? <TableSortLabel
                                active={orderBy === column.id}
                                direction={orderBy === column.id ? order : 'asc'}
                                onClick={createSortHandler(column.id)}
                            >
                                {column.label}
                                {orderBy === column.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel> : column.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        classes: PropTypes.object.isRequired,
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };



    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = results.map((n) => n[recordId]);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    console.log(results)
    return (
        <>
            {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
            <TableContainer className={classes.container}>
                <Table size="small" stickyHeader aria-label="sticky table">
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={results.length}
                    />
                    <TableBody>
                        {
                            stableSort(results, getComparator(order, orderBy))
                                .map((row, index) => {
                                    const isItemSelected = row[recordId] === props.tableProps.lastUpdateId ? props.tableProps.onIsLastUpdate : isSelected(row[recordId]);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    let modal
                                    RowCnt += 1;
                                    console.log(row)
                                    console.log(row.isOpenModal)
                                    return (
                                        <StyledTableRow
                                            hover
                                            onClick={(event) => handleClick(event, row[recordId])}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row[recordId]}
                                            selected={isItemSelected}
                                            id={`custom-row-${row[recordId]}`}
                                        >
                                            <StudentDetailsModal
                                                id={row.studentNo}
                                                isOpen={row.isOpenModal}
                                                handleClose={props.handleClick}
                                                row={row}

                                            />

                                            {/* <TableCell padding="checkbox"><Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} /></TableCell> */}
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                console.log(row['studentNo'])
                                                console.log(row)
                                                var dataUI;


                                                if (!column.hidden) {
                                                    if (column.id === 'RowCnt') {
                                                        dataUI = RowCnt;
                                                    } else if (column.id === 'IsActive') {
                                                        dataUI = row.IsActive === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                                                    } else if (column.id === 'IsOffer') {
                                                        dataUI = row.IsOffer === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                                                    } else if (column.id === 'IsOverride') {
                                                        dataUI = row.IsOverride === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                                                    } else if (column.id === 'IsVisible') {
                                                        dataUI = row.IsVisible === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                                                    } else if (column.id === 'IsOneRow') {
                                                        dataUI = row.IsOneRow === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                                                    } else if (column.id === 'AllowInAll') {
                                                        dataUI = row.AllowInAll === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                                                    } else if (column.id === 'IsFinal') {
                                                        dataUI = row.IsFinal === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                                                    } else if (column.id === 'IsDefault') {
                                                        dataUI = row.IsDefault === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                                                    } else if (column.id === 'AdmissionSY') {
                                                        dataUI = row.AdmissionSY === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                                                    } else if (column.id === 'AssessmentSY') {
                                                        dataUI = row.AssessmentSY === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                                                    } else if (column.id === 'EnrollmentSY') {
                                                        dataUI = row.EnrollmentSY === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                                                    } else if (column.id === 'GradingSY') {
                                                        dataUI = row.GradingSY === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                                                    } else if (column.id === 'AdmissionSem') {
                                                        dataUI = row.AdmissionSem === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                                                    } else if (column.id === 'AssessmentSem') {
                                                        dataUI = row.AssessmentSem === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                                                    } else if (column.id === 'EnrollmentSem') {
                                                        dataUI = row.EnrollmentSem === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                                                    } else if (column.id === 'GradingSem') {
                                                        dataUI = row.GradingSem === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                                                    } else if (column.id === 'LibrarySY') {
                                                        dataUI = row.LibrarySY === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                                                    } else if (column.id === 'MobileActive') {
                                                        dataUI = row.MobileActive === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                                                    } else if (column.id === 'AllowDiscount') {
                                                        dataUI = row.AllowDiscount === 1 ? <i className="flaticon2-check-mark text-success"></i> : <i className="flaticon2-delete text-danger"></i>;
                                                    } else if (column.id === 'position') {
                                                        dataUI = row.position ? row.position.description : ''
                                                    } else if (column.id === 'studentNo' && props.tableProps.tableType === 'studentMasterFile') {
                                                        dataUI = row.studentNo ? <a onClick={() => { props.handleClick({ ...row, isOpenModal: true }) }} href="#">{row.studentNo} </a> : '';
                                                    } else if (column.id === 'Action') {
                                                        if (props.tableProps.tableType === 'recieveDocuments') {
                                                            dataUI = <>

                                                                <Link to={{ pathname: `${props.tableProps.onTypes.MORE_LINK}${row['studentId']}`, data: row, studentSubjects: studentSubjects }} className="btn btn-xs btn-icon btn-icon-xs btn-primary mr-1">
                                                                    <i className="fa fa-list-alt text-white"></i>
                                                                </Link>
                                                                <Link to={{ pathname: `${props.tableProps.onTypes.ASSESSMENT_LINK}${row['studentInfoId']}`, data: row, studentSubjects: studentSubjects }} className="btn btn-xs btn-icon btn-icon-xs btn-info mr-1">
                                                                    <i className="fa fa-clipboard-list"></i>
                                                                </Link>

                                                            </>
                                                        } else if (props.tableProps.tableType === 'studentList') {
                                                            dataUI = <>

                                                                <Link to={`${props.tableProps.onTypes.UPDATE_LINK}${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-info mr-1">
                                                                    <i className="fa fa-pen text-white"></i>

                                                                </Link>

                                                                <Link to={`${props.tableProps.onTypes.DELETE_LINK}${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-danger">
                                                                    <i className="fa fa-trash"></i>
                                                                </Link>
                                                            </>
                                                        } else if (props.tableProps.tableType === 'employeeList') {
                                                            dataUI = <>

                                                                {/* <Link to={`${props.tableProps.onTypes.UPDATE_LINK}${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-info mr-1">
                                                                    <i className="fa fa-pen text-white"></i>

                                                                </Link> */}

                                                                <Link to={{ pathname: `${props.tableProps.onTypes.MORE_LINK}${row.id}`, data: row, studentSubjects: studentSubjects }} className="btn btn-xs btn-icon btn-icon-xs btn-primary mr-1">
                                                                    <i className="fa fa-list-alt text-white"></i>
                                                                </Link>

                                                                <button onClick={() => { props.tableProps.onHandleDelete(row.id) }} className="btn btn-xs btn-icon btn-icon-xs btn-danger">
                                                                    <i className="fa fa-trash"></i>
                                                                </button>
                                                            </>
                                                        } else if (props.tableProps.tableType === 'userList') {
                                                            dataUI = <>
                                                                <button onClick={() => { props.tableProps.onHandleUpdate(row) }} className="btn btn-xs btn-icon btn-icon-xs btn-info mr-1">
                                                                    <i className="fa fa-pen text-white"></i>
                                                                </button>
                                                                {/* 


                                                                <button onClick={() => { props.tableProps.onHandleDelete(row.id) }} className="btn btn-xs btn-icon btn-icon-xs btn-danger">
                                                                    <i className="fa fa-trash"></i>
                                                                </button> */}
                                                            </>
                                                        } else if (props.tableProps.tableType === 'positionList') {
                                                            dataUI = <>

                                                                <button onClick={() => { props.tableProps.onHandleUpdate(row) }} className="btn btn-xs btn-icon btn-icon-xs btn-info mr-1">
                                                                    <i className="fa fa-pen text-white"></i>
                                                                </button>



                                                                <button onClick={() => { props.tableProps.onHandleDelete(row.id) }} className="btn btn-xs btn-icon btn-icon-xs btn-danger">
                                                                    <i className="fa fa-trash"></i>
                                                                </button>
                                                            </>
                                                        } else if (props.tableProps.tableType === 'userList') {
                                                            dataUI = <>

                                                                <Link to={`${props.tableProps.onTypes.UPDATE_LINK}${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-info mr-1">
                                                                    <i className="fa fa-pen text-white"></i>

                                                                </Link>

                                                                <Link to={`${props.tableProps.onTypes.DELETE_LINK}${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-danger">
                                                                    <i className="fa fa-trash"></i>
                                                                </Link>
                                                            </>
                                                        } else if (props.tableProps.tableType === 'studentInstructorList') {
                                                            dataUI = <>

                                                                {/* <Link to={`${props.tableProps.onTypes.UPDATE_LINK}${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-info mr-1">
                                                                    <i className="fa fa-pen text-white"></i>

                                                                </Link>

                                                                <Link to={`${props.tableProps.onTypes.DELETE_LINK}${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-danger">
                                                                    <i className="fa fa-trash"></i>
                                                                </Link> */}
                                                            </>
                                                        } else {
                                                            dataUI = <>
                                                                <Link to={`${props.tableProps.onTypes.UPDATE_LINK}${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-info mr-1">
                                                                    <i className="fa fa-pen text-white"></i>

                                                                </Link>
                                                                {props.tableProps.withMoreButton && props.tableProps.childWithMoreButton && <Link to={{ pathname: props.tableProps.onTypes.MORE_LINK, data: cashierData, }} className="btn btn-xs btn-icon btn-icon-xs btn-primary mr-1">
                                                                    <i className="fa fa-list-alt text-white"></i>
                                                                </Link>}
                                                                <Link to={`${props.tableProps.onTypes.DELETE_LINK}${row[recordId]}`} className="btn btn-xs btn-icon btn-icon-xs btn-danger">
                                                                    <i className="fa fa-trash"></i>
                                                                </Link>
                                                            </>
                                                        }
                                                    } else {
                                                        dataUI = column.format && typeof value === 'number' ? column.format(value) : column.withDateFormat ? moment(value).format('YYYY-MM-DD') : value;
                                                    }
                                                }
                                                return (
                                                    !column.hidden && <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>{dataUI}</TableCell>
                                                );
                                            })}
                                        </StyledTableRow>
                                    )
                                })
                        }
                        {results.length === 0 && <TableRow><TableCell colSpan={columns.length + 1}>No data available in the table</TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={props.tableProps.onRowsPerPageOptions}
                component="div"
                count={totalRecords}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={props.tableProps.onHandleChangePage}
                onChangeRowsPerPage={props.tableProps.onHandleChangeRowsPerPage}
            />
            {props.tableProps.withFooter && props.tableProps.tableType === 'child' && <Link to={props.tableProps.onTypes.LIST_LINK_TO_PARENT} className="btn btn-secondary m-3">Back</Link>}
            {props.tableProps.withFooter && props.tableProps.tableType === 'childWithMore' && <Link to={`${props.tableProps.onTypes.LIST_LINK_TO_PREVIOUS_PARENT}/${props.tableProps.childId}`} className="btn btn-secondary m-3">Back</Link>}
        </>
    );
}