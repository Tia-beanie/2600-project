export default function calculateRows(inputValues) {
    const { years, principal, annualReturn, baseLivingCost, inflation } = inputValues;

    const annualReturnRate = annualReturn / 100;
    const inflationRate = inflation / 100;
    const rows = [];
    let yearStartAsset = principal;

    for (let year = 1; year <= years; year++) {
        const yearEndAsset = Math.floor(yearStartAsset * (1 + annualReturnRate));
        const unrealisedReturn = yearEndAsset - yearStartAsset;
        const livingCost = Math.floor(baseLivingCost * Math.pow(1 + inflationRate, year - 1));
        const returnMinusCost = unrealisedReturn - livingCost;

        rows.push({
            year,
            yearStartAsset,
            yearEndAsset,
            unrealisedReturn,
            livingCost,
            returnMinusCost,
        });
        yearStartAsset = yearEndAsset;
    }

    return rows;
}