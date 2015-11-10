var User = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        id:   React.PropTypes.number.isRequired
    },
    render() {
        return (
            <div>{this.props.id}:{this.props.name}</div>
        );
    }
});

var Users = React.createClass({
    getInitialState() {
        return {
            users: [ {id: 1, name: "foo"}, {id: 2, name: "bar"} ]
        }
    },
    render() {
        var users = this.state.users.map((user) => {
            return <User id={user.id} name={user.name} key={user.id}/>
        });
        return (
            <div>
                <p>사용자 목록</p>
                {users}
            </div>
        );
    }
});

ReactDOM.render(
    <Users/>,
    document.getElementById('container')
);