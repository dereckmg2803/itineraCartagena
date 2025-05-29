import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { message, Modal, Input } from 'antd';
import axios from 'axios';

function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showRoleModal, setShowRoleModal] = useState(false);
    const [newUserId, setNewUserId] = useState(null);
    const [isProviderFormVisible, setIsProviderFormVisible] = useState(false);

    const [providerData, setProviderData] = useState({
        nombre_empresa: '',
        logo_url: '',
        telefono_contacto: '',
        descripcion: '',
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleProviderChange = (e) => {
        setProviderData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            message.error('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/users/register', {
                nombre: formData.name,
                correo: formData.email,
                contraseña: formData.password,
            });

            const userId = response.data.usuario_id;
            setNewUserId(userId);
            message.success('Usuario registrado exitosamente');
            setShowRoleModal(true);
        } catch (error) {
            console.error('Error registrando usuario:', error);
            message.error('Error al registrar el usuario');
        }
    };

    const handleRoleSelect = (role) => {
        setShowRoleModal(false);
        if (role === 'turista') {
            navigate('/turistas');
        } else {
            setIsProviderFormVisible(true);
        }
    };

    const handleProviderSubmit = async () => {
        const newUserId = '59e74b08-02dc-4891-99d2-366ab3d169eb';
        if (!newUserId) {
            message.error('No se encontró el ID del usuario');
            return;
        }

        try {
            await axios.post('http://localhost:3000/proveedores/register', {
                usuario_id: newUserId,
                ...providerData,
            });

            message.success('Proveedor registrado exitosamente');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error registrando proveedor:', error);
            message.error('Error al registrar proveedor');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-sky-600">Registro</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-md font-semibold"
                    >
                        Registrarse
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className="text-sky-600 font-semibold hover:underline">
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>

            {/* Modal de selección de rol */}
            <Modal
                title="¿Qué tipo de usuario eres?"
                open={showRoleModal}
                onCancel={() => setShowRoleModal(false)}
                footer={null}
                centered
            >
                <div className="flex flex-col gap-4 mt-4">
                    <button
                        onClick={() => handleRoleSelect('turista')}
                        className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-md"
                    >
                        Soy Turista
                    </button>
                    <button
                        onClick={() => handleRoleSelect('proveedor')}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-md"
                    >
                        Soy Proveedor
                    </button>
                </div>
            </Modal>

            {/* Formulario para proveedores */}
            <Modal
                title="Registro de Proveedor"
                open={isProviderFormVisible}
                onOk={handleProviderSubmit}
                onCancel={() => setIsProviderFormVisible(false)}
                okText="Registrar proveedor"
                centered
            >
                <div className="space-y-3">
                    <Input
                        name="nombre_empresa"
                        placeholder="Nombre de la empresa"
                        value={providerData.nombre_empresa}
                        onChange={handleProviderChange}
                    />
                    <Input
                        name="logo_url"
                        placeholder="URL del logo"
                        value={providerData.logo_url}
                        onChange={handleProviderChange}
                    />
                    <Input
                        name="telefono_contacto"
                        placeholder="Teléfono de contacto"
                        value={providerData.telefono_contacto}
                        onChange={handleProviderChange}
                    />
                    <Input.TextArea
                        name="descripcion"
                        placeholder="Descripción"
                        value={providerData.descripcion}
                        onChange={handleProviderChange}
                        rows={3}
                    />
                </div>
            </Modal>
        </div>
    );
}

export default RegisterPage;
