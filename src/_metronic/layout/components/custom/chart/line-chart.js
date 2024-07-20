import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from 'react-chartjs-2'
import React from "react";



export default function LineChart(props) {
    Chart.defaults.font.size = 14;
    Chart.defaults.font.family = 'Helvetica';

    let labelData
    if (props.data.isDataset2 === false) {

        labelData = {

            labels: props.data.label,

            datasets: [{
                label: props.data.labelset1,
                data: props.data.dataset1,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                spanGaps: true
            }

            ],
            options: {
                scales: {
                    y: {
                        max: 100,
                        min: 0
                    },
                    x: {
                        max: 100,
                        min: 0
                    }
                },

                parsing: false,
                normalized: true,
                animation: false,
                animation: {
                    duration: 0 // general animation time
                },
                hover: {
                    animationDuration: 0 // duration of animations when hovering an item
                },
                responsiveAnimationDuration: 0, // animation duration after a resize

            }

        }
    } else {
        labelData = {
            labels: props.data.label,

            datasets: [{

                label: props.data.labelset1,
                data: props.data.dataset1,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                spanGaps: true
            },

            {
                label: props.data.labelset2,
                data: props.data.dataset2,
                fill: false,
                borderColor: 'red',
                tension: 0.1,
                spanGaps: true
            },

            ],
            options: {
                scales: {
                    y: {
                        max: 100,
                        min: 0
                    },
                    x: {
                        max: 100,
                        min: 0
                    }
                },
                parsing: false,
                normalized: true,
                animation: false,
                animation: {
                    duration: 0 // general animation time
                },
                hover: {
                    animationDuration: 0 // duration of animations when hovering an item
                },
                responsiveAnimationDuration: 0, // animation duration after a resize
            }




        }

    }

    return (

        <Line data={labelData} />
    )
} 