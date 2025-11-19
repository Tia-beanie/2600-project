import Card from "react-bootstrap/Card"

export default function InputsPanel() {
    return (
        <Card className="p-3">
            <Card.Title>Conventional Strategy</Card.Title>
            <div>
                <div>
                    <label>Years of Expectation</label>
                    <input type="number" />
                </div>
                <div>
                    <label>Initial Principle (CAD)</label>
                    <input type="number" />
                </div>
                <div>
                    <label>Expected Annual Return (%)</label>
                    <input type="number" />
                </div>
                <div>
                    <label>Expected Living Cost per Year (CAD) (%)</label>
                    <input type="number" />
                </div>
                <div>
                    <label>Expected Inflation (%)</label>
                    <input type="number" />
                </div>
            </div>
        </Card>
    )
}