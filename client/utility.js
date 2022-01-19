export const centsToDollars = (centsNum) => {
    const dollars = centsNum / 100;
    return dollars.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD' 
    });
}

export const dollarsToCents = (dollarsStr) => {
    return Math.ceil(parseFloat(dollarsStr) * 100);
}