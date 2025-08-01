import React, { useState, useCallback } from 'react';
import { Settings } from '../types';
import { CloseIcon, UploadIcon } from './icons';

interface SettingsModalProps {
  initialSettings: Settings;
  onSave: (settings: Settings) => void;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ initialSettings, onSave, onClose }) => {
  const [phone] = useState(initialSettings.adminPhone);
  const [logo, setLogo] = useState<string | null>(initialSettings.schoolLogo);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = useCallback(() => {
    onSave({ adminPhone: phone, schoolLogo: logo });
    onClose();
  }, [phone, logo, onSave, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Cerrar configuración"
        >
          <CloseIcon className="w-8 h-8" />
        </button>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Configuración</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-md font-medium text-gray-600 mb-2">
              Logo del Centro Educativo
            </label>
            <div className="mt-2 flex items-center gap-x-4">
                {logo && <img src={logo} alt="Logo Preview" className="h-16 w-16 rounded-full object-cover shadow-sm" />}
                <label htmlFor="logo-upload" className="cursor-pointer flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                    <UploadIcon className="w-5 h-5"/>
                    <span>{logo ? 'Cambiar Logo' : 'Subir Logo'}</span>
                </label>
                <input id="logo-upload" name="logo-upload" type="file" className="sr-only" onChange={handleLogoUpload} accept="image/*" />
            </div>
          </div>
          <div className='text-center pt-4'>
            <p className="text-sm text-gray-500">El número de contacto para reportes está pre-configurado.</p>
          </div>
        </div>

        <div className="mt-10">
          <button
            onClick={handleSave}
            className="w-full bg-purple-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-transform transform hover:scale-105"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;