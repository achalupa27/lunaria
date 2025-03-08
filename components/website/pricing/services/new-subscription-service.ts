const handleNewSubscription = async (priceId: string, customerId: string) => {
    try {
        const response = await fetch('/api/stripe/new-subscription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                priceId,
                customerId,
            }),
        });

        const { url } = await response.json();
        window.location.href = url;
    } catch (error) {
        console.error('Error creating checkout session:', error);
    }
};

export default handleNewSubscription;
