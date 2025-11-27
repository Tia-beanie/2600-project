import Container from "react-bootstrap/Container";

export default function Footer() {
  return (
    <footer className="bg-light py-4 mt-5 border-top">
      <Container>
        <div className="text-center text-muted">
          <p className="mb-1">
            &copy; {new Date().getFullYear()} Investment Calculator. For educational purposes only.
          </p>
          <p className="mb-0 small">
            Data provided by <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer">CoinGecko API</a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
