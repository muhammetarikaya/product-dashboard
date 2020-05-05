import * as React from "react";
import {Link} from "react-router-dom";
import PrimaryLayout from "../../components/Layout/PrimaryLayout";


class HomePage extends React.Component{
    render() {
        return(
            <PrimaryLayout>
                Home
            </PrimaryLayout>
        )
    }
}

export default HomePage;