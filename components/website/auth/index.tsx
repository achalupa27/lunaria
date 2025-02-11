import { FC, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Auth: FC<AuthProps> = ({ isOpen, onClose, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm'>
                    <div className='absolute inset-0 bg-black/50' onClick={onClose} />
                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className='relative z-10 w-full max-w-xl rounded-xl border border-orange-100 bg-white p-12 px-16 shadow-xl'>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Auth;
