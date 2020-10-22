import React, { Component } from 'react';
import store from '../../../store';
import './AmericanLeagueLeaders.css';

class AmericanLeagueLeaders extends Component {

    leadersTable = (headerName, headerStat, stat) => {
        const teams = store.getState().teams.filter((team) => team.league === 'American League').map((team) => team.name);
        const data = stat === 'ba' || stat === 'obp' ? store.getState().batters.sort((a, b) => b[stat] - a[stat]).filter((player) => teams.includes(player.team) && parseFloat(player.pa, 10) > 190).slice(0, 10) : store.getState().batters.sort((a, b) => b[stat] - a[stat]).filter((player) => teams.includes(player.team)).slice(0, 10);
        const table = (
            <table className='table table-bordered americanLeagueLeadersTable'>
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
                {this.leadersTable('AL Home Run Leaders', 'HR', 'hr')}
                {this.leadersTable('AL Hits Leaders', 'H', 'h')}
                {this.leadersTable('AL RBI Leaders', 'RBI', 'rbi')}
                {this.leadersTable('AL Batting Average Leaders', 'BA', 'ba')}
                {this.leadersTable('AL Doubles Leaders', '2B', 'doubles')}
                {this.leadersTable('AL Triples Leaders', '3B', 'triples')}
                {this.leadersTable('AL Stolen Bases Leaders', 'SB', 'sb')}
                {this.leadersTable('AL On Base Percentage Leaders', 'OBP', 'obp')}
            </div>
        );
    }
}

export default AmericanLeagueLeaders;