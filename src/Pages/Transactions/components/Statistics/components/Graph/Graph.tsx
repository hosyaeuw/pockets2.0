import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { colors } from '../../../../../../utils/graph';
import RandomHelper from '../../../../../../utils/randomHelper';

ChartJS.register(ArcElement, Tooltip, Legend);

type GraphItem = {
    label: string;
    value: number;
};

const countValues = 3;

const graphColors = RandomHelper.choiceRandomCount(colors, countValues + 1);

const Graph: React.FC<{ items: GraphItem[] }> = ({ items }) => {
    const sortedItems = items.sort((a, b) => b.value - a.value);

    const labelsTotal = sortedItems.map(item => item.label);
    const valuesTotal = sortedItems.map(item => item.value);

    const resultLabel: string[] = labelsTotal.slice(0, countValues);
    const resultValues: number[] = valuesTotal.slice(0, countValues);

    if (items.length > countValues) {
        resultLabel.push('Другое');
        resultValues.push(valuesTotal.slice(3).reduce((acc, curr) => acc + curr, 0));
    }

    const data = {
        labels: resultLabel,
        datasets: [
            {
                data: resultValues,
                backgroundColor: graphColors,
                borderWidth: 0,
            },
        ],
    };

    return (
        <Pie
            data={data}
            options={{
                plugins: {
                    legend: {
                        position: 'right',
                    },
                },
            }}
        />
    );
};

export default Graph;
