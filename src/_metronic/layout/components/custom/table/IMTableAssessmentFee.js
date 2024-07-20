import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel
    , Toolbar, Typography, Checkbox, Tooltip, InputBase, IconButton, Paper
} from '@material-ui/core/';
import { Search, DeleteSweep, HighlightOff } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { upperCase } from 'lodash';
import { scroller } from "react-scroll";
import moment from 'moment'

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

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10
    },
    paper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 300,
    }
}));

const StyledTableRow = withStyles(theme => ({
    root: {
        '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: '#d1edff'
        }
    },
}))(TableRow)

export default function IMTableAssessment(props) {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm();
    const [tableTitle, setTableTitle] = useState(props.tableProps.tableTitle);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(props.tableProps.sortField);
    const [selected, setSelected] = useState([]);
    const [selected2, setSelected2] = useState([])
    const [selected3, setSelected3] = useState([])
    const recordId = props.tableProps.recordId;
    const recordId2 = props.tableProps.recordId2
    const recordId3 = props.tableProps.recordId3
    const columns = props.tableProps.columns;
    const results = props.tableProps.rows;
    const totalRecords = props.tableProps.totalRecords;
    const page = props.tableProps.onPage;
    const rowsPerPage = props.tableProps.onRowsPerPage;
    var RowCnt = 0;
    var onSearch = props.tableProps.onSearch;
    var keyword = props.tableProps.keyword;
    var istableTitle = props.tableProps.withTableTitle;

    useEffect(() => {
        props.tableProps.lastUpdateId !== null && results.length > 0 && scroller.scrollTo(`custom-row-${props.tableProps.lastUpdateId}`, {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart',
            offset: -350,
        });
        setTableTitle(props.tableProps.tableTitle);
    }, [props.tableProps.lastUpdateId, results, props.tableProps.tableTitle])

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
        const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
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

    const onSaveCheckSubject = () => {
        alert("Subject Saved")
    }
    const EnhancedTableToolbar = (props) => {
        const classes = useToolbarStyles();
        const { numSelected } = props;

        return (
            <div>
                <Toolbar>


                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        {tableTitle}
                    </Typography>



                </Toolbar>
            </div>

        );
    };

    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
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

    const handleClick = (event, name, name2, name3) => {
        const selectedIndex = selected.indexOf(name);
        const selectedIndex2 = selected2.indexOf(name2)
        let newSelected = [];
        let newSelected2 = []
        let newSelected3 = [];
        if (selectedIndex === -1 || selectedIndex2 === -1) {
            newSelected = newSelected.concat(selected, name);
            newSelected2 = newSelected2.concat(selected2, name2);

        } else if (selectedIndex === 0 || selectedIndex2 === 0) {
            newSelected = newSelected.concat(selected.slice(1));
            newSelected2 = newSelected2.concat(selected2.slice(1));
        } else if (selectedIndex === selected.length - 1 || selectedIndex2 === selected2.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
            newSelected2 = newSelected2.concat(selected2.slice(0, -1));
        } else if (selectedIndex > 0 || selectedIndex2 > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
            newSelected2 = newSelected2.concat(
                selected2.slice(0, selectedIndex2),
                selected2.slice(selectedIndex2 + 1),
            );
        }

        if (name3 === 89) {
            const selectedIndex3 = selected3.indexOf(name3);



            if (selectedIndex3 === -1) {
                newSelected3 = newSelected3.concat(selected3, name3);


            } else if (selectedIndex3 === 0) {
                newSelected3 = newSelected3.concat(selected3.slice(1));

            } else if (selectedIndex3 === selected3.length - 1) {
                newSelected3 = newSelected3.concat(selected3.slice(0, -1));

            } else if (selectedIndex3 > 0) {
                newSelected3 = newSelected3.concat(
                    selected3.slice(0, selectedIndex3),
                    selected3.slice(selectedIndex3 + 1),
                );

            }
        }

        setSelected(newSelected);
        setSelected2(newSelected2)
        setSelected3(newSelected3)


    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const onSubmit = (formValues) => {
        if (formValues.keyword === '') {
            props.tableProps.onHandleChangeOnSearch(false);
            setTableTitle(props.tableProps.tableTitle);
        } else {
            props.tableProps.onHandleChangeOnSearch(true);
            setTableTitle(formValues.keyword);
        }
        props.tableProps.onHandleChangeKeyword(formValues.keyword);
    };




    return (
        <>
            <EnhancedTableToolbar numSelected={selected.length} />
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
                                    RowCnt += 1;
                                    return (
                                        <StyledTableRow
                                            hover
                                            onClick={(event) => handleClick(event, row[recordId], row[recordId2], row[recordId3])}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row[recordId]}
                                            // selected={isItemSelected}
                                            id={`custom-row-${row[recordId]}`}
                                        >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                var dataUI;

                                                if (!column.hidden) {
                                                    if (column.id === 'RowCnt') {
                                                        dataUI = RowCnt;
                                                    } else
                                                        if (column.id === 'Action') {
                                                            if (props.tableProps.tableType === 'cashiering' || props.tableProps.tableType === 'parent') {
                                                                dataUI = <>

                                                                    {<Link to={{ pathname: `${props.tableProps.onTypes.CREATE_LINK}${props.tableProps.id}`, BackAccountData: props.tableProps.data, index: RowCnt - 1 }} className="btn btn-xs btn-icon btn-icon-xs btn-primary mr-1">
                                                                        <i class="fa fa-cash-register text-white"></i>
                                                                    </Link>}


                                                                </>
                                                            }

                                                        }
                                                        else {
                                                            dataUI = column.format && typeof value === 'number' ? column.format(value) : column.withDateFormat ? moment(value).format('YYYY-MM-DD') : value;
                                                        }
                                                }
                                                return (
                                                    !column.hidden && <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>{dataUI}</TableCell>
                                                );
                                            })}
                                            {/* {props.tableProps.tableType === 'cashiering' ?
                                                <TableCell padding="checkbox"><Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} /></TableCell>
                                                : ''} */}

                                        </StyledTableRow>
                                    )
                                })
                        }
                        {results.length === 0 && <TableRow><TableCell colSpan={columns.length + 1}>No data available in the table</TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* {totalRecords > 0 && <TablePagination
                rowsPerPageOptions={props.tableProps.onRowsPerPageOptions}
                component="div"
                count={totalRecords}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={props.tableProps.onHandleChangePage}
                onChangeRowsPerPage={props.tableProps.onHandleChangeRowsPerPage}
            />} */}
            {props.tableProps.withFooter && props.tableProps.tableType === 'child' && <Link to={props.tableProps.onTypes.LIST_LINK_TO_PARENT} className="btn btn-secondary m-3">Back</Link>}
            {props.tableProps.withFooter && props.tableProps.tableType === 'childWithMore' && <Link to={`${props.tableProps.onTypes.LIST_LINK_TO_PREVIOUS_PARENT}/${props.tableProps.childId}`} className="btn btn-secondary m-3">Back</Link>}
        </>
    );
}