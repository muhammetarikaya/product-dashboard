import * as React from "react";
import PrimaryLayout from "../../components/Layout/PrimaryLayout";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {UserOutlined} from "@ant-design/icons";
import ProfileForm from "../../forms/profile/profile.form";
import {fetchProfile, saveProfile} from "../../api/profile.api";
import {message} from "antd";
import history from "../../history";


class ProfilePage extends React.Component {

    state = {
        profile: null
    }

    componentDidMount() {
        this.props.fetchProfile().then((data) => {
            this.setState({
                profile: data.data
            })
        }).catch((data) => {

        })
    }


    onFinished = values => {
        this.props.saveProfile(values).then(data => {
            message.success("Profile has been saved successfully");
            history.push("/profile");
        }).catch(error => {
            console.log(error)
        })
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    render() {
        return (
            <PrimaryLayout pageIcon={<UserOutlined style={{fontSize: '36px', color: '#08c'}}/>} pageName={"Profile"}
                           loading={this.props.loading}>
                {this.state.profile &&

                <ProfileForm onFinishFailed={this.onFinishFailed} onFinished={this.onFinished}
                             data={this.state.profile}/>
                }
            </PrimaryLayout>
        );
    }
}


function mapStateToProps(state) {
    return {
        auth: state.auth.isLoggedIn,
        loading: state.data.loading
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchProfile: fetchProfile,
        saveProfile: saveProfile,
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)