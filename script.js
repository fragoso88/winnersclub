function showTab(tabId) {
    const contents = document.querySelectorAll('.content');
    const buttons = document.querySelectorAll('.tab-button');

    contents.forEach(content => {
        content.classList.remove('active');
    });

    buttons.forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
}

function showPopup() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('bet-popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('bet-popup').style.display = 'none';
    document.getElementById('bet-form').reset();
}

async function saveBet() {
    const date = document.getElementById('bet-date').value;
    const event = document.getElementById('bet-event').value;
    const match = document.getElementById('bet-match').value;
    const selection = document.getElementById('bet-selection').value;
    const stake = parseFloat(document.getElementById('bet-stake').value).toFixed(2);
    const odds = parseFloat(document.getElementById('bet-odds').value).toFixed(2);
    const result = document.getElementById('bet-result').value;

    let profitLoss = '';
    if (result === 'Won') {
        profitLoss = `$${((stake * odds) - stake).toFixed(2)}`;
    } else if (result === 'Lost') {
        profitLoss = `-$${stake}`;
    } else if (result === 'Voided') {
        profitLoss = '-';
    }

    const newBet = { date, event, match, selection, stake: `$${stake}`, odds, profitLoss, result };

    try {
        const response = await fetch('https://glittering-mermaid-573e92.netlify.app/api/bets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBet),
        });

        const data = await response.json();
        console.log('Saved Bet:', data);
        addRowToTable(data); // Add the saved bet to the table
        closePopup();
    } catch (error) {
        console.error('Error saving bet:', error);
    }
}
