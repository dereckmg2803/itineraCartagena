import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, LogoutOutlined } from '@ant-design/icons';
import DashboardHeader from './components/dashboardHeader';

function DashboardPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedImage, setEditedImage] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newService, setNewService] = useState({
        titulo: '',
        descripcion: '',
        imagen_principal: '',
        categoria: '',
        precio: '',
        capacidad: '',
        ubicacion: '',
        disponible: true,
    });


    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/servicios');
            const data = await response.json();
            setServices(data);
        } catch (error) {
            message.error('Error al cargar los servicios');
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (service) => {
        setEditingService(service);
        setEditedTitle(service.titulo);
        setEditedDescription(service.descripcion);
        setEditedImage(service.imagen_principal); // Nuevo
        setIsModalOpen(true);
    };


    const handleCreateService = async () => {
        const proveedor_id = '246a135f-9cac-455a-a5f0-b043a77e8fe5';

        if (!newService.titulo.trim() || !newService.descripcion.trim()) {
            message.warning('El título y la descripción son obligatorios');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/servicios/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newService, proveedor_id }),
            });

            if (response.ok) {
                message.success('Servicio creado exitosamente');
                setIsCreateModalOpen(false);
                setNewService({
                    titulo: '',
                    descripcion: '',
                    imagen_principal: '',
                    categoria: '',
                    precio: '',
                    capacidad: '',
                    ubicacion: '',
                    disponible: true,
                });
                fetchServices();
            } else {
                const errorData = await response.json();
                message.error(errorData.message || 'Error al crear el servicio');
            }
        } catch (error) {
            console.error('Error creando servicio:', error);
            message.error('Error de conexión al crear el servicio');
        }
    };


    const handleEditOk = async () => {
        if (!editedTitle.trim()) {
            message.warning('El título es obligatorio');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/servicios/${editingService.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    titulo: editedTitle,
                    descripcion: editedDescription,
                    imagen_principal: editedImage,  // Aquí se incluye la imagen editada
                }),
            });

            if (response.ok) {
                message.success('Servicio actualizado');
                setIsModalOpen(false);
                setEditingService(null);
                setEditedTitle('');
                setEditedDescription('');
                setEditedImage('');  // Limpiar el estado de la imagen también
                fetchServices();
            } else {
                const errorData = await response.json();
                message.error(errorData.message || 'Error al actualizar');
            }
        } catch (error) {
            message.error('Error al conectar con el servidor');
        }
    };


    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/servicios/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                message.success('Servicio eliminado');
                fetchServices();
            } else {
                const errorData = await response.json();
                message.error(errorData.message || 'Error al eliminar');
            }
        } catch (error) {
            message.error('Error al conectar con el servidor');
        }
    };

    const handleLogout = () => {
        window.location.href = "/login";
    };

    if (loading) {
        return <div className="text-center mt-20 text-xl text-gray-600">Cargando servicios...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">

            <DashboardHeader
                onCreateClick={() => setIsCreateModalOpen(true)}
                onLogout={handleLogout}
            />

            <Modal
                title="Crear Nuevo Servicio"
                open={isCreateModalOpen}
                onOk={handleCreateService}
                onCancel={() => setIsCreateModalOpen(false)}
                okText="Crear"
                cancelText="Cancelar"
            >
                <Input
                    className="mb-3"
                    placeholder="Título"
                    value={newService.titulo}
                    onChange={(e) => setNewService({ ...newService, titulo: e.target.value })}
                />
                <Input.TextArea
                    className="mb-3"
                    placeholder="Descripción"
                    value={newService.descripcion}
                    onChange={(e) => setNewService({ ...newService, descripcion: e.target.value })}
                    rows={3}
                />
                <Input
                    className="mb-3"
                    placeholder="Imagen principal (URL)"
                    value={newService.imagen_principal}
                    onChange={(e) => setNewService({ ...newService, imagen_principal: e.target.value })}
                />
                <Input
                    className="mb-3"
                    placeholder="Categoría"
                    value={newService.categoria}
                    onChange={(e) => setNewService({ ...newService, categoria: e.target.value })}
                />
                <Input
                    className="mb-3"
                    type="number"
                    placeholder="Precio"
                    value={newService.precio}
                    onChange={(e) => setNewService({ ...newService, precio: parseFloat(e.target.value) })}
                />
                <Input
                    className="mb-3"
                    type="number"
                    placeholder="Capacidad"
                    value={newService.capacidad}
                    onChange={(e) => setNewService({ ...newService, capacidad: parseInt(e.target.value) })}
                />
                <Input
                    className="mb-3"
                    placeholder="Ubicación"
                    value={newService.ubicacion}
                    onChange={(e) => setNewService({ ...newService, ubicacion: e.target.value })}
                />
            </Modal>


            <div className="grid gap-6 md:grid-cols-2">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="border border-gray-200 rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{service.titulo}</h2>
                            <p className="text-gray-600">{service.descripcion}</p>
                        </div>
                        <div className="mt-4 flex gap-3">
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => openEditModal(service)}
                            >
                                Editar
                            </Button>
                            <Popconfirm
                                title="¿Seguro que quieres eliminar este servicio?"
                                onConfirm={() => handleDelete(service.id)}
                                okText="Sí"
                                cancelText="No"
                            >
                                <Button type="primary" danger icon={<DeleteOutlined />}>
                                    Eliminar
                                </Button>
                            </Popconfirm>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                title="Editar Servicio"
                open={isModalOpen}
                onOk={(e) => {
                    e.preventDefault();
                    handleEditOk();
                }}
                onCancel={() => setIsModalOpen(false)}
                okText="Guardar"
                cancelText="Cancelar"
            >
                <Input
                    placeholder="Título"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="mb-3"
                />
                <Input.TextArea
                    placeholder="Descripción"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    rows={3}
                    className="mb-3"
                />
                <Input
                    placeholder="Imagen principal (URL)"
                    value={editedImage}
                    onChange={(e) => setEditedImage(e.target.value)}
                    className="mb-3"
                />
            </Modal>

        </div>
    );
}

export default DashboardPage;
