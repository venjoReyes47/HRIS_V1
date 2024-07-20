import React from "react";


export default function SelectCreator(operation, setData, id, code, con, isMasterlist) {

    const execute = async () => {
        await operation(con)
            .then(res => {
                console.log(res)
                if (res.status == 200) {
                    console.log(res)
                    let arr = [{ tableId: null, code: '-- All Position --' }]
                    if (id == 'SchoolId' || id == 'CourseId') {
                        arr.push({ tableId: null, code: 'Not Listed' })
                    }
                    if (id == 'SubjectCategoryId') {
                        arr.push({ tableId: null, code: 'Unassigned' })
                    }
                    if (id == 'YearLevelId' && isMasterlist == true) {
                        arr.push({ tableId: null, code: 'NA' })
                    }
                    if (id == 'YearLevelId' && isMasterlist != true) {
                        arr.push({ tableId: null, code: 'All' })
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].isActive == 1)
                            arr.push({ tableId: res.data[i][id], code: res.data[i][code].toString() })
                    }
                    console.log(arr)
                    setData(arr)
                }
            })
            .catch(e => {
                console.log(e)
                return []
            })
    }

    execute()





}