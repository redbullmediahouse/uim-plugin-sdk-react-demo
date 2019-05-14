import React from 'react';
import './App.css';
import {UIMNavigation} from "./components/uim/UIMNavigation";
import {UIMUserCenter} from "./components/uim/UIMUserCenter";
import {ProtectedContent} from "./components/demo/ProtectedContent";
import {PublicContent} from "./components/demo/PublicContent";

export class App extends React.Component {
    state = {
        authenticated: false,
        loading: true
    };

    componentDidMount() {
        const that = this;

        function uimInitialCallback(uimApiInstance, that) {
            const uimApi = window.uimApi;

            uimApi.EventBus.listen(uimApi.Events.LOGIN_SUCCESS, function () {
                uimApiInstance.getAuthenticatedUser().then(function (user) {
                    console.log('User', user.siloUserId, 'is logged in');
                    that.setState({authenticated: true})
                });
            });
            uimApi.EventBus.listen(uimApi.Events.INITIAL_LOGGED_OUT, function () {
                console.log('The user was logged out initially (on site load)');
                that.setState({authenticated: false})
            });
            uimApi.EventBus.listen(uimApi.Events.LOGGED_OUT, function () {
                console.log('The user has logged out actively');
                that.setState({authenticated: false})
            });
        }

        window.uimApiInstancePromise.then((apiInstance) => {
            uimInitialCallback(apiInstance, that);

            apiInstance.getAuthenticatedUser().then(() => {
                this.setState({authenticated: true, loading: false})
            }).catch(() => {
                this.setState({authenticated: false, loading: false})
            })
        })
    }

    render() {
        return (
            <div className="App">
                <UIMNavigation/>
                <UIMUserCenter/>

                <div style={{marginTop: "2vh"}}>
                    {this.state.loading ? "LOADING" : this.state.authenticated ? <ProtectedContent/> : <PublicContent/>}
                </div>
            </div>
        );
    }
}

export default App;
