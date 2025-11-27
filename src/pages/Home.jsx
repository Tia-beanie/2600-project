import { useState, useEffect, useRef } from "react";
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
  const [years, setYears] = useState(15);
  const [principal, setPrincipal] = useState(50000);
  const [annualReturn, setAnnualReturn] = useState(10);
  const [baseLivingCost, setBaseLivingCost] = useState(20000);
  const [inflation, setInflation] = useState(3);

  const [mode, setMode] = useState("conventional");
  const [btcAmount, setBtcAmount] = useState("");
  const [btcPrice, setBtcPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastEdited, setLastEdited] = useState("principal");
  
  const isFirstRender = useRef(true);  // Changing it doesn not cause re-render (for non-UI data)
                                       // Returns { current: value }

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

  // Load saved state on mount
  useEffect(() => {
    const saved = localStorage.getItem("appState");
    if (saved) {
      try {
        const { mode: savedMode, principal: savedPrincipal } = JSON.parse(saved);
        setMode(savedMode);
        setPrincipal(savedPrincipal);
      } catch (error) {
        console.log("Failed to load state");
      }
    }
    isFirstRender.current = false;  //
  }, []);

  // Save state - skip first render to avoid overwriting loaded state
  useEffect(() => {
    if (isFirstRender.current) return;
    
    localStorage.setItem("appState", JSON.stringify({ mode, principal }));
  }, [mode, principal]);

  useEffect(() => {
    // Skip first render to let localStorage load first
    // if (isFirstRender.current) return;
    
    if (mode === "conventional") {
      setAnnualReturn(10);
    }

    if (mode === "radical") {
      setAnnualReturn(20);
      setLastEdited("principal"); // Reset to "principal", allows BTC amount recalculation
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

  // Recalculate btcAmount everytime when the state of [mode, price, principal, lastEdited] changes
  useEffect(() => {
    if (mode === "radical" && btcPrice && lastEdited === "principal") {
      setBtcAmount((principal / btcPrice).toFixed(6));
    }
  }, [mode, btcPrice, principal, lastEdited]);

  // Handle the onChange of btcAmount input
  function handleBtcAmountChange(btcAmt) {
    setLastEdited("btcAmount");
    setBtcAmount(btcAmt);

    // Update principal card according to new btcAmount and price
    if (btcPrice && btcAmt) {
      setPrincipal(Number(btcAmt) * btcPrice);
    }
  }

  const rows = calculateRows(inputValues);

  return (
    <Container>
      <Header />
      <Tabs activeKey={mode} onSelect={(key) => setMode(key)} className="mb-4">
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
