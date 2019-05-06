import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import UserWebsite from './UserWebsite'
import GeographicalBoard from './boards/GeographicalBoard'
import CategoricalBoard from './boards/CategoricalBoard'
import SocialBoard from './boards/SocialBoard'
import TimeBoard from './boards/TimeBoard'
import WelcomeBoard from './boards/WelcomeBoard'
import WebsiteList from './websites/WebsiteList'
import Sidebar from './Sidebar';
import { Redirect, Route, Switch } from 'react-router-dom'


class PersonalPage extends Component {


	render() {
		//将url中的uid导入函数
		const uid = this.props.match.params.uid;

		const { auth, profile, userWebsitesCollection } = this.props;

		//当userWebsitesCollection传入state后，react自动调用render,更新websitePanel
		let userDoc;
		if (userWebsitesCollection && auth) {
			userDoc = userWebsitesCollection.find(element => {
				return element.id === auth.uid;
			});
		}
		//route guard
		if (!auth.uid) return <Redirect to='/' />

		return (
			// <div className='container'>
			// 	<div className='h1_place_holder'>
			// 	</div>
			// 	<div className='row'>
			// 		<h1 className=''>user name.</h1>
			// 	</div>
			// 	<div className='row justify-contents-center'>
			// 		<div className='col-2'>
			// 			<PersonalProfile profile={profile} />
			// 		</div>
			// 		<div className='col-6 offset-1'>
			// 			{websitePanel}
			// 		</div>
			// 		<div className='col-2  offset-1'>
			// 			<FriendPanel profile={profile} />
			// 		</div>
			// 	</div>
			// </div>

			<div className="container">
				<div className='h1_place_holder'>
				</div>
				<div className="row">
					<div className="col-2">
						<Sidebar uid={uid} />
					</div>
					<div className="col-10">
						<Switch>
							<Route exact path={'/personalPage/' + uid} component={WelcomeBoard} />
							<Route
								path={'/personalPage/' + uid + '/where'}
								render={(routeProps) => (
									<GeographicalBoard {...routeProps} auth={auth} userDoc={userDoc ? userDoc : null} />
								)} />
							<Route path={'/personalPage/' + uid + '/what'} component={CategoricalBoard} />
							<Route path={'/personalPage/' + uid + '/when'} component={TimeBoard} />
							<Route path={'/personalPage/' + uid + '/friends'} component={SocialBoard} />
						</Switch>
						{(userDoc && userDoc.websiteList.length > 0) ? 
							<WebsiteList webList={userDoc.websiteList} />: null
						}
					</div>
				</div>



			</div>
		);
	}
}

//将登陆状态传入this.props
const mapStateToProps = (reduxState) => {

	return {
		auth: reduxState.firebase.auth,
		profile: reduxState.firebase.profile,
		userWebsitesCollection: reduxState.firestore.ordered.userWebsites
	}
}
export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'userWebsites' }
	])
)(PersonalPage)



