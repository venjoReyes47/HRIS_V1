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
import IMSelect from '../select/IMSelect';
import moment from 'moment'
import { useAppContext } from '../../../../../app/contexts/useAppContext'
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

export default function IMTableFaculty(props) {
    const { state: { users, auth }, dispatch } = useAppContext();

    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(props.tableProps.sortField);
    const [selected, setSelected] = useState([]);
    const recordId = props.tableProps.recordId;
    const columns = props.tableProps.columns;
    const results = props.tableProps.rows;
    const totalRecords = props.tableProps.totalRecords;
    const page = props.tableProps.onPage;
    const rowsPerPage = props.tableProps.onRowsPerPage;
    const [data, setData] = useState(null)
    const [tableData, setTableData] = useState(null)
    const [subjectScheduleDetailList, setSubjectScheduleDetailList] = useState()
    const [isSave, setIsSave] = useState()
    var RowCnt = page * rowsPerPage;




    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;

    const { register, handleSubmit, setError, setValue, formState: { errors } } = useForm({
        defaultValues: {
            user: ''
        }
    });



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


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        // if (event.target.checked) {
        //     const newSelecteds = results.map((n) => n[recordId]);
        //     setSelected(newSelecteds);
        //     return;
        // }
        // setSelected([]);
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





    const selectHandleChange = name => event => {
        setData({ [name]: event });
        setTableData({ ...tableData, [name]: event })
    }




    const onSaveFaculty = (row) => {
        let id



        const checkIsDuplicate = obj => obj.SubjectScheduleDetailId === row.subjectSchedDetailId;

        const saveData = {
            userId: data[Object.keys(data)[0]],
            subjectScheduleDetailId: row.subjectSchedDetailId,
            createdBy: auth.data.Username,
            dateUpdated: dateTime,
            updatedBy: auth.data.Username,
            dateCreated: dateTime,



        }
        console.log(row)
        console.log(subjectScheduleDetailList)
        console.log(subjectScheduleDetailList.some(checkIsDuplicate))

        for (let i = 0; i < subjectScheduleDetailList.length; i++) {
            if (subjectScheduleDetailList[i].SubjectScheduleDetailListId === row.id) {
                id = subjectScheduleDetailList[i].SubjectScheduleDetailListId
            }
        }
        props.onSavePatch(id, saveData)


        // else {
        //     props.onSave(saveData)

        // }


        if (isSave === true) {
            setIsSave(false)

        } else {
            setIsSave(true)

        }


    }



    useEffect(() => {
        const execute = async () => {
            await props.getSubDetailList()
                .then(response => {
                    if (response.success) {

                        setSubjectScheduleDetailList(response.data)

                    } else {
                    }
                })
                .catch(error => {
                    console.log(error)
                    if (error) {

                    } else {
                    }
                })

        }
        execute()

    }, [isSave, props.isGenerate])

    useEffect(() => {
        if (subjectScheduleDetailList) {

            let arr = {}
            for (let i = 0; i < subjectScheduleDetailList.length; i++) {
                for (let v = 0; v < results.length; v++) {
                    if (subjectScheduleDetailList[i].SubjectScheduleDetailListId === results[v].id) {
                        // arr.push([results[v].subjectSchedDetailId]: props.subDetail[i].UserId)
                        arr[[results[v].id]] = subjectScheduleDetailList[i].UserId;
                    }

                }
            }
            setTableData(arr)
        }

    }, [subjectScheduleDetailList])

    console.log(tableData)
    console.log(results)
    console.log(props.user)
    return (
        <>
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
                                    RowCnt += 1;
                                    return (

                                        <StyledTableRow
                                            hover
                                            onClick={(event) => handleClick(event, row[recordId])}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row[recordId]}
                                            id={`custom-row-${row[recordId]}`}
                                        >
                                            {tableData !== null && columns.map((column) => {
                                                const value = row[column.id];
                                                var dataUI;

                                                if (!column.hidden) {
                                                    if (column.id === 'RowCnt') {
                                                        dataUI = RowCnt;
                                                    } else if (column.id === 'Action') {
                                                        if (props.tableProps.tableType === 'childWithMore') {
                                                            dataUI = <>
                                                                <IMSelect
                                                                    data={props.users}
                                                                    onHandleChange={selectHandleChange(`${row.id}`)}
                                                                    refClassContainer="form-group mb-3"
                                                                    name={`${row.id}`}
                                                                    isRequired={false}
                                                                    withLabel={false}
                                                                    placeHolder="Select Faculty"
                                                                    forwardRef={setValue}
                                                                    selectedId={tableData[row.id] === null ? props.users : tableData[row.id]}
                                                                    refClassName={``}

                                                                    withDescription={false}
                                                                    // description={`Please select your gender.`}
                                                                    refDisabled={true}
                                                                    refIsStatic={false}
                                                                    refStaticData={[

                                                                    ]}
                                                                    field={{
                                                                        tableId: 'tableId',
                                                                        display: 'code'
                                                                    }}
                                                                // error={!!errors[`user${index}`]}
                                                                // errorMessage={errors[`user${index}`] && errors[`user${index}`].type === "required" && 'Faculty is required'}
                                                                />

                                                            </>

                                                        }
                                                    } else if (column.id === 'Save') {
                                                        if (props.tableProps.tableType === 'childWithMore') {
                                                            dataUI = <>
                                                                <button type='button' onClick={() => { onSaveFaculty(row) }} className="btn btn-xs btn-icon btn-icon-xs btn-success">
                                                                    <i className="fa fa-save text-light"></i>
                                                                </button>
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