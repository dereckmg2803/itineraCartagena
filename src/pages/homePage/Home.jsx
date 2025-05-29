import { useNavigate } from 'react-router-dom';
import { cartagenaImage } from '../../assets';
import { ArrowRight } from 'lucide-react';
import AboutUs from './components/aboutUs';
import ContactUs from './components/contactUs';

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <section className="py-12 lg:py-24 bg-gradient-to-b from-amber-50 to-white">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <div className="grid gap-6 lg:gap-12 md:grid-cols-2 items-center">
                        <div className="space-y-6">
                            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl text-amber-500">
                                Descubre Cartagena como nunca antes
                            </h1>
                            <p className="text-gray-600 md:text-xl">
                                Explora, reserva y vive experiencias inolvidables en la ciudad amurallada. Desde recorridos históricos hasta deportes acuáticos, todo en un solo lugar.
                            </p>
                            <button
                                className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition"
                                onClick={() => navigate('/login')}
                            >
                                Explorar servicios
                                <ArrowRight className="ml-2" />
                            </button>
                        </div>
                        <div className="relative w-full max-w-md mx-auto">
                            <img
                                src={cartagenaImage}
                                alt="Cartagena Tours"
                                className="w-full h-auto object-contain rounded-xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <AboutUs />
            <ContactUs />
        </div>
    );
}

export default Home;
