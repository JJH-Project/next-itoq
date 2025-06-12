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
            // tooltid
            legend: { display: true, position: 'right' },
        },
    };
    return <Pie data={pieChartData} options={options as any} />;
}
