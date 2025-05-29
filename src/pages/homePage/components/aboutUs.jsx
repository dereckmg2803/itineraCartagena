import React from 'react';

function AboutUs() {
    return (
        <section className="py-12 bg-white border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl font-bold text-amber-500 mb-4">¿Qué es Itinera Cartagena?</h2>
                <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-8">
                    Itinera Cartagena es tu guía digital para descubrir lo mejor de nuestra ciudad.
                    Desde actividades culturales hasta experiencias gastronómicas, te conectamos con
                    servicios turísticos verificados para que tu visita o aventura local sea inolvidable.
                </p>

                <div className="grid gap-6 md:grid-cols-3 mt-10 text-left">
                    <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-amber-600 mb-2">Reserva Fácil</h3>
                        <p className="text-gray-600">
                            Encuentra y reserva actividades en minutos, sin complicaciones ni intermediarios.
                        </p>
                    </div>
                    <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-amber-600 mb-2">Conexión Local</h3>
                        <p className="text-gray-600">
                            Apoyamos a guías y emprendedores locales para ofrecerte experiencias auténticas.
                        </p>
                    </div>
                    <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-amber-600 mb-2">Turismo Inteligente</h3>
                        <p className="text-gray-600">
                            Tecnología que mejora tu viaje: recomendaciones personalizadas y accesibilidad garantizada.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;
