import { useState, useEffect } from "react";
import Header from "../components/Header";
import InputsPanelTop from "../components/InputsPanelTop";
import InputsPanelMiddle from "../components/InputsPanelMiddle";
import InputsPanelBottom from "../components/InputsPanelBottom";
import ResultGraph from "../components/ResultGraph";
import ResultTable from "../components/ResultTable";
import calculateRows from "../utils/calculateRows";

import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

export default function Home() {
  const [years, setYears] = useState(20);
  const [principal, setPrincipal] = useState(50000);
  const [annualReturn, setAnnualReturn] = useState(10);
  const [baseLivingCost, setBaseLivingCost] = useState(20000);
  const [inflation, setInflation] = useState(3);

  const [mode, setMode] = useState("conventional");
  const [btcAmount, setBtcAmount] = useState("");
  const [btcPrice, setBtcPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastEdited, setLastEdited] = useState("principal");

  const inputValues = {
    years,
    principal,
    annualReturn,
    baseLivingCost,
    inflation,
    btcAmount,
    btcPrice,
    isLoading,
  };

  const inputSetters = {
    setYears,
    setPrincipal,
    setAnnualReturn,
    setBaseLivingCost,
    setInflation,
  };

  useEffect(() => {
    if (mode === "radical") {
      setAnnualReturn(20);
      setIsLoading(true);

      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=cad"
      )
        .then((response) => response.json())
        .then((data) => {
          setBtcPrice(data.bitcoin.cad);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("BTC price is not available.");
          setBtcPrice(null);
          setIsLoading(false);
        });
    }
  }, [mode]);

  useEffect(() => {
    if (mode === "radical" && btcPrice && lastEdited === "principal") {
      setBtcAmount((principal / btcPrice).toFixed(6));
    }
  }, [mode, btcPrice, principal, lastEdited]);

  function handleBtcAmountChange(btcAmt) {
    setLastEdited("btcAmount");
    setBtcAmount(btcAmt);
    if (btcPrice && btcAmt) {
      setPrincipal(Number(btcAmt) * btcPrice);
    }
  }

  const rows = calculateRows(inputValues);

  return (
    <Container>
      <Header />
      <Tabs
        activeKey={mode}
        onSelect={(key) => setMode(key)}
        className="mb-4"
      >
        <Tab eventKey="conventional" title="Conventional Strategy">
          <InputsPanelTop values={inputValues} setters={inputSetters} />
          <InputsPanelMiddle
            mode={mode}
            values={inputValues}
            setters={inputSetters}
          />
          <InputsPanelBottom values={inputValues} setters={inputSetters} />
        </Tab>

        <Tab eventKey="radical" title="Radical Strategy">
          <InputsPanelTop values={inputValues} setters={inputSetters} />
          <InputsPanelMiddle
            mode={mode}
            values={inputValues}
            setters={inputSetters}
            onBtcAmountChange={handleBtcAmountChange}
          />
          <InputsPanelBottom values={inputValues} setters={inputSetters} />
        </Tab>
      </Tabs>

      <ResultGraph rows={rows} />
      <ResultTable rows={rows} />
    </Container>
  );
}
