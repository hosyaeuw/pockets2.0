import { Chart } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { colors } from "../../../../utils/graph";
import RandomHelper from "../../../../utils/randomHelper";

import styles from "./GoalPlate.module.scss";

const Graph: React.FC<{ totalAmount: number; amount: number }> = ({
    totalAmount,
    amount,
}) => {
    const color = RandomHelper.choice(colors);

    const data = {
        labels: ["", ""],
        datasets: [
            {
                yAxisID: "yAxes",
                label: "# of Votes",
                data: [amount, totalAmount - amount],
                backgroundColor: [color, "#1D2023"],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        cutout: 95,
    };

    const plugins = [
        {
            id: "text",
            beforeDraw: (chart: Chart) => {
                const width = chart.width;
                const height = chart.height;
                const ctx = chart.ctx;
                ctx.restore();
                ctx.font = "3em Verdana";
                ctx.fillStyle = color;
                ctx.textBaseline = "top";
                const text = `${((amount / totalAmount) * 100).toFixed()}%`;
                const textX = Math.round(
                    (width - ctx.measureText(text).width) / 2
                );
                const fontHeight = `${ctx.font}`.replace(/[^\d.]/g, "");
                const textY = height / 2 - +fontHeight / 2;
                ctx.fillText(text, textX, textY);
                ctx.save();
            },
        },
    ];

    return (
        <Doughnut
            className={styles.graph}
            data={data}
            options={options}
            plugins={plugins}
        />
    );
};

export default Graph;
