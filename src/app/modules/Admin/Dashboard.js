import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/useAppContext';
import { getStatistics } from './__hooks__';
import moment from 'moment';
import history from '../../history';
import StatisticsChart from './StatisticsChart'; // Import the new component

export default function Dashboard() {
    const { state: { auth } } = useAppContext();
    const [isAdmin, setIsAdmin] = useState(false);
    const [statsValue, setStatsValue] = useState(null);

    useEffect(() => {
        if (localStorage.UserType === 'A') {
            setIsAdmin(true);
        }
        getStatistics()
            .then(resp => {
                console.log(resp);
                setStatsValue(resp.data);
            });
    }, []);

    const onAddUser = () => {
        history.push('/admin/user-registration');
    };

    return (
        <>
            <div className='p-5 bg-transparent'>
                <h1>Dashboard</h1>
                <p className='lead'>{moment().format('LLLL')}</p>
                <h3 className='lead text-center'>Applicant Report</h3>
                {statsValue && (

                    <StatisticsChart
                        stats={statsValue}
                        customStyles={{ width: '800px', height: '200px', margin: '0 auto' }}
                    />



                )}
            </div>
        </>
    );
}
