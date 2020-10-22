import React, { Component } from 'react';
import store from '../../../store';
import './MLBLeagueLeaders.css';

class MLBLeagueLeaders extends Component {

    leadersTable = (headerName, headerStat, stat) => {
        const data = stat === 'ba' || stat === 'obp' ? store.getState().batters.sort((a, b) => b[stat] - a[stat]).filter((player) => parseFloat(player.pa, 10) > 190).slice(0, 10) : store.getState().batters.sort((a, b) => b[stat] - a[stat]).slice(0, 10);
        const table = (
            <table className='table table-bordered mlbLeagueLeadersTable'>
                <thead className='colhead'>
                    <tr className='colhead'>
                        <td className='columnHeader' colSpan='1'>{headerName}</td>
                        <td className='columnHeader'>{headerStat}</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((player, index) => (
                        <tr key={player.name}>
                            <td>
                                {index + 1}
                                .
                                {player.name}
                            </td>
                            <td>{player[stat]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
        return table;
    }

    render() {
        return (
            <div>
                {this.leadersTable('MLB Home Run Leaders', 'HR', 'hr')}
                {this.leadersTable('MLB Hits Leaders', 'H', 'h')}
                {this.leadersTable('MLB RBI Leaders', 'RBI', 'rbi')}
                {this.leadersTable('MLB Batting Average Leaders', 'BA', 'ba')}
                {this.leadersTable('MLB Doubles Leaders', '2B', 'doubles')}
                {this.leadersTable('MLB Triples Leaders', '3B', 'triples')}
                {this.leadersTable('MLB Stolen Bases Leaders', 'SB', 'sb')}
                {this.leadersTable('MLB On Base Percentage Leaders', 'OBP', 'obp')}
            </div>
        );
    }
}

export default MLBLeagueLeaders;