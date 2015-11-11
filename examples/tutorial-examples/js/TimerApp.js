var TimerApp = React.createClass({
    getInitialState: function() {
        return {
            timerEntries: [
                {id:1, name:"advent calendar1", min: 0, sec: 3},
                {id:2, name:"advent calendar2", min: 0, sec: 5},
                {id:3, name:"advent calendar3", min: 1, sec: 7}  
            ],
            currentTimer: {id:1, name:"advent calendar1", min: 0, sec: 3},
        };
    },
    loadTimer: function(timerId) {
        // look up timerEntry by id
        // the data structure should be changed
        // to allow faster lookups
        this.setState({
            currentTimer: this.state.timerEntries.filter((timerEntry) => {
                return timerEntry.id == timerId;})[0]
        });
    },
    render: function() {
        return (
            <div>
                <TimerView currentTimer={this.state.currentTimer}
                 restartTimer={this.loadTimer}/>
            </div>
        );
    }
});

var TimerView = React.createClass({
    getInitialState: function() {
        console.log("get initial state!");
        return {
            id: this.props.currentTimer.id,
            min: this.props.currentTimer.min,
            sec: this.props.currentTimer.sec,
            timerUpdater: null,
            timerWatcher: null
        };
    },
    componentDidMount: function() {
        console.log("component did mount!");
        this.runTimer();
    },
    componentWillReceiveProps: function(nextProps) {
        console.log("get new props!");
        // this should only be called once
        // timerUpdater and watcher are both cleared.
        var nextState = {
            id: nextProps.currentTimer.id,
            min: nextProps.currentTimer.min,
            sec: nextProps.currentTimer.sec,
            timerUpdater: null,
            timerWatcher: null
        }
        this.setState(nextState, this.runTimer);
    },
    runTimer: function() {
        console.log("starting timer..");
        var timerUpdater = setInterval(this.updateTimer, 1000);
        this.setState({timerUpdater: timerUpdater});
        var delay = (60 * this.state.min + this.state.sec) * 1000 + 1000
        console.log("timeOut at " + delay);
        var timerWatcher = setTimeout(this.stopTimer, delay);
        this.setState({timerWatcher: timerWatcher});
    },
    updateTimer: function() {
        console.log("Updating timer with timeUpdater " + 
                    JSON.stringify(this.state.timerUpdater));
        if (this.state.sec == 0) {
            this.setState({min: this.state.min - 1});
            this.setState({sec: 59});
        } else {
            this.setState({sec: this.state.sec - 1});
        }
    },
    pauseTimer: function() {
        this.stopTimerUpdate();
    },
    // TODO rename me?
    stopTimerUpdate: function() {
        console.log("Clearing timers...");
        clearInterval(this.state.timerUpdater);
        clearTimeout(this.state.timerWatcher);
        var changes = {
            timerUpdater: null,
            timerWatcher: null,
        };
        this.setState(changes);
    },
    stopTimer: function() {
        this.stopTimerUpdate();
        /*var changes = {
            min: 0,
            sec: 0
        };
        this.setState(changes);*/
    },
    restartTimer: function() {
        // TODO
        this.props.restartTimer(this.state.id);
    },
    toggleOnOff: function() {
        if (this.state.timerUpdater == null && 
                (this.state.min > 0 || this.state.sec > 0)) {
            this.runTimer();
        } else if (this.state.timerUpdater == null) {
            // TODO handle when timer has already finished
            //console.log("timer already finished. can't turn on");
            this.restartTimer();
        } else {
            this.pauseTimer();
        }
    },
    render: function() {
        return(
            <div>
                <span>
                    Remaining Time:
                    {this.state.min} min {this.state.sec} sec
                </span>
                <button onClick={this.toggleOnOff}>On/Off</button>
            </div>
        );
    }
});

React.render(<TimerApp />, document.getElementById('example'));
