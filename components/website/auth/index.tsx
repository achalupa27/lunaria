import { FC, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

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
                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className='flex flex-col justify-center relative z-10 max-w-xl border border-orange-100 dark:border-orange-200 bg-zinc-50 dark:bg-zinc-950 p-12 px-16 shadow-xl h-screen w-screen sm:w-full sm:h-auto overflow-auto sm:rounded-xl'>
                        <div className='absolute top-4 right-4 block sm:hidden'>
                            <Button variant='ghost' size='icon' onClick={onClose}>
                                <X />
                            </Button>
                        </div>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Auth;
