import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBatters } from '../../actions/batterActions';
import { getPitchers } from '../../actions/pitcherActions';
import { getTeams } from '../../actions/teamActions';
import MLBLeagueLeaders from './MLBLeagueLeaders/MLBLeagueLeaders';
import AmericanLeagueLeaders from './AmericanLeagueLeaders/AmericanLeagueLeaders';
import NationalLeagueLeaders from './NationalLeagueLeaders/NationalLeagueLeaders';
import store from '../../store';
import './IndividualStatistics.css';

class IndividualStatistics extends Component {

    constructor() {
        super();
        this.state = {
            mlbIsActive: true,
            americanLeagueIsActive: false,
            nationalLeagueIsActive: false
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

    changeLeagueStat = (property) => {
        this.setState({
            mlbIsActive: property === 'mlb',
            americanLeagueIsActive: property === 'americanLeague',
            nationalLeagueIsActive: property === 'nationalLeague'
        });
    }

    render() {
        const { mlbIsActive, americanLeagueIsActive, nationalLeagueIsActive } = this.state;
        return (
            <div className='stats-container'>
                <div className='container'>
                    <nav className='nav nav-pills flex-column flex-sm-row'>
                        <button className={`flex-sm-fill text-sm-center nav-link leagueButton ${mlbIsActive ? 'leagueButtonActive' : ''}`} type='button' onClick={() => this.changeLeagueStat('mlb')}>MLB</button>
                        <button className={`flex-sm-fill text-sm-center nav-link leagueButton ${americanLeagueIsActive ? 'leagueButtonActive' : ''}`} type='button' onClick={() => this.changeLeagueStat('americanLeague')}>American League</button>
                        <button className={`flex-sm-fill text-sm-center nav-link leagueButton ${nationalLeagueIsActive ? 'leagueButtonActive' : ''}`} type='button' onClick={() => this.changeLeagueStat('nationalLeague')}>National League</button>
                    </nav>
                </div>
                {mlbIsActive ? <MLBLeagueLeaders /> : <React.Fragment />}
                {americanLeagueIsActive ? <AmericanLeagueLeaders /> : <React.Fragment />}
                {nationalLeagueIsActive ? <NationalLeagueLeaders /> : <React.Fragment />}
            </div>
        );
    }
}

IndividualStatistics.propTypes = {
    getBatters: PropTypes.func.isRequired,
    getPitchers: PropTypes.func.isRequired,
    getTeams: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    batters: state.batters,
    pitchers: state.pitchers,
    teams: state.teams
});

export default connect(mapStateToProps, { getBatters, getPitchers, getTeams })(IndividualStatistics);