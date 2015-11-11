var TimerApp = React.createClass({
    getInitialState: function() {
        // TODO refactor me!
        return {
            timerEntries: [
                {id:1, name:"advent calendar1", min: 0, sec: 3},
                {id:2, name:"advent calendar2", min: 0, sec: 5},
                {id:3, name:"advent calendar3", min: 1, sec: 7}
            ],
            id_to_timers: {
                1: {id:1, name:"advent calendar1", min: 0, sec: 3},
                2: {id:2, name:"advent calendar2", min: 0, sec: 5},
                3: {id:3, name:"advent calendar3", min: 0, sec: 7},
            },
            currentTimer: {id:1, name:"advent calendar1", min: 0, sec: 3},
        };
    },
    loadTimer: function(timerId) {
        alert("Switching to different timer!");
        var timer = this.state.id_to_timers[timerId]
        this.setState({currentTimer: timer});
    },
    render: function() {
        return (
            <div>
                <TimerView currentTimer={this.state.currentTimer} />
                <TimerList timerEntries={this.state.timerEntries} loadTimer={this.loadTimer}/>
            </div>
        );
    }
});

var TimerView = React.createClass({
    getInitialState: function() {
        return {
            min: this.props.currentTimer.min,
            sec: this.props.currentTimer.sec,
            timerUpdater: null, //setInterval object
        };
    },
    componentDidMount: function() {
        this.launchTimer();
    },

    componentWillReceiveProps: function(nextProps) {
        console.log("new props!");
        var nextState = {
            min: nextProps.currentTimer.min,
            sec: nextProps.currentTimer.sec,
            timerUpdater: null,
            timerKiller: null,
        }
        this.resetTimer(nextState);
    },
    // TODO rename me
    resetTimer: function(nextState) {
        //clearInterval(this.state.timerUpdater);
        //nextState['timerUpdater'] = null;
        var killed = true;
        this.cancelTimer(killed);
        var that = this;
        setTimeout(function toRun() {
            that.setState(nextState, that.launchTimer);
        }, 2000);
    },
    launchTimer: function() {
        this.startTimer();
        var endTime = 1000 * ((60 * this.state.min) + this.state.sec) + 1000
        this.scheduleTimerToEnd(endTime);
    },
    startTimer: function() {
        var timerUpdater = setInterval(this.updateTime, 1000);
        this.setState({timerUpdater: timerUpdater});
        //var endTime = 1000 * ((60 * this.state.min) + this.state.sec) + 1000
        //return timerUpdater
    },
    updateTime: function() {
        if (this.state.sec == 0) {
            this.setState({min: this.state.min - 1});
            this.setState({sec: 59});
        } else {
            this.setState({sec: this.state.sec -1});
        }
        //alert(this.state.min + " : " + this.state.sec);
    },
    // TODO review the following two functions
    scheduleTimerToEnd: function(endTime) {
        var killed = false;
        var timerKiller = setTimeout(
            this.cancelTimer, endTime, killed);
    },
    cancelTimer: function(killed) {
        if (!killed){
            alert("Timer is up!");
        }
        console.log("clearing timer " + this.state.timerUpdater);
        clearInterval(this.state.timerUpdater);
        clearTimeout(this.state.timerKiller);
        this.setState({timerUpdater: null, timerKiller: null});
    },
    render: function() {
        return (
            <div>
                Remaining Time:
                {this.state.min} min {this.state.sec} sec
            </div>
        );
    }
});

var TimerList = React.createClass({
    getInitialState: function() {
        // TODO may remove this
        return {
            timerEntries: this.props.timerEntries
        };
    },
    // TODO explain
    applyToCallBack: function(arg, callBack) {
        callBack(arg);
    },
    render: function() {
        var that = this;
        var timerEntries = this.state.timerEntries.map((timerEntry) => {
            return (
                <div>
                    <span> {timerEntry.name} </span>
                    <button id={timerEntry.id} onClick={that.applyToCallBack.bind(this, timerEntry.id, that.props.loadTimer)}></button>
                </div>
            );
        });
        // this.props.loadTimer.bind(this, );
        //<button id={timerEntry.id} onClick={that.loadTimer.bind(this, timerEntry.id)}> </button>
        return <div>{timerEntries}</div>;
    }
});



React.render(<TimerApp />, document.getElementById("example"));