import React, { Component } from "react";
import {OperatorRow} from '../ui/atoms/'
import Slider from "react-rangeslider";


export default class Operator extends Component {
	constructor(props) {
		super(props)

		this.state = {
			currentBonuses: 0,
			color: 'none',
			status: '',
			balanceNorm: 0
		}

		this.checkBalance = this.checkBalance.bind(this)
		this.onChangeRange = this.onChangeRange.bind(this)
	}

	onChangeRange(value) {
		return this.setState({balanceNorm: value})
 	}

	checkBalance() {
		const balance = this.props.bonuses - this.state.currentBonuses
		const normLess = this.state.balanceNorm * 0.9
		const normMore = this.state.balanceNorm * 1.1
		let color = ''
		let status = ''


			if (balance === 0){
				color = 'white'
				status = ''
			} else if(normLess < balance < normMore) {				
				color = 'rgb(255,149,0)';
				status = 'НАМАНА'
			} else if(balance > this.state.balanceNorm) {
				color = 'rgb(52,199,89)';
				status = 'КРАСАВА'				
			} else if(balance < this.state.balanceNorm) {
				color = 'rgb(255,59,48)';
				status = 'ПИЗДЮЛЕЙ'
			}

			console.log(balance)

		return this.setState({color: color, currentBonuses: this.props.bonuses, status: status})
	}

	componentDidMount() {
		this.setState({currentBonuses: this.props.bonuses})
    	setInterval(this.checkBalance, 1800000);
	}

	render() {
		const balanceNorm = this.state.balanceNorm
		return(
			<OperatorRow key={this.props.operator} color={this.state.color}>
                <td>{this.props.operator}</td>
                <td>{this.props.bonuses}</td>
                <td>{this.props.beforeShift}</td>
                <td style={{width: '100px'}}>
                	<Slider
                      min={0}
                      max={25}
                      step={0.5}
                      value={balanceNorm}
                      tooltip={true}
                      onChange={this.onChangeRange}
                    />
                    <span>{balanceNorm}</span>
                </td>
                <td>{!!this.state.status ? this.state.status : ''}</td>
            </OperatorRow>
        )
	}
}