const handleCancelSubscription = async (subscriptionId: string) => {
    try {
        const response = await fetch('/api/stripe/cancel-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subscriptionId,
            }),
        });
        if (response.ok) window.location.reload();
    } catch (error) {
        console.error('Error canceling subscription:', error);
    }
};

export default handleCancelSubscription;
