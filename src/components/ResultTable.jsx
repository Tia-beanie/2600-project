import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import formatCurrency from "../utils/formatCurrency";

export default function ResultTable({ rows }) {
  return (
    <Card className="p-5 shadow-sm my-4 rounded-4">
        <Card.Title>Year-by-Year Projection</Card.Title>
        
        {rows.length === 0 ? (
          <p className="text-muted">No results to display.</p>
        ) : (
          <Table hover size="sm" responsive className="text-center">
            <thead>
              <tr>
                <th>Year</th>
                <th>Start Asset</th>
                <th>End Asset</th>
                <th>Unrealised Return</th>
                <th>Living Cost</th>
                <th>Return - Cost</th>
              </tr>
            </thead>
            
            <tbody>
              {rows.map((row) => (
                  <tr key={row.year}>
                    <td>{row.year}</td>
                    <td>{formatCurrency(row.yearStartAsset)}</td>
                    <td>{formatCurrency(row.yearEndAsset)}</td>
                    <td>{formatCurrency(row.unrealisedReturn)}</td>
                    <td>{formatCurrency(row.livingCost)}</td>
                    <td className={row.returnMinusCost >= 0 ? "text-success" : "text-danger"}>
                      {formatCurrency(row.returnMinusCost)}
                    </td>
                  </tr>
              ))}
            </tbody>
          </Table>
        )}
    </Card>
  );
}