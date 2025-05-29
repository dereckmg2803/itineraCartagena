import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, DatePicker, InputNumber, message } from 'antd';
import dayjs from 'dayjs';
import { useNavigate, } from 'react-router-dom';


function TouristDashboardPage() {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estado modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    // Datos de la reserva
    const [fechaServicio, setFechaServicio] = useState(null);
    const [personas, setPersonas] = useState(1);

    const userId = '136a888e-60ff-4587-aa71-be25b9e04609';

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:3000/servicios');
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error('Error al cargar los servicios:', error);
                message.error('Hubo un problema al cargar los servicios');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const openModal = (service) => {
        setSelectedService(service);
        setFechaServicio(null);
        setPersonas(1);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedService(null);
    };
    const handleLogout = () => {
        // Aquí puedes agregar lógica para limpiar tokens, estados, etc.
        // Por ejemplo: localStorage.clear();

        // Luego rediriges a la página principal
        navigate('/');
    };
    const handleOk = async () => {
        if (!fechaServicio) {
            message.warning('Por favor selecciona una fecha para el servicio');
            return;
        }
        if (personas < 1) {
            message.warning('Debe reservar para al menos una persona');
            return;
        }

        const fechaServicioFormatted = dayjs(fechaServicio).format('YYYY-MM-DD');
        const montoTotal = parseFloat(selectedService.precio) * personas;

        const reservaData = {
            id_usuario: userId,
            id_servicio: selectedService.id,
            fecha_servicio: fechaServicioFormatted,
            personas,
            monto_total: montoTotal,
        };

        try {
            const response = await fetch('http://localhost:3000/reservas/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservaData),
            });

            const result = await response.json();

            if (response.ok) {
                message.success('Reserva creada exitosamente 🎉');
                setIsModalOpen(false);
                setSelectedService(null);
            } else {
                message.error(result.message || 'Error al crear la reserva');
            }
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            message.error('Error al conectar con el servidor');
        }
    };

    if (loading) {
        return <div className="text-center p-10 text-sky-600">Cargando servicios...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Contenedor flex para título y botón */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-sky-600">Servicios disponibles</h1>
                <Button type="primary" danger onClick={handleLogout}>
                    Cerrar sesión
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="border rounded-lg shadow hover:shadow-md transition overflow-hidden"
                    >
                        {service.imagen_principal && (
                            <img
                                src={service.imagen_principal}
                                alt={service.titulo}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">{service.titulo}</h2>
                            <p className="text-gray-600 mt-1">{service.descripcion}</p>
                            <p className="text-sm text-gray-500 mt-1">Ubicación: {service.ubicacion}</p>
                            <p className="text-sky-600 font-bold mt-2">
                                Precio: ${parseFloat(service.precio).toLocaleString()} USD
                            </p>
                            <Button type="primary" onClick={() => openModal(service)}>
                                Reservar
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                title={selectedService ? `Reservar: ${selectedService.titulo}` : 'Reservar servicio'}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Confirmar Reserva"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Fecha del Servicio</label>
                        <DatePicker
                            style={{ width: '100%' }}
                            value={fechaServicio ? dayjs(fechaServicio) : null}
                            onChange={(date) => setFechaServicio(date)}
                            disabledDate={(current) => current && current < dayjs().startOf('day')}
                            placeholder="Selecciona fecha"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Número de Personas</label>
                        <InputNumber
                            min={1}
                            value={personas}
                            onChange={(value) => setPersonas(value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
            </Modal>
        </div>

    );
}

export default TouristDashboardPage;
