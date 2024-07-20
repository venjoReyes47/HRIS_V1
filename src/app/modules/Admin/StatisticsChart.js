import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const StatisticsChart = ({ stats, customStyles }) => {
    const approvedPositions = stats.approved.positionCount;
    const unapprovedPositions = stats.unapproved.positionCount;

    const labels = Object.keys(approvedPositions);
    const approvedData = labels.map(label => approvedPositions[label]);
    const unapprovedData = labels.map(label => unapprovedPositions[label]);

    const data = {
        labels,
        datasets: [
            {
                label: 'Approved Positions',
                data: approvedData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Unapproved Positions',
                data: unapprovedData,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
                title: {
                    display: true,
                    text: 'Count',
                },
            },
        },
    };

    return (
        <div style={customStyles}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default StatisticsChart;
