import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBatters } from '../../actions/batterActions';
import { getPitchers } from '../../actions/pitcherActions';
import { getTeams } from '../../actions/teamActions';
import store from '../../store';
import './Home.css';

export class Home extends Component {

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

    render() {
        return (
            <React.Fragment>
                <div id='area-one'>
                    <div id='area-one-carousel' className='carousel carousel slide' data-ride='carousel'>
                        <ol className='carousel-indicators'>
                            <li data-target='#area-one-carousel' data-slide-to='0' className='active' />
                            <li data-target='#area-one-carousel' data-slide-to='1' />
                            <li data-target='#area-one-carousel' data-slide-to='2' />
                        </ol>
                        <div className='carousel-inner'>
                            <div className='carousel-item active'>
                                <h1 className='slideOneHeader'>Use our research platform to help you win fantasy baseball!</h1>
                                <img className='d-block slideImage' src={`${process.env.PUBLIC_URL}/resources/img/baseball.jpg`} alt='First slide' />
                            </div>
                            <div className='carousel-item'>
                                <img className='d-block slideImage' src={`${process.env.PUBLIC_URL}/resources/img/bellinger.jpg`} alt='Second slide' />
                            </div>
                            <div className='carousel-item'>
                                <img className='d-block slideImage' src={`${process.env.PUBLIC_URL}/resources/img/yankees.jpg`} alt='Third slide' />
                            </div>
                        </div>
                        <a className='carousel-control-prev' href='#area-one-carousel' role='button' data-slide='prev'>
                            <span className='carousel-control-prev-icon' aria-hidden='true' />
                            <span className='sr-only'>Previous</span>
                        </a>
                        <a className='carousel-control-next' href='#area-one-carousel' role='button' data-slide='next'>
                            <span className='carousel-control-next-icon' aria-hidden='true' />
                            <span className='sr-only'>Next</span>
                        </a>
                    </div>
                </div>
                <div id='area-two'>
                    <div className='area-two-text-wrapper'>
                        <h3>Use our research platform to analyze data!</h3>
                        <h4 className='area-two-sub-text'>We promise it will be a home run!</h4>
                        <img className='area-two-home-run' src={`${process.env.PUBLIC_URL}/resources/img/homerun.jpg`} alt='Home Run' />
                    </div>
                    <img className='d-block researchImage' src={`${process.env.PUBLIC_URL}/resources/img/research.png`} alt='Research' />
                </div>
                <div id='area-three' />
            </React.Fragment>
        );
    }
}

Home.propTypes = {
    getBatters: PropTypes.func.isRequired,
    getPitchers: PropTypes.func.isRequired,
    getTeams: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    batters: state.batters,
    pitchers: state.pitchers,
    teams: state.teams
});

export default connect(mapStateToProps, { getBatters, getPitchers, getTeams })(Home);