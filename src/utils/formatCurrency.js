export default function formatCurrency(value) {
    return value.toLocaleString("en-CA", {
        style: "currency",
        currency: "CAD",
        maximumFractionDigits: 0,
    });
}