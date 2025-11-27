===== Working Logs =====

BUGS:
1. (FIXED) When principle value changed, it becomes a string
Solution: e.target.value always returns string, so I need to convert it with Number(e.target.value)
2. (FIXED) The BTC Amount Input field isn't working properly
Solution: add [lastEdited] state, only calculates and sets the btcAmount according to the CAD principal, when lastEdited is "principal". Inside handleBtcAmountChange() => setLastEdited("btcAmount"), to prevent useEffect from overwriting the inputs.

FORMATTING: 
1. (DONE) Red/Green text of table
2. (DONE) center the values in table

VALIDATION CHECK:
1. (DONE) Return placeholder info for table and graph, when there is no data

FEATURES:
1. Increment of Annaul Return and Inlation Rate can be 0.1 instead of 1
2. (DONE) Graph: mouse over any year, the tooltip displays the datasets altogether
3. Graph: mouse over with a vertical line, to improve the visual clarity

