import BannerMain from './BannerMain/BannerMain';
import SliderMain from './SliderMain/SliderMain';
import ReviewsMain from './ReviewsMain/ReviewsMain';

function Home(props) {
	return (
		<>
			<BannerMain visibleClick={props.visibleClick}/>
			<SliderMain/>
			<ReviewsMain/>
		</>
	);
};

export default Home;