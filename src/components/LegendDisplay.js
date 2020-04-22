import React from 'react';
import { VictoryLegend } from "victory";

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center"
};

const legendStyle = {
  labels: { fontSize: 18, fontFamily: "futura-pt", },
  border: { stroke: "black", strokeWidth: 0 },
  title: { padding: 0, fill: "red" }
};

const symbolSize = 5;
const symbolSpacer = 10;

class LegendDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marketLists: [] ,
      comparisonVisible: props.comparisonVisible,
      viewBox: "0 0 250 30"
    };
  }
  componentDidUpdate(prevProps) {
    if(prevProps.marketnames !== this.props.marketnames) {
      let svgWidth = document.getElementById("vacancySvg").getBBox().width;
      if (svgWidth && svgWidth > 0)
      {
        const tmp = `0 0 ${svgWidth} 30`;
        this.setState({viewBox: tmp});
      }
    }
  }

  getData() {
    const { marketnames } = this.props;
    const colors = ["#006A4D", "#69BE28"];

    return marketnames.map((name, idx) => ({
      name,
      symbol: {
        size: symbolSize,
        type: "circle",
        fill: colors[idx]
      }
    }));
  }

  render() {  
    const data = this.getData();
  return (
    <div className="demo" style={containerStyle}>
      <div>
        <svg viewBox={this.state.viewBox} height="30px" id="vacancySvg">
          <VictoryLegend
          orientation="horizontal"
          gutter={0}
          symbolSpacer={symbolSpacer}
          data={data}
          style={legendStyle}
          standalone={false}
          x={0}
          />
        </svg>
      </div>
    </div>
  );
}
}
export default LegendDisplay
