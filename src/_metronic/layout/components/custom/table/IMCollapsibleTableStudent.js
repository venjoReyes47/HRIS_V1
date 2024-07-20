import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableHead, TableRow, TableFooter, TableCell, Box, Collapse, IconButton, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import { CheckBox } from '@material-ui/icons';
import { array } from 'prop-types';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});



const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
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

export default function IMCollapsibleTableStudent(props) {
    const [selectedSubject, setSelectedSubject] = useState([]);
    const [selectedSubCode, setSelectedSubCode] = useState([])
    const [selectedSched, setSelectedSched] = useState([])
    const [selectedDetailIdList, setSelectedDetailIdList] = useState([])
    const [oneTimeRun, setOneTimeRun] = useState(false)
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const { tableProps } = props;
    const columns = tableProps.columns;
    const results = tableProps.rows;
    const isProcessed = props.isProcessed
    const detailList = props.subSchedDetailList
    const recordId = props.recordId
    const recordIdMore = props.tableProps.recordIdMore
    var RowCnt = tableProps.onPage * tableProps.onRowsPerPage;
    const isItemSelected = true
    const lastUpdateId = props.tableProps.lastUpdateId
    console.log(isProcessed)
    useEffect(() => {
        if (props.selectedSub !== undefined) {
            setSelectedSched(props.selectedSched)
            setSelectedSubject(props.selectedSub)
            setSelectedSubCode(props.selectedSubCode)

        }
    }, [])


    const clickSubjectHandler = (event, selectedSub, subCode) => {
        event.persist()
        let arr = []
        let arr2 = []
        arr = []
        arr2 = []
        if (event.target.checked === true) {
            arr.push(...selectedSubject, selectedSub)
            arr2.push(...selectedSubCode, subCode)
        } else if (event.target.checked === false) {

            console.log(selectedSub)
            console.log(selectedSubCode)
            console.log(selectedSubject)
            let value = selectedSub
            let value2 = subCode
            let recentSelect = selectedSubject
            let recentSelect2 = selectedSubCode

            recentSelect = recentSelect.filter(item => item !== value)
            recentSelect2 = recentSelect2.filter(item => item !== value2)

            console.log(recentSelect)
            arr = recentSelect
            arr2 = recentSelect2
        }

        console.log(arr)
        console.log(arr2)
        props.subjectCodeHandler(arr2)
        console.log(subCode)
        setSelectedSubCode(arr2)
        setSelectedSubject(arr)
    };
    const [isDuplicate, setIsDuplicate] = useState(false)




    const clickSchedHandler = (event, schedule, scheduleDetailId) => {
        console.log(event.target.checked)

        let arr = []
        let arr2 = []
        let selectedVal
        console.log(event.target.checked)
        if (event.target.checked === true) {

            selectedVal = schedule
            if (selectedDetailIdList.length > 0 && selectedDetailIdList.includes(scheduleDetailId)) {
                let index = selectedDetailIdList.indexOf(scheduleDetailId)
                console.log(selectedSched)

                let data = selectedSched.splice(index, 1)
                console.log(selectedSched)

                console.log(index)
                console.log(data)
                arr.push(...selectedSched, schedule)
                arr2.push(...selectedDetailIdList)
            } else {
                arr.push(...selectedSched, schedule)
                arr2.push(...selectedDetailIdList, scheduleDetailId)
            }



        }


        console.log(arr)
        console.log(arr2)
        props.scheduleCodeHandler(arr)
        setSelectedSched(arr)
        setSelectedDetailIdList(arr2)
    };
    console.log(selectedSubject)

    console.log(results)

    useEffect(() => {

    }, [])
    const Row = (props) => {


        const { row, rowDetail, rowCnt, index } = props;
        const findExisted = () => {
            if (row[rowDetail.childArray]) {
                for (let i = 0; i < selectedSched.length; i++) {
                    for (let v = 0; v < row[rowDetail.childArray].length; v++) {
                        if (row[rowDetail.childArray][v].SubjectScheduleDetailListId === selectedSched[i]) {
                            return row[rowDetail.childArray][v].SubjectScheduleDetailListId === selectedSched[i]
                        }
                    }
                }
            }

        }
        const [open, setOpen] = useState(false);
        const classes = useRowStyles();
        const recordId = rowDetail.recordId;
        const recordIdMore = rowDetail.recordIdMore;
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
            <>
                <TableRow style={{ background: "#ffffff" }}>
                    <TableCell>
                        {open === true ? <button className='btn btn-secondary btn-sm p-1' aria-label="expand row" size="small" onClick={() => { setOpen(false) }}>
                            <i className="fa fa-calendar-check p-0 fa-sm"></i>
                        </button> : <button className='btn btn-primary btn-sm p-1' aria-label="expand row" size="small" onClick={() => { setOpen(true) }}>
                            <i className="fa fa-calendar-check p-0 fa-sm"></i>
                        </button>}

                    </TableCell>
                    {rowDetail.columns.map((column) => {
                        const value = row[column.id];
                        var dataUI;
                        const isSelected = (name) => selectedSubject.indexOf(name) !== -1;

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
                                            {isProcessed === false ? <input
                                                className='subCheckBox'
                                                type='checkbox'
                                                checked={isSelected(row[recordId])}
                                                onChange={(event) => { clickSubjectHandler(event, row[recordId], row['SubjectCode']) }}
                                            /> :
                                                <input
                                                    disabled
                                                    className='subCheckBox'
                                                    type='checkbox'
                                                    checked={isSelected(row[recordId])}
                                                    onChange={(event) => { clickSubjectHandler(event, row[recordId], row['SubjectCode']) }}
                                                />

                                            }


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
                <TableRow className='card bg-light' >
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={rowDetail.columns.length + 1}>
                        <Collapse in={open} timeout="auto" unmountOnExit className=''>

                            <Table size="small" aria-label="collapsible table">
                                <TableHead>
                                    <TableRow
                                    >
                                        {rowDetail.childColumns.map((column) => (
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
                                    {row[rowDetail.childArray].map((result, index) => {
                                        const isSelected = true;
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
                                                                        {/* <Checkbox onClick={() => { clickSubjectHandler(selectedSubject) }} /> */}
                                                                        {/* {isProcessed === false ?
                                                                            <input
                                                                                name={`${result.SubjectScheduleDetailId}`}
                                                                                className='subCheckBox'
                                                                                type='radio'
                                                                                checked={isSelected}
                                                                                onChange={(event) => { clickSchedHandler(event, result[recordIdMore], result['SubjectScheduleDetailId']) }}

                                                                            /> : <input
                                                                                disabled
                                                                                name={`${result.SubjectScheduleDetailId}`}
                                                                                className='subCheckBox'
                                                                                type='radio'
                                                                                checked={isSelected}
                                                                                onChange={(event) => { clickSchedHandler(event, result[recordIdMore], result['SubjectScheduleDetailId']) }}

                                                                            />
                                                                        } */}



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

                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        );
    }


    console.log(selectedSched)
    console.log(selectedDetailIdList)


    return (
        <>
            <Table size="small" aria-label="collapsible table" className='container' >
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
                    {stableSort(results, getComparator(order, orderBy)).map((row, index) => (
                        <Row key={row[tableProps.recordId]} rowDetail={tableProps} row={row} rowCnt={RowCnt += 1} index={index} />
                    ))}
                </TableBody>
                <TableFooter>
                    {results.length === 0 && <TableRow><TableCell className='text-center font-weight-bold' colSpan={columns.length + 1}>--- No data available in the table ---</TableCell></TableRow>}

                </TableFooter>
            </Table>
            {tableProps.withFooter && tableProps.tableType === 'childWithMore' && <Link to={`${tableProps.onTypes.LIST_LINK_TO_PREVIOUS_PARENT}/${tableProps.childId}`} className="btn btn-secondary m-3">Back</Link>}
        </>
    );
}