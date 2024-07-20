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
    const recordId = props.tableProps.recordId;
    const recordId2 = props.tableProps.recordId2
    const columns = props.tableProps.columns;
    const subjects = props.tableProps.rows;
    const checkedResults = props.tableProps.checkedRows
    const combined = [...subjects, ...checkedResults]
    const totalRecords = props.tableProps.totalRecords;
    const page = props.tableProps.onPage;
    const rowsPerPage = props.tableProps.onRowsPerPage;
    const [isLoading, setIsLoading] = useState()



    const keys = ['SubjectScheduleDetailId'],
        results = combined.filter(
            (s => o =>
                (k => !s.has(k) && s.add(k))
                    (keys.map(k => o[k]).join('|'))
            )
                (new Set)
        );

    console.log(results)
    console.log(subjects)
    console.log(checkedResults)

    const subjectRetriever = (a, b) => {
        props.onSaveSubject(a, b)


    }


    const notcheckedRetriever = (arr) => {
        props.onNotSaveSubject(arr)
    }


    const loaderHandler = () => {
        props.isLoadingHandler(true)
    }


    var RowCnt = page * rowsPerPage;
    var onSearch = props.tableProps.onSearch;
    var keyword = props.tableProps.keyword;

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

    const EnhancedTableHead = (propss) => {
        const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = propss;
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
                    {/* <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{ 'aria-label': 'Check All' }}
                        />
                    </TableCell> */}
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

    // const onSaveSubjects = () => {
    //     props.onSaveCheckSubject(selected)
    //     console.log(selected)
    // }
    const [scanOn, setScanOn] = useState(true)
    const [isLoad, setIsLoad] = useState(false)
    const EnhancedTableToolbar = (props) => {
        const classes = useToolbarStyles();
        const { numSelected } = props;



        const clickSubjectHandler = (select1, select2) => {
            setScanOn(false)
            return subjectRetriever(select1, select2)

        }


        useEffect(() => {
            if (!scanOn && selected.length < 1 && results.length > 0) {

                subjectRetriever(selected, selected)
                setScanOn(true)
            }
        }, [results])



        return (
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                {numSelected > 0 ? (
                    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                        <div className='row my-5 p-1'>
                            <div className='col-12 '>{numSelected} Subject are active for this student</div>
                            <div className='col'><Checkbox onClick={clickSubjectHandler(selected, selected2)} className='btn btn-success btn-sm float-right d-none'>Save</Checkbox ></div>





                        </div>


                    </Typography>
                ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        {onSearch && keyword !== '' ? <span>Searched keyword: <span className="text-primary">{`${upperCase(keyword)}`}</span></span> : tableTitle}
                    </Typography>
                )
                }


            </Toolbar >
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
        console.log(event)
        if (event.target.checked) {
            const newSelecteds = results.map((n) => n[recordId]);
            const newSelecteds2 = results.map((n) => n[recordId2]);



            setSelected(newSelecteds);
            setSelected2(newSelecteds2)
            return;
        }
        // setSelected([]);
        // setSelected2([])
    };

    const handleClick = (event, name, name2) => {
        if (props.assessmentStatus) {
            if (props.assessmentStatus.toString() === 'E') {

            } else {
                loaderHandler()

                const selectedIndex = selected.indexOf(name);
                let newSelected = [];
                let newSelected2 = []
                if (selectedIndex === -1) {
                    newSelected = newSelected.concat(selected, name);
                    newSelected2 = newSelected2.concat(selected2, name2);

                } else if (selectedIndex === 0) {
                    newSelected = newSelected.concat(selected.slice(1));
                    newSelected2 = newSelected2.concat(selected2.slice(1));

                } else if (selectedIndex === selected.length - 1 && selectedIndex === selected2.length - 1) {
                    newSelected = newSelected.concat(selected.slice(0, -1));
                    newSelected2 = newSelected2.concat(selected2.slice(0, -1));
                } else if (selectedIndex > 0) {
                    newSelected = newSelected.concat(
                        selected.slice(0, selectedIndex),
                        selected.slice(selectedIndex + 1),
                    );
                    newSelected2 = newSelected2.concat(
                        selected2.slice(0, selectedIndex),
                        selected2.slice(selectedIndex + 1),
                    );
                }



                setSelected(newSelected);
                setSelected2(newSelected2)

            }
        } else {
            loaderHandler()

            const selectedIndex = selected.indexOf(name);
            let newSelected = [];
            let newSelected2 = []
            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, name);
                newSelected2 = newSelected2.concat(selected2, name2);

            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
                newSelected2 = newSelected2.concat(selected2.slice(1));

            } else if (selectedIndex === selected.length - 1 && selectedIndex === selected2.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
                newSelected2 = newSelected2.concat(selected2.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                );
                newSelected2 = newSelected2.concat(
                    selected2.slice(0, selectedIndex),
                    selected2.slice(selectedIndex + 1),
                );
            }



            setSelected(newSelected);
            setSelected2(newSelected2)

        }




    };
    const [oneTimeRun, setOneTimeRun] = useState(true)
    if (props.checkedSubjects.length > 0 && oneTimeRun === true) {

        let uniq = [...new Set(props.checkedSubjects)]


        setSelected(uniq)
        let arr = []
        for (let i = 0; i < props.subject.length; i++) {
            for (let v = 0; v < uniq.length; v++) {
                if (props.subject[i].SubjectId === uniq[v]) {
                    arr.push(props.subject[i].SubjectCode)
                }
            }
        }

        let uniq2 = [...new Set(arr)]

        setSelected2(uniq2)

        setOneTimeRun(false)
    }
    console.log(props.checkedSubjects)
    console.log(selected2)
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

    const [count, setCount] = useState(0)
    const onLoopofSubjects = (rowIndex, labelId, isItemSelected) => {
        console.log(props.assessmentStatus)
        if (props.assessmentStatus.toString() === 'E') {
            for (let i = 0; i < props.checkedSubjects.length; i++) {
                if (rowIndex === props.checkedSubjects[i]) {
                    return <TableCell disabled padding="checkbox"><Checkbox checked={isItemSelected ? true : false} inputProps={{ 'aria-labelledby': labelId }} disabled /></TableCell>
                } else {
                    return <TableCell disabled padding="checkbox"><Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} disabled /></TableCell>
                }
            }
        } else if (props.assessmentStatus.toString() === 'A' || props.assessmentStatus.toString() === 'FV') {

            for (let i = 0; i < props.checkedSubjects.length; i++) {
                if (rowIndex === props.checkedSubjects[i]) {
                    return <TableCell padding="checkbox"><Checkbox checked={isItemSelected ? true : false} inputProps={{ 'aria-labelledby': labelId }} /></TableCell>
                } else {
                    return <TableCell padding="checkbox"><Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} /></TableCell>
                }
            }

        }

        console.log(isItemSelected)




    }

    console.log(selected)

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
                                            onClick={(event) => handleClick(event, row[recordId], row[recordId2])}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row[recordId]}
                                            selected={isItemSelected}
                                            id={`custom-row-${row[recordId]}`}
                                        >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                var dataUI;

                                                if (!column.hidden) {
                                                    if (column.id === 'RowCnt') {
                                                        dataUI = RowCnt;
                                                    } else {
                                                        dataUI = column.format && typeof value === 'number' ? column.format(value) : column.withDateFormat ? moment(value).format('YYYY-MM-DD') : value;
                                                    }
                                                }
                                                return (
                                                    !column.hidden && <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>{dataUI}</TableCell>
                                                );
                                            })}
                                            {!props.checkedSubjects.length > 0 ? <TableCell padding="checkbox"><Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} /></TableCell>
                                                : onLoopofSubjects(row[recordId], labelId, isItemSelected)

                                            }



                                        </StyledTableRow>
                                    )
                                })
                        }
                        {results.length === 0 && <TableRow><TableCell colSpan={columns.length + 1}>No data available in the table</TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
            {totalRecords > 0 && <TablePagination
                rowsPerPageOptions={props.tableProps.onRowsPerPageOptions}
                component="div"
                count={totalRecords}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={props.tableProps.onHandleChangePage}
                onChangeRowsPerPage={props.tableProps.onHandleChangeRowsPerPage}
            />}
            {props.tableProps.withFooter && props.tableProps.tableType === 'child' && <Link to={props.tableProps.onTypes.LIST_LINK_TO_PARENT} className="btn btn-secondary m-3">Back</Link>}
            {props.tableProps.withFooter && props.tableProps.tableType === 'childWithMore' && <Link to={`${props.tableProps.onTypes.LIST_LINK_TO_PREVIOUS_PARENT}/${props.tableProps.childId}`} className="btn btn-secondary m-3">Back</Link>}
        </>
    );
}