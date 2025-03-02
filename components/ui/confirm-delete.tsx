import { AlertDialog, AlertDialogCancel, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

type ConfirmDeleteProps = {
    showDeleteAlert: boolean;
    setShowDeleteAlert: (show: boolean) => void;
    handleConfirmDelete: () => void;
    itemCategory: string;
    itemName: string;
};

const ConfirmDelete = ({ showDeleteAlert, setShowDeleteAlert, handleConfirmDelete, itemCategory, itemName }: ConfirmDeleteProps) => {
    return (
        <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this account?</AlertDialogTitle>
                    <AlertDialogDescription>{`This action cannot be undone. This will permanently delete the ${itemCategory} "${itemName}" and remove all associated data.`}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmDelete} className='bg-red-600 hover:bg-red-700'>
                        Delete Account
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmDelete;
