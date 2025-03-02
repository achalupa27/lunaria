import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

type FormActionsProps = {
    onDelete?: () => void;
    onCancel: () => void;
    showDelete: boolean;
};

const FormActions = ({ onDelete, onCancel, showDelete }: FormActionsProps) => (
    <div className={`flex pt-4 ${showDelete ? 'justify-between' : 'justify-end'}`}>
        {showDelete && (
            <Button type='button' onClick={onDelete} variant='destructive' size='icon'>
                <Trash />
            </Button>
        )}
        <div className='flex space-x-3'>
            <Button variant='secondary' onClick={onCancel}>
                Cancel
            </Button>
            <Button type='submit'>Save</Button>
        </div>
    </div>
);

export default FormActions;
