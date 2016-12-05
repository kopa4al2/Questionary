import React,{Component} from 'react';
import '../styles/loader.css';

class Loader extends Component {

    render() {
        return (
            <div className="cs-loader">
                <div className="cs-loader-inner">
                    <label>	●</label>
                    <label>	●</label>
                    <label>	●</label>
                    <label>	●</label>
                    <label>	●</label>
                    <label>	●</label>
                </div>
            </div>
        )
    }
}

export default Loader






