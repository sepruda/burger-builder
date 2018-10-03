import React, { Component} from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerToggleHandler = () => {
        this.setState(( prevState ) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }
    

    render() {
        return (
            <Aux>
                <Toolbar toggle={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    closed={this.sideDrawerToggleHandler }
                    open={this.state.showSideDrawer}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
            );
    }
}
export default Layout;