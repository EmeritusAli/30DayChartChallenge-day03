console.log('load-data.js loaded');

d3.csv('./data/FAAC_lg_data.csv', d => {

    return {
        ...d,
        state: d.STATE,
        allocation: +d.allocation.replace(/,/g, ''),
        lg: d.LGC
    };
} ).then(data => {
    console.log('data',data);
    drawBubble(data);
});