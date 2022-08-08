import React from 'react';
import { InstructionProps } from '../types/propTypes';

const Instruction = ({instruction}: InstructionProps) => {
    return (
        <textarea
            name={"text-"+instruction}
            placeholder="Type here instruction.."
            className="textarea input-bordered w-full hover:bg-slate-50"
        />
    );
};

export default Instruction;