import Container from "react-bootstrap/Container";

export default function About() {
  return (
    <Container className="py-5">
      <h1 className="mb-4">About The Calculator</h1>
      <p className="lead">
        This calculator helps you compare two investment strategies
        and see how your money can meaningfully impact your future living costs.
      </p>

      <h3 className="mt-5">Conventional Strategy</h3>
      <p>
        Traditional investment approach using broad market indices like S&P 500
        or NASDAQ, typically offering steady, predictable returns with lower
        volatility.
      </p>

      <h3 className="mt-4">Radical Strategy</h3>
      <p>
        Bitcoin-based investment strategy with potentially higher returns but
        significantly greater volatility. The app fetches live Bitcoin prices
        from CoinGecko to provide real-time scenario analysis.
      </p>

      <h3 className="mt-5">Calculation Formulas</h3>
      <div className="bg-light p-4 rounded">
        <p className="mb-3">
          <strong>Year-Start Asset:</strong> Previous year's year-end asset (or
          initial principal for year 1)
        </p>
        <p className="mb-3">
          <strong>Year-End Asset:</strong> Year-Start Asset × (1 + Annual Return
          / 100)
        </p>
        <p className="mb-3">
          <strong>Unrealised Return:</strong> Year-End Asset - Year-Start Asset
        </p>
        <p className="mb-3">
          <strong>Living Cost:</strong> Base Living Cost × (1 + Inflation /
          100)^(year - 1)
        </p>
      </div>

      <div className="alert alert-warning mt-5" role="alert">
        <p>This tool is for educational purposes only. Calculations do not account
        for taxes, trading fees, market volatility.</p>
        <strong>Not financial advice.</strong>
      </div>
    </Container>
  );
}
