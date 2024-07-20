import React from "react";
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, Button, TextField } from '@material-ui/core/';
import { upperCase } from 'lodash';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Search, HighlightOff } from '@material-ui/icons';



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


export default function ListFilters(props) {
    const { register, handleSubmit, errors } = useForm();

    const { selectDropdownStatus, selectDropdownSemester, selectDropdownSchoolYear, onSearch,
        keyword, onHandleChangeOnSearch, onHandleChangeKeyword, tableTitle } = props


    const EnhancedTableToolbar = () => {

        const classes = useToolbarStyles();

        return (

            <>
                <section className="row">
                    <Typography className="col-3 ml-5" variant="h6" id="tableTitle" component="div">
                        {onSearch && keyword !== '' ? <span>Searched keyword: <span className="col-3  text-primary">{`${upperCase(keyword)}`}</span></span> : 'Filter'}
                    </Typography>

                    <section className="col-9 row float-right">
                        {props.type !== undefined && props.type === 'applicantList'

                            ?
                            ''
                            :
                            <>
                                {props.type !== undefined && props.type === 'receiveDocuments' ?
                                    ''
                                    :
                                    <div className="col bg-white mr-3 my-0 p-0">{selectDropdownStatus()}</div>

                                }
                                <div className="col bg-white mr-3 my-0 p-0">{selectDropdownSchoolYear()}</div>
                                <div className="col bg-white my-0 p-0">{selectDropdownSemester()}</div>
                            </>

                        }
                        {props.type !== undefined && props.type === 'applicantList'

                            ?
                            <>
                                <div className="col-3"></div>
                                <div className="col-3"></div>
                                <div className="col-3"></div>

                                <form className="col-3" onSubmit={handleSubmit(onSubmit)}>
                                    {onSearch
                                        ?
                                        <>
                                            <Button fullWidth variant="contained" type="submit" color="error">Cancel Search</Button>

                                            {/* <IconButton type="submit" className={classes.iconButton} aria-label="clear" size="large">
                                  <HighlightOff />
                              </IconButton> */}

                                        </>

                                        :

                                        <TextField
                                            id="outlined-basic"
                                            label="Search Student"
                                            variant="outlined"
                                            name="keyword"
                                            inputRef={register()}
                                            size="small"
                                            fullWidth
                                        />
                                    }

                                </form>
                            </>


                            :

                            <form className="col-3" onSubmit={handleSubmit(onSubmit)}>
                                {onSearch
                                    ?
                                    <>
                                        <Button fullWidth variant="contained" type="submit" color="error">Cancel Search</Button>

                                        {/* <IconButton type="submit" className={classes.iconButton} aria-label="clear" size="large">
                                  <HighlightOff />
                              </IconButton> */}

                                    </>

                                    :

                                    <TextField
                                        id="outlined-basic"
                                        label="Search Student"
                                        variant="outlined"
                                        name="keyword"
                                        inputRef={register()}
                                        size="small"
                                        fullWidth
                                    />
                                }

                            </form>

                        }


                    </section>

                </section>



            </>
        );
    };

    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
    };



    const onSubmit = (formValues) => {
        if (onSearch === true) {
            onHandleChangeOnSearch(false);
        } else {
            onHandleChangeOnSearch(true);
        }
        onHandleChangeKeyword(formValues.keyword);
    };


    return (
        <>
            <div className="p-5 float-right">  <EnhancedTableToolbar numSelected={0} /></div>





        </>
    )
}