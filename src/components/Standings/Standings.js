import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { getBatters } from '../../actions/batterActions';
import { getPitchers } from '../../actions/pitcherActions';
import { getTeams } from '../../actions/teamActions';
import store from '../../store';
import './Standings.css';

class Standings extends Component {

    constructor() {
        super();
        this.state = {
            standingsIsActive: true,
            advancedStatsOneIsActive: false,
            advancedStatsTwoIsActive: false,
            divisionView: true,
            leagueView: false,
            overallView: false,
            viewOptionsDropdownOpen: false
        };
    }

    componentDidMount() {
        if (store.getState().batters.length === 0) {
            this.props.getBatters();
        }
        if (store.getState().pitchers.length === 0) {
            this.props.getPitchers();
        }
        if (store.getState().teams.length === 0) {
            this.props.getTeams();
        }
    }

    setDropdownOpen = () => {
        const { viewOptionsDropdownOpen } = this.state;
        this.setState({
            viewOptionsDropdownOpen: !viewOptionsDropdownOpen
        });
    }

    changeStatPage = (property) => {
        this.setState({
            standingsIsActive: property === 'standings',
            advancedStatsOneIsActive: property === 'advancedStatsOne',
            advancedStatsTwoIsActive: property === 'advancedStatsTwo'
        });
    }

    changeLeagueView = (property) => {
        this.setState({
            divisionView: property === 'divisions',
            leagueView: property === 'leagues',
            overallView: property === 'overall'
        });
    }

    statsMap = () => (
        {
            standings: ['Team', 'Wins', 'Losses', 'Win Percentage', 'Games Behind'],
            advancedStatsOne: ['Team', 'G', 'H', '2B', '3B', 'HR', 'RBI', 'BB', 'SO', 'SB', 'BA', 'OBP', 'SLG', 'OPS'],
            advancedStatsTwo: ['Team', 'Age', 'PA', 'TB', 'IBB', 'SF', 'SH', 'CS', 'GIDP', 'HBP', 'OBP+', 'SRS']
        }
    );

    statsPropertyMap = () => (
        {
            Team: 'name',
            Wins: 'wins',
            Losses: 'losses',
            'Win Percentage': '',
            'Games Behind': 'gamesBehind',
            G: 'g',
            H: 'hBatters',
            '2B': 'doubles',
            '3B': 'triples',
            HR: 'hrBatters',
            RBI: 'rbi',
            BB: 'bbBatters',
            SO: 'soBatters',
            BA: 'ba',
            OBP: 'obp',
            SLG: 'slg',
            OPS: 'ops',
            Age: 'ageBatters',
            PA: 'pa',
            TB: 'tb',
            IBB: 'ibbBatters',
            SF: 'sf',
            SH: 'sh',
            SB: 'sb',
            CS: 'cs',
            GIDP: 'gdp',
            HBP: 'hbpBatters',
            'OBP+': 'opsPlus',
            SRS: 'srs'
        }
    )

    divisionTableHeader = () => {
        const { standingsIsActive, advancedStatsOneIsActive, advancedStatsTwoIsActive } = this.state;
        let headerKeys = [];
        if (standingsIsActive) {
            headerKeys = this.statsMap().standings;
        } else if (advancedStatsOneIsActive) {
            headerKeys = this.statsMap().advancedStatsOne;
        } else if (advancedStatsTwoIsActive) {
            headerKeys = this.statsMap().advancedStatsTwo;
        }
        return (
            <thead>
                <tr>
                    {headerKeys.map((key) => (
                        <td key={key}>{key}</td>
                    ))}
                </tr>
            </thead>
        );
    };

    divisionTable = (title, property) => {
        const { standingsIsActive, advancedStatsOneIsActive, advancedStatsTwoIsActive } = this.state;
        const teams = property === 'Overall' ? store.getState().teams : store.getState().teams.filter((team) => team[property] === title);
        let headerKeys = [];
        if (standingsIsActive) {
            headerKeys = this.statsMap().standings;
        } else if (advancedStatsOneIsActive) {
            headerKeys = this.statsMap().advancedStatsOne;
        } else if (advancedStatsTwoIsActive) {
            headerKeys = this.statsMap().advancedStatsTwo;
        }
        const propertyMap = this.statsPropertyMap();
        const tableBodyRows = teams.map((team) => (
            <tr key={team.name}>
                {headerKeys.map((key) => (
                    <td key={key}>{key === 'Win Percentage' ? this.winPercentageRow(team) : team[propertyMap[key]]}</td>
                ))}
            </tr>
        ));
        return (
            <div className='division-table'>
                <h1>{title}</h1>
                <table className='table'>
                    {this.divisionTableHeader()}
                    <tbody>
                        {tableBodyRows}
                    </tbody>
                </table>
            </div>
        );
    }

    winPercentageRow = (team) => (
        parseFloat(parseInt(team.wins, 10) / (parseInt(team.wins, 10) + parseInt(team.losses, 10))).toFixed(3)
    );

    standingsView = () => {
        const { divisionView, leagueView, overallView } = this.state;
        if (divisionView) {
            return (
                <div>
                    {this.divisionTable('American League East', 'division')}
                    {this.divisionTable('American League Central', 'division')}
                    {this.divisionTable('American League West', 'division')}
                    {this.divisionTable('National League East', 'division')}
                    {this.divisionTable('National League Central', 'division')}
                    {this.divisionTable('National League West', 'division')}
                </div>
            );
        } else if (leagueView) {
            return (
                <div>
                    {this.divisionTable('American League', 'league')}
                    {this.divisionTable('National League', 'league')}
                </div>
            );
        } else if (overallView) {
            return (
                <div>
                    {this.divisionTable('Overall', 'Overall')}
                </div>
            );
        } else {
            return <React.Fragment />;
        }
    }

    render() {
        const { standingsIsActive, advancedStatsOneIsActive, advancedStatsTwoIsActive, viewOptionsDropdownOpen } = this.state;
        return (
            <div className='standings-container'>
                <Dropdown isOpen={viewOptionsDropdownOpen} toggle={this.setDropdownOpen}>
                    <DropdownToggle caret>
                        View Options
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => this.changeLeagueView('divisions')}>Division</DropdownItem>
                        <DropdownItem onClick={() => this.changeLeagueView('leagues')}>League</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => this.changeLeagueView('overall')}>Overall</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <div className='container'>
                    <nav className='nav nav-pills flex-column flex-sm-row'>
                        <button className={`flex-sm-fill text-sm-center nav-link standingsButton ${standingsIsActive ? 'standingsButtonActive' : ''}`} type='button' onClick={() => this.changeStatPage('standings')}>Standings</button>
                        <button className={`flex-sm-fill text-sm-center nav-link standingsButton ${advancedStatsOneIsActive ? 'standingsButtonActive' : ''}`} type='button' onClick={() => this.changeStatPage('advancedStatsOne')}>Advanced Stats I</button>
                        <button className={`flex-sm-fill text-sm-center nav-link standingsButton ${advancedStatsTwoIsActive ? 'standingsButtonActive' : ''}`} type='button' onClick={() => this.changeStatPage('advancedStatsTwo')}>Advanced Stats II</button>
                    </nav>
                    {this.standingsView()}
                </div>
            </div>
        );
    }
}

Standings.propTypes = {
    getBatters: PropTypes.func.isRequired,
    getPitchers: PropTypes.func.isRequired,
    getTeams: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    batters: state.batters,
    pitchers: state.pitchers,
    teams: state.teams
});

export default connect(mapStateToProps, { getBatters, getPitchers, getTeams })(Standings);