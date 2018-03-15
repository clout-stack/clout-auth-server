/**
 * Home Page
 */
import React from 'react';

import {connect} from 'react-redux';
import {setStyle, toggleInfo} from '../../actions';

import { HeaderComponent } from '../../components/header/header.component';

const PLACEHOLDER_IMAGE = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22356%22%20height%3D%22280%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20356%20280%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16187649576%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A18pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16187649576%22%3E%3Crect%20width%3D%22356%22%20height%3D%22280%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22130.7750015258789%22%20y%3D%22148.25%22%3E356x280%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

export class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    componentWillMount() {
        // this.props.onSetStyle('jumbotron');
    }

    render() {
        let projects = [
            {
                alt: 'Card image cap',
                image: PLACEHOLDER_IMAGE,
                text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
            },
            {
                alt: 'Card image cap',
                image: PLACEHOLDER_IMAGE,
                text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
            },
            {
                alt: 'Card image cap',
                image: PLACEHOLDER_IMAGE,
                text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
            }
        ];

        return (
            <div className="home-container">
                <HeaderComponent {...this.props} />
                <section className="jumbotron text-center">
                    <div className="container">
                        <h1 className="jumbotron-heading">Introducing Clout-JS</h1>
                        <p className="lead text-muted">Providing a way to build scalable application quickly and modular-ly!</p>
                        <p>
                            <a href="https://github.com/clout-stack/clout-js" className="btn btn-primary">Github</a>&nbsp;
                            <a href="http://docs.clout.tech" className="btn btn-secondary">Documentation</a>
                        </p>
                    </div>
                </section>

                <section className="album text-muted">
                    <div className="container">
                        <h3>Example Projects</h3>
                        <br />
                        <div className="row">
                            {projects.map((item) => (
                                <div className="card">
                                    <img src={item.image} alt={item.alt} />
                                    <p className="card-text">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <footer className="footer text-muted">
                    <div className="container">
                        <p className="float-right">
                            <a href="#">Back to top</a>
                        </p>
                        <p>This website is &copy; Clout Tech, but please <a href="https://github.com/clout-stack/clout-tech-web">download</a> and customize it for yourself!</p>
                    </div>
                </footer>
            </div>
        );
    }
};

const stateToProps = (state) => {
    return {
        header: state.header || {}
    };
};

const dispatchToProps = (dispatch) => {
    return {
        onSetStyle: (...args) => dispatch(setStyle(...args)),
        onToggleInfo: (...args) => dispatch(toggleInfo(...args))
    };
};

export const HomePageContainer = connect(stateToProps, dispatchToProps)(HomePage);

export default HomePageContainer;
