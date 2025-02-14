document.addEventListener("DOMContentLoaded", function() {
    const dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];
    const strategyArray = [
        {
            'View': 'Bullish',
            'Value': {
                '24-Apr-2024': ['Bull Call Spread', 'Bull Put Spread', 'Bull Put Spread', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy1', 'Strategy1', 'SpreadStrategy', 'Bull Call Spread'],
                '02-May-2024': ['Bull Call Spread', 'Bull Call Spread', 'Bull Put Spread', 'Long Call', 'Long Call', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy2', 'Strategy1', 'Strategy2', 'Bull Call Spread'],
                '09-May-2024': ['Strategy Put', 'Strategy Call', 'Strategy Call', 'Strategy Call', 'Strategy Put'],
            }
        },
        {
            'View': 'Bearish',
            'Value': {
                '24-Apr-2024': ['Bear Call Spread', 'Bear Call Spread', 'Bear Call Spread', 'Long Put', 'Long Put', 'Long Put', 'Bear Call Spread'],
                '31-May-2024': ['Long Put', 'Long Put', 'Long Put', 'Long Put', 'Long Put'],
                '21-Jun-2024': ['Strategy3', 'Strategy3', 'Bear Put Spread', 'Strategy3', 'Long Put', 'Long Put'],
            }
        },
        {
            'View': 'RangeBound',
            'Value': {
                '24-Apr-2024': ['Short Straddle', 'Short Strangle', 'Short Strangle', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy1', 'Strategy1', 'SpreadStrategy', 'Short Straddle'],
                '02-May-2024': ['Short Straddle', 'Short Straddle', 'Short Strangle', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Short Straddle'],
                '21-Jun-2024': ['Iron Condor', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Iron Condor'],
            }
        },
        {
            'View': 'Volatile',
            'Value': {
                '02-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Long Straddle'],
                '09-May-2024': ['Long Straddle', 'Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Long Straddle'],
                '31-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle'],
            }
        }
    ];

    const viewTabs = document.querySelectorAll('.view-tab');
    const dateSelect = document.getElementById('dates');
    const strategyCardsContainer = document.querySelector('.strategy-cards');
    const emptyState = document.querySelector('.empty-state');

    // Populate the date dropdown
    dateArray.forEach(date => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = date;
        dateSelect.appendChild(option);
    });

    // Set initial selected view (default to Bullish)
    let selectedView = 'Bullish';

    // Function to render strategy cards based on the selected date and view
    function renderCards(selectedDate, selectedView) {
        // Clear existing cards
        strategyCardsContainer.innerHTML = '';
        emptyState.style.display = 'none';

        // Filter strategies based on the selected view and date
        const viewData = strategyArray.find(item => item.View === selectedView);
        if (viewData && viewData.Value[selectedDate]) {
            const strategies = viewData.Value[selectedDate];

            // Count occurrences of strategies
            const strategyCounts = strategies.reduce((acc, strategy) => {
                acc[strategy] = (acc[strategy] || 0) + 1;
                return acc;
            }, {});

            // Render the strategy cards
            Object.entries(strategyCounts).forEach(([strategyName, count]) => {
                const card = document.createElement('div');
                card.classList.add('strategy-card');

                const cardTitle = document.createElement('h3');
                cardTitle.textContent = strategyName;

                const cardCount = document.createElement('div');
                cardCount.classList.add('count');
                cardCount.textContent = `${count} ${count === 1 ? 'Strategy' : 'Strategies'}`;

                card.appendChild(cardTitle);
                card.appendChild(cardCount);
                strategyCardsContainer.appendChild(card);
            });
        } else {
            emptyState.style.display = 'block';
        }
    }

    // Handle tab click to select view
    viewTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            viewTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Update the selected view and render the cards
            selectedView = tab.textContent;
            const selectedDate = dateSelect.value;
            renderCards(selectedDate, selectedView);
        });
    });

    // Handle date selection change
    dateSelect.addEventListener('change', function() {
        const selectedDate = dateSelect.value;
        renderCards(selectedDate, selectedView);
    });

    // Set default date and view, and render initial cards
    const defaultDate = dateArray[0];
    document.getElementById('bullish-tab').classList.add('active');
    renderCards(defaultDate, selectedView);
});
