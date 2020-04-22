import React from 'react';
import PropTypes from "prop-types";
import { Curve , Point} from "victory";

export default class PointedLine extends React.Component {
    static propTypes = {
      index: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };
  
    renderLine(props) {
      return <Curve {...props} />;
    }
  
    renderPoints(props) {
      const { index, data, scale, dotcolor } = props;
      return data.map((datum, pointIndex) => {
        const { _x, _y } = datum;
  
        const position = {
          x: scale.x(_x),
          y: scale.y(_y)
        };
        const style = {
          fill: dotcolor,
        };
        return (
          <Point
            symbol="circle"
            size={4}
            style={style}
            key={`line-${index}-point-${pointIndex}`}
            index={parseFloat(`${index}.${pointIndex}`)}
            datum={datum}
            {...position}
          />
        );
      });
    }
  
    render() {
      const { index } = this.props;
  
      return (
        <g key={`line-point-group-${index}`}>
          {this.renderLine(this.props)}
          {this.renderPoints(this.props)}
        </g>
      );
    }
  }