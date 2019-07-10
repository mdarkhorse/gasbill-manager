import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { getInfo } from "../../actions/info";
import { connect } from "react-redux";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


export class Dashboard extends React.Component 
{
  static propTypes = {
    info: PropTypes.object.isRequired,
    getInfo: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.getInfo();
  }

  render () {
    const { info } = this.props.info;
    const { status } = this.props.info;

    if (status === "fail"){
      return (
        <h3 className="text-center" style={{ marginTop: "40vh" }}>No Data. Please contact administrator.</h3>
      );
    }

    return (
      <Fragment>
        <div className="card card-body mt-4 mb-4">
          <div className="text-center" style={{ width: "100%", margin: "auto" }}>
            <h2>Gas Bill { info.client.id }</h2>
            <h5>{ info.title }</h5>

            <div className="text-left" style={{ width: "100%", margin: "auto", paddingLeft: "100px", paddingRight: "100px" }}>
              <br />
              <span style={{ float: "left" }}>{ info.client.billTo1 }</span>
              <span style={{ float: "right" }}>Invoice: { info.invoice }</span><br />
              <span style={{ float: "left" }}>{ info.client.billTo2 }</span><br />
              <span style={{ float: "left" }}>{ info.client.billTo3 }</span><br />
              <span style={{ float: "left" }}>{ info.client.billTo4 }</span><br />
              
              <br />
              <table style={{ width: "60%" }}>
                <tbody>
                  <tr>
                    <td>Phone: </td>
                    <td>{ info.client.phone }</td>
                  </tr>
                  <tr>
                    <td>Fax: </td>
                    <td>{ info.client.fax }</td>
                  </tr>
                  <tr>
                    <td>Email: </td>
                    <td>{ info.client.email }</td>
                  </tr>
                </tbody>
              </table>

              <br />
              <table 
                style={{ width: "60%", float: "left" }}
                className="table-bordered"
                >
                <tbody>
                  <tr>
                    <td>Prior Month Reading: </td>
                    <td>{ info.gas.prev }</td>
                  </tr>
                  <tr>
                    <td>Current Month Reading: </td>
                    <td>{ info.gas.current }</td>
                  </tr>
                  <tr>
                    <td>Current Therms: </td>
                    <td>{ info.gas.therms }</td>
                  </tr>
                  <tr>
                    <td>Rate: </td>
                    <td>{ info.gas.rate }</td>
                  </tr>
                  <tr>
                    <td>Amount Due: </td>
                    <td>{ info.gas.amount }</td>
                  </tr>
                </tbody>
              </table>

              <span style={{ float: "right" }}>Date Due: { info.dateDue }</span><br />

              <div style={{ clear: "both" }}></div>

              <br />
              <span >Payable to: { info.payableTo }</span><br />

              <br />
              <span>{ info.notice } </span>

              <br />
              <br />

            </div>

            <div className="text-center">
              <h4>Gas Cost { info.client.id }</h4>
              <ResponsiveContainer width='100%' minHeight={200} >
                <BarChart
                  /*width={800}
                  height={300}*/
                  data={info.gasCost}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
      </Fragment>
    );
  }
}


const mapStateToProps = state => {
  console.log(state);
  return ({
    info: state.info
  });
};

export default connect(
  mapStateToProps,
  { getInfo }
)(Dashboard);
