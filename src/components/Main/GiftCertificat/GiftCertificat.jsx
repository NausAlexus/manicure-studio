import "./GiftCertificat.css";
import CertificatConfig from "./../../../config/certificat-config.json";

const GiftCertificat = () => {
    const certificatConfig = CertificatConfig["certificat"];
    const termsOfUse = CertificatConfig.termsOfUse[0];
    return (
        <>
            <div className="certificat">
                <div className="certificat-title">Подарочные сертификаты</div>
                <div className="certificat-content">
                    <div className="certificat-content-left">
                        {certificatConfig.map((item) => (
                            <div
                                key={item}
                                className="certificat-content-title"
                            >
                                {item.title}
                                <div className="certificat-content-text">
                                    {item.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="certificat-content-right">
                        <div className="certificat-content-title">
                            {termsOfUse.title}
                        </div>
                        <ol className="certificat-content-text">
                            {termsOfUse.numbers.map((item, index) => (
                                <li key={index}>{item.text}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GiftCertificat;
