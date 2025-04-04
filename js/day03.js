
console.log('day03.js loaded');
const drawBubble = (data) => {
              // const margin = {top: 45, right: 110, bottom: 20, left: 60};
              const width = 850;
              const height = 750;
              // const usableWidth = width - margin.left - margin.right;
              // const usableHeight = height - margin.top - margin.bottom;
              const nestedData = {
                name: "root",
                children: data.map(d => ({
                  name: d.lg,
                  state: d.state,
                  value: d.allocation
                }))
              };

              const root = d3.hierarchy(nestedData)
                .sum(d => d.value)
                .sort((a, b) => b.value - a.value);

              const pack = d3.pack()
                .size([width, height])
                .padding(5);

              pack(root);

              const svg = d3.select('#chart')
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .attr('viewBox', `0 0 ${width} ${height}`)
                ;

              const g = svg.append('g');

              svg.call(d3.zoom()
                .scaleExtent([0.5, 5])
                .on("zoom", (event) => {
                  g.attr("transform", event.transform); // zoom 
                }));


              const defs = svg.append('defs');

              const filter = defs.append('filter')
                      .attr('id', 'glow');
              
              filter.append('feGaussianBlur')
                     .attr("stdDeviation", "3")
                      .attr("result", "coloredBlur");
              
                const feMerge = filter.append('feMerge');
                feMerge.append('feMergeNode')
                      .attr("in", "coloredBlur");
                feMerge.append('feMergeNode')
                      .attr("in", "SourceGraphic");
              
              const leaves = root.leaves();

              leaves.forEach((d,i) => {
                defs.append('clipPath')
                  .attr('id', `clip-${i}`)
                  .append('circle')
                  .attr('r', d.r)
               
              });


              const node = g.selectAll('g')
                .data(leaves)
                .join('g')
                .attr('transform', d => `translate(${d.x}, ${d.y})`);

               

              
          
             

              
              node.append('circle')
                .attr('r', d => d.r)
                .attr('fill', 'rgba(15, 234, 121, 0.3)')
                .attr('stroke', 'rgba(7, 246, 123, 0.3)')
                .attr('stroke-width', 0.2)
                .attr('filter', 'url(#glow)');

              // format allocatio value in billion naira
              const formatAllocation = d3.format(",.2f");

              node.append('text')
                .attr('text-anchor', 'middle')
                .text(d => d.data.name)
                .attr('clip-path', (d, i) => `url(#clip-${i})`)
                .style("font-size", d => `${Math.min(d.r / 4, 9)}px`)



              node.append('title')
                .text(d => `Local Goverment: ${d.data.name}\n State: ${d.data.state}\n Allocation: ₦${d3.format(',')(d.data.value)}`);





           

              

            };

            





