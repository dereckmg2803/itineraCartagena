import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok && data.usuario?.usuario) {
                const usuario = data.usuario.usuario;

                console.log('Login exitoso ✅', usuario);

                // Aquí puedes guardar datos si quieres
                // localStorage.setItem('usuario', JSON.stringify(usuario));

                // Redirige según el rol
                if (usuario.rol === 'turista') {
                    navigate('/turistas');
                } else if (usuario.rol === 'proveedor') {
                    navigate('/dashboard');
                } else {
                    alert('Rol no reconocido');
                }

            } else {
                alert(data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error al conectar con el backend:', error);
            alert('Hubo un problema al iniciar sesión');
        }
    };



    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-sky-600">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <button
                        type="submit"
                        className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-md font-semibold"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/register" className="text-sky-600 font-semibold hover:underline">
                        Regístrate aquí
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
