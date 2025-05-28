import { useState } from 'react';

function DashboardPage() {
    const [services, setServices] = useState([
        {
            id: 1,
            name: 'Recorrido histórico por el Centro',
            description: 'Explora la historia de Cartagena con un guía experto.',
            price: 50000,
        },
        {
            id: 2,
            name: 'Paseo en lancha a las Islas del Rosario',
            description: 'Tour completo por las islas con snorkel incluido.',
            price: 120000,
        },
    ]);

    const handleDelete = (id) => {
        setServices(services.filter((service) => service.id !== id));
    };

    const handleAddService = () => {
        // Aquí podrías redirigir a un formulario o abrir un modal
        alert('Funcionalidad para agregar servicio próximamente...');
    };

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-sky-600 mb-6">Panel del Proveedor</h1>

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Mis Servicios</h2>
                    <button
                        onClick={handleAddService}
                        className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600"
                    >
                        + Agregar Servicio
                    </button>
                </div>

                <div className="space-y-4">
                    {services.map((service) => (
                        <div key={service.id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
                            <p className="text-sm text-gray-600">{service.description}</p>
                            <p className="text-sm font-semibold text-sky-600 mt-2">${service.price.toLocaleString()} COP</p>
                            <div className="mt-2 flex gap-2">
                                <button className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500">
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(service.id)}
                                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
