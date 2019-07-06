import React, { Component } from "react";
import { getStatistics } from "./api";
import Operator from './components/Operator'
import {UseGlobalStyle} from './ui/UseGlobalStyle'

class PdAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      beforeShift: [],
    };

    this.setBeforeShift = this.setBeforeShift.bind(this);
    this.setStatistics = this.setStatistics.bind(this);
  }

  getTotal() {
    const total = this.state.data.map(x => parseFloat(x.bonuses));
    return total.reduce((a, b) => a + b);
  }

  setBeforeShift() {
    const totalBefore = this.state.data.map(x => parseFloat(x.bonuses));
    localStorage.setItem("beforeShift", totalBefore);
    this.setState({ beforeShift: totalBefore });
  }

  setStatistics(update = false) {
    const ourProfiles = [
      "svistunova_beb777@ukr.net",
      "katerinamalenkaya@rambler.ru",
      "anastasiyatrius@rambler.ru",
      "margaritasmelyanskaya@rambler.ru",
      "vorobetskaterina@rambler.ru",
      "boykoanastasia@rambler.ru",
      "romanovadasha7@rambler.ru",
      "vladimirivnaanna@rambler.ru",
      "oksanaotiry@rambler.ru"
    ];

    getStatistics(resData => {
      let data = resData.filter(x => ourProfiles.includes(x.operator));

      this.setState({ data: data });
    });
  }

  componentDidMount() {
    setInterval(() => this.setStatistics(true), 2000);
    return localStorage.getItem("beforeShift")
      ? this.setState({
          beforeShift: localStorage.getItem("beforeShift").split(",")
        })
      : null;
  }

  render() {
    return (
      <div>
        <UseGlobalStyle />
        <table>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Bonuses</th>
              {!!this.state.beforeShift && <th>Start shift</th>}
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((profile, idx) => (
                <Operator 
                  operator={profile.operator}
                  bonuses={profile.bonuses}
                  beforeShift={!!this.state.beforeShift ? this.state.beforeShift[idx] : 0}>
                </Operator> 
            ))}
            {!!this.state.data.length && (
              <tr>
                <td>TOTAL: {this.getTotal()}</td>
              </tr>
            )}
          </tbody>
        </table>
        <button onClick={this.setBeforeShift}>Start shift</button>
      </div>
    );
  }
}

export default PdAdmin;
