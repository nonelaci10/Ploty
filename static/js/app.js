//Menu Drop-Down
function init() {
    var menudrop = d3.select("#selDataset");  d3.json("samples.json").then((data) => {
        console.log(data)
        data.names.forEach((name) => {
            menudrop.append("option").text(name).property("value");
        });
  
        setPlot(data.names[0]);
        metaData(data.names[0]);
    });
  }
  
  init();

// Data Grabbing
function setPlot(id) {
    d3.json("samples.json").then((data)=> {
        console.log(data)
  
        var wfreq = data.metadata.filter(m => m.wfreq === id)[0];
        console.log(wfreq);
        
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        console.log(samples);
  
        // top 10 data grab
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
        var otuTop = (samples.otu_ids.slice(0, 10)).reverse();
        
        var otuID = otuTop.map(id => "OTU " + id)
        console.log(otuID)
  
        var labels = samples.otu_labels.slice(0, 10);
  
        var trace1 = {
            x: samplevalues,
            y: otuID,
            text: labels,
            marker: {
              color: '#d2ebab'},
            type:"bar",
            orientation: "h",
        };
  
        var data = [trace1];
  
        // bar graphing and layout setting #follow layout#
        var layoutBar = {
            title: "Subject "+id+" Top 10 OTUs",
            yaxis:{tickmode:"linear"},
            height: 500,
            width: 1000,
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
  
        // plot the bar graph
        Plotly.newPlot("bar", data, layoutBar);
  
      
        // bubble plot
        var trace2 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.sample_values,
                colorscale: "Earth"
            },
            text: samples.otu_labels
  
        };
  
        // bubble plot layout
        var layoutBubble = {
            xaxis:{title: "Subject "+id+" OTU IDs"},
            height: 600,
            width: 1000
        };
  
        var data1 = [trace2];
  
        // create the bubble plot
        Plotly.newPlot("bubble", data1, layoutBubble); 