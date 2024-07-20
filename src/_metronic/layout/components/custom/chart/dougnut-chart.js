import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Pie } from 'react-chartjs-2'
import React from "react";



export default function DoughnutChart(props) {
    Chart.defaults.font.size = 14;
    Chart.defaults.font.family = 'Helvetica';
    let labelData = {
        labels: props.data.label,
        datasets: [{
            label: 'My First Dataset',
            data: props.data.data,
            backgroundColor: [
                'rgb(75, 192, 192)',
                'red'
            ],
            hoverOffset: 4,
            spanGaps: true
        }],
        options: {
            parsing: false,
            normalized: true,
            animation: false
        }
    }



    return (

        <Pie data={labelData} />
    )
} 