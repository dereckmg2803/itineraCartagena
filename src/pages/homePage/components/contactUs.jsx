import React from 'react';

function ContactUs() {
    return (
        <section className="py-16 bg-amber-50 border-t border-gray-200">
            <div className="max-w-4xl mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-bold text-amber-600 text-center mb-6">Contáctanos</h2>
                <p className="text-gray-700 text-center mb-10">
                    ¿Tienes dudas, sugerencias o quieres colaborar con nosotros? ¡Estamos felices de escucharte!
                </p>

                <form className="grid gap-6 md:grid-cols-2 bg-white p-6 rounded-lg shadow-md">
                    <div className="flex flex-col">
                        <label className="text-gray-700 mb-2">Nombre</label>
                        <input
                            type="text"
                            placeholder="Tu nombre"
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 mb-2">Correo electrónico</label>
                        <input
                            type="email"
                            placeholder="tucorreo@ejemplo.com"
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>
                    <div className="md:col-span-2 flex flex-col">
                        <label className="text-gray-700 mb-2">Mensaje</label>
                        <textarea
                            rows="4"
                            placeholder="Escribe tu mensaje aquí..."
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>
                    <div className="md:col-span-2 text-center">
                        <button
                            type="submit"
                            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-md transition"
                        >
                            Enviar mensaje
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default ContactUs;
