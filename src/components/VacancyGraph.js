import React, { Component } from 'react';
import { VictoryLine, VictoryChart, VictoryVoronoiContainer, VictoryAxis,VictoryTooltip } from "victory";
import LegendDisplay from './LegendDisplay';
import PointedLine from './PointedLine';

class VacancyGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        stroke: "blue",
        strokeWidth: 2},
      allVacancy: [],
      isRightPanelVisible: false,
      marketselected: ['Boston'],
    };
  }

  componentDidMount() {
    this.updateAllVacancy();
  }
  componentDidUpdate(prevProps) {
  }
  componentWillUnmount() {
  }

  updateAllVacancy() {

    const primaryMarketVacancy = this.props.marketdata.map((i) => ({
      x: (i.x).replace(' ', '\n'),
      y: parseFloat(i.y),
      label: parseFloat(i.y).toFixed(2)
      }));
    this.setState({
      allVacancy: primaryMarketVacancy
    });
  }

  getYValues() {

    const primaryMarketVacancy = this.props.marketdata.map((i) => ({
      x: (i.x).replace(' ', '\n'),
      y: parseFloat(i.y).toFixed(1),
      label: parseFloat(i.y).toFixed(2)
      }));

    const comparisonData = this.getComparisonData();
    const marketA = primaryMarketVacancy.map(i => i.y);
    const marketB = this.state.isRightPanelVisible ? comparisonData.map(i => i.y) : [];
    const data = Array.from(new Set([...marketA, ...marketB])).sort((a, b) => a-b);
    return data;
  }

  getComparisonData() {
    const data = this.props.marketdata;

    const result = data ? data.map(i => ({
      x: (i.x).replace(' ', '\n'),
      y: parseFloat(i.y),
      label: parseFloat(i.y).toFixed(2)
    })) : [];
    return result;
  }
  getMarketsDisplay () {
    if (this.state.isRightPanelVisible) 
    {
      return [this.props.marketselected, this.props.comparemarketselected]
    }
    else 
    return [this.state.marketselected];
  }
  getMaxYValue () {
    const primaryMarketVacancy = this.props.marketdata.map((i) => ({
      x: (i.x).replace(' ', '\n'),
      y: parseFloat(i.y),
      label: parseFloat(i.y).toFixed(2)
      }));
    
    const comparisonData = this.getComparisonData();
    const marketA = primaryMarketVacancy.map(i => i.y);
    const marketB = this.state.isRightPanelVisible ? comparisonData.map(i => i.y) : [];
    const data = Array.from(new Set([...marketA, ...marketB])).sort((a, b) => a-b);
    const maxYValue = Math.round(Math.max(...data));
    const minYValue = Math.floor(Math.min(...data));

    if(maxYValue){
      const maxDomain = (Math.floor(maxYValue/2) + 1) * 2;
      const minDomain = (Math.round(minYValue/2) - 1) * 2;
      return {maxDomain, minDomain};
    }
  }
  render() {
    const { allVacancy } = this.state;
    const width = this.props.graphwidth;
//    const { marketdata } = this.props;
    const ie = window.navigator.userAgent.indexOf('Trident') !== -1;
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "1%",
      width: "600px"
    };
    const containerClass = ie ? {...containerStyle, ...{display: "block"}} : containerStyle;
    const Domain = this.getMaxYValue();
    const paddingLeft = this.state.isRightPanelVisible ? 70 : 50;
    const ieGraphHeight = this.state.isRightPanelVisible ? {height: "431px"} : {height: "515px"};
    
    return (
      <div style={containerClass} id="vacancyGraph">    
        <span className="vacancy-graph" style= { ie ? {marginLeft: "40%"} : {} }>Vacancy Rate</span>
        <VictoryChart
        domainPadding={40}
          containerComponent={
            <VictoryVoronoiContainer 
            label={d => `${d.label}`} 
            />
          }
          style={ ie ? {parent : ieGraphHeight}:{}}
          height={350}
          width={480}
          minDomain={{ y: Domain.minDomain }}
          maxDomain={{ y: Domain.maxDomain }}
          padding= {{ top: 50, bottom: 50, left: paddingLeft, right: 49 }}
          scale={{
            x: "time"
          }}
        >
           {/* X Axis */}
          <VictoryAxis
            // tickValues={allVacancy}
            style={{
              axis: {stroke: "none"},
              ticks:{padding:5},
              axisLabel: {fontSize: 14, padding: 30,fontFamily: "futura-pt"},
              tickLabels: {fontSize: 14, padding: 1, fontFamily: "futura-pt", fill: '#818A8F' }
            }}
          />

            {/* Y axis */}
           <VictoryAxis
            dependentAxis
            // tickValues={yValues}
            tickFormat={y => `${y}%`}
            style={{
              axis: {stroke: "none"},
              axisLabel: {fontSize: 14, padding: 15, fontFamily: "futura-pt"},
              grid: {stroke: ({ tick }) => tick > 0.5 ? "#DFDFE6" : "#DFDFE6", strokeWidth: 3},
              ticks: {stroke: "#DFDFE6", size: 1, padding:5},
              tickLabels: {fontSize: 14, padding: 5, fontFamily: "futura-pt", fill: '#818A8F'}
            }}
          />
          <VictoryLine
              labelComponent={<VictoryTooltip />}
              // animate={{ duration: 500 }}
              dataComponent={<PointedLine dotcolor={'#006A4D'} />}
              data ={allVacancy}
              style={{
                data: {
                  stroke: "#006A4D",  strokeWidth: 3 
                }}}
            />   
          
        </VictoryChart>
        <LegendDisplay comparisonVisible={this.state.isRightPanelVisible} marketnames={this.state.marketselected} />

      <div>

        
       
      </div>
      </div>
    );
  }
}

export default (VacancyGraph);
