const handleUpdateSubscription = async (plan: string, term?: string) => {
    try {
        const response = await fetch('/api/stripe/update-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                plan,
                term: term?.toLowerCase(),
            }),
        });
        if (response.ok) window.location.reload();
    } catch (error) {
        console.error('Error upgrading subscription:', error);
    }
};

export default handleUpdateSubscription;
