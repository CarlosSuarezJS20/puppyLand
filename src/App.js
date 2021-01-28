import Home from './Home/Home';
import FindADogSection from './FIndADogSection/FindADogSection';
import DogDetailsPage from './DogDetailsPage/DogDetailsPage';

import { Route } from 'react-router-dom';

const App = () => {
	return (
		<div>
			<Route path="/" exact component={Home} />
			<Route path="/find-dog" component={FindADogSection} />
			<Route path="/dog-details/:name" exact component={DogDetailsPage} />
		</div>
	);
};

export default App;
