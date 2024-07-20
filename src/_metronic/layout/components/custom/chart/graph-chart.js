import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from 'react-chartjs-2'
import React from "react";



export default function GraphChart(props) {
    Chart.defaults.font.size = 14;
    Chart.defaults.font.family = 'Helvetica';
    let labelData
    if (props.data.isDataset2 === false) {
        console.log(props.data)
        labelData = {

            labels: props.data.label,

            datasets: [{
                label: props.data.labelset1,
                data: props.data.dataset1,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }

            ]

        }
    } else {
        labelData = {
            labels: props.data.label,

            datasets: [{
                label: props.data.labelset1,
                data: props.data.dataset1,
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },

            {
                label: props.data.labelset2,
                data: props.data.dataset2,
                fill: false,
                backgroundColor: 'red',
                tension: 0.1
            },

            ]
        }

    }

    return (

        <Bar data={labelData} />
    )
} 