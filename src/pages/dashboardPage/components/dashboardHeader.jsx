import React from 'react';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

function DashboardHeader({ onCreateClick, onLogout }) {
    return (
        <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-bold text-amber-600">Dashboard de Servicios</h1>
            <div className="flex gap-4 ml-6">
                <Button type="primary" onClick={onCreateClick}>
                    Crear Servicio
                </Button>
                <Button danger icon={<LogoutOutlined />} onClick={onLogout}>
                    Cerrar Sesión
                </Button>
            </div>
        </div>
    );
}

export default DashboardHeader;
