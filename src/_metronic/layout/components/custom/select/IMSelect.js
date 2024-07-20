import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function IMSelect(props) {
    const { data, field, selectedId, refIsStatic, refStaticData, forwardRef, name
        , error, errorMessage, isRequired, withLabel, label, description, withDescription
        , placeHolder, onHandleChange, withClassContainer, refClassContainer } = props;
    const [results, setResults] = useState([]);
    const [selectedValue, setSelectedValue] = useState({
        id: '',
        label: ''
    });

    useEffect(() => {
        if (!refIsStatic) {
            const convertedData = [{ id: '', label: '' }];
            data.map(row => {
                return convertedData.push({
                    id: row[field.tableId],
                    label: field.code === undefined ? row[field.display] : `${row[field.code]} - ${row[field.display]}`
                })
            })
            setResults(convertedData);

            if (selectedId !== '') {
                if (data.filter(row => row[field.tableId] === selectedId).length > 0) {
                    const rec = data.filter(row => row[field.tableId] === selectedId)[0];
                    setSelectedValue({
                        id: selectedId,
                        label: field.code === undefined ? rec[field.display] : `${rec[field.code]} - ${rec[field.display]}`
                    })
                    forwardRef(name, selectedId)
                } else {
                    setSelectedValue({
                        id: '',
                        label: ''
                    })
                }
            } else {
                setSelectedValue({
                    id: '',
                    label: ''
                })
                forwardRef(name, '')
            }
        } else {
            setResults(refStaticData);

            if (selectedId !== '') {
                if (refStaticData.filter(row => row.id === selectedId).length > 0) {
                    const rec = refStaticData.filter(row => row.id === selectedId)[0];
                    setSelectedValue({
                        id: selectedId,
                        label: rec.label
                    })
                    forwardRef(name, selectedId)
                } else {
                    setSelectedValue({
                        id: '',
                        label: ''
                    })
                }
            } else {
                forwardRef(name, '')
                setSelectedValue({
                    id: '',
                    label: ''
                })
            }
        }
    }, [data, field.tableId, field.code, field.display, selectedId, refIsStatic, refStaticData, forwardRef, name])

    return (
        <>
            {!refIsStatic && <div className={withClassContainer}>
                {withLabel && <label>{label} {isRequired && <span className="text-danger">*</span>}</label>}
                <Autocomplete
                    value={selectedValue}
                    options={results}
                    getOptionLabel={(option) => option.label === undefined ? '' : option.label}
                    getOptionSelected={(option, value) => option.id === value.id}
                    onChange={(event, newValue, reason) => {
                        forwardRef(name, reason === "clear" ? '' : newValue.id);
                        setSelectedValue(newValue === null ? { id: '', label: '' } : { id: newValue.id, label: newValue.label });
                        onHandleChange(newValue === null ? '' : newValue.id);
                    }}
                    renderInput={(params) => <TextField {...params} placeholder={placeHolder} variant="outlined" size="small" error={error} />}
                />
                {withDescription && !error && <span className="form-text text-muted">{description}</span>}
                {error && <span className="form-text text-danger">{errorMessage}</span>}
            </div>}
            {refIsStatic && <div className={refClassContainer}>
                {withLabel && <label>{label} {isRequired && <span className="text-danger">*</span>}</label>}
                <Autocomplete
                    value={selectedValue}
                    options={results}
                    getOptionLabel={(option) => option.label === undefined ? '' : option.label}
                    getOptionSelected={(option, value) => option.id === value.id}
                    onChange={(event, newValue, reason) => {
                        forwardRef(name, reason === "clear" ? '' : newValue.id);
                        setSelectedValue(newValue === null ? { id: '', label: '' } : { id: newValue.id, label: newValue.label });
                        onHandleChange(newValue === null ? '' : newValue.id);
                    }}
                    renderInput={(params) => <TextField {...params} placeholder={placeHolder} variant="outlined" size="small" error={error} />}
                />
                {withDescription && !error && <span className="form-text text-muted">{description}</span>}
                {error && <span className="form-text text-danger">{errorMessage}</span>}
            </div>}
        </>
    )
}