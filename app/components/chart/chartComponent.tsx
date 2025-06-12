'use client';

import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { FORM_TITLE } from '@/app/utils/enums';

interface ChartComponentProps {
    labels: string[];
    values: number[];
}

export default function ChartComponent({ labels, values }: ChartComponentProps) {
    const colors = ['#ff0029', '#377eb8', '#66a61e', '#984ea3'];
    // console.log(values);
    const pieChartData = {
        labels: labels,
        datasets: [
            {
                data: values,
                backgroundColor: colors,
                hoverBackgroundColor: colors,
                datalabels: {
                    formatter: (value: any) => value + '%',
                    display: 'auto',
                },
            },
        ],
    };
    const options = {
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context: any) => {
                        const label = context.label;
                        const value = context.dataset.data[context.dataIndex];
                        return `${label} : ${value}%`;
                    },
                },
            },
            legend: { display: true, position: 'right' },
            datalabels: {
                formatter: (value: any, context: any) => {
                    const label = pieChartData.labels[context.dataIndex];
                    return `${label} : ${value}%`;
                },
                display: 'auto',
            },
        },
    };
    return <Pie data={pieChartData} options={options} />;
}
