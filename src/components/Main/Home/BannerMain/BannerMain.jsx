import './BannerMain.css';
import MainConfig from "../../../../config/main-config.json";

function BannerMain() {

    // Данные_________________________________
    const bgUrl = MainConfig['banner-main'][0].url;
    const bannerMainData = MainConfig['banner-main'][0];

	return (
		<div className='banner-main-container' style={{ backgroundImage: `url(${bgUrl})` }}>
            <div className='banner-main-wrapper'>
                <p>{bannerMainData.text}</p>
                <h1>{bannerMainData.title}</h1>
                <button>{bannerMainData['text-btn']}</button>
            </div>
        </div>
	);
};

export default BannerMain;