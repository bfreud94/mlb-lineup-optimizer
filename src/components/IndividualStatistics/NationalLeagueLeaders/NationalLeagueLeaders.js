import React, { Component } from 'react';
import store from '../../../store';
import './NationalLeagueLeaders.css';

class NationalLeagueLeaders extends Component {

    leadersTable = (headerName, headerStat, stat) => {
        const teams = store.getState().teams.filter((team) => team.league === 'National League').map((team) => team.name);
        const data = stat === 'ba' || stat === 'obp' ? store.getState().batters.sort((a, b) => b[stat] - a[stat]).filter((player) => teams.includes(player.team) && parseFloat(player.pa, 10) > 190).slice(0, 10) : store.getState().batters.sort((a, b) => b[stat] - a[stat]).filter((player) => teams.includes(player.team)).slice(0, 10);
        const table = (
            <table className='table table-bordered nationalLeagueLeadersTable'>
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
                {this.leadersTable('NL Home Run Leaders', 'HR', 'hr')}
                {this.leadersTable('NL Hits Leaders', 'H', 'h')}
                {this.leadersTable('NL RBI Leaders', 'RBI', 'rbi')}
                {this.leadersTable('NL Batting Average Leaders', 'BA', 'ba')}
                {this.leadersTable('NL Doubles Leaders', '2B', 'doubles')}
                {this.leadersTable('NL Triples Leaders', '3B', 'triples')}
                {this.leadersTable('NL Stolen Bases Leaders', 'SB', 'sb')}
                {this.leadersTable('NL On Base Percentage Leaders', 'OBP', 'obp')}
            </div>
        );
    }
}

export default NationalLeagueLeaders;