import React from "react";
import { SpecialEffectType } from "../types/types";

interface SpecialEffectModalProps {
  effectType: SpecialEffectType;
  onClose: () => void;
  onAction: (params: any) => void;
}

export const SpecialEffectModal: React.FC<SpecialEffectModalProps> = ({ effectType, onClose, onAction }) => {
  const getEffectDescription = () => {
    switch (effectType) {
      case "LOOK_ONE":
        return "Puedes mirar una de tus cartas";
      case "SWAP_TWO":
        return "Puedes intercambiar dos de tus cartas";
      case "LOOK_TWO":
        return "Puedes mirar dos de tus cartas";
      default:
        return "";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 font-bold text-xl">¡Efecto Especial!</h2>
        <p className="mb-4">{getEffectDescription()}</p>
        <div className="flex space-x-4">
          <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" onClick={() => onAction({})}>
            Aplicar Efecto
          </button>
          <button className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
