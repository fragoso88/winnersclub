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

function saveBet() {
    const tableBody = document.querySelector('#bet-history-table tbody');

    const date = document.getElementById('bet-date').value;
    const event = document.getElementById('bet-event').value;
    const match = document.getElementById('bet-match').value;
    const selection = document.getElementById('bet-selection').value;
    const stake = parseFloat(document.getElementById('bet-stake').value);
    const odds = parseFloat(document.getElementById('bet-odds').value);
    const result = document.getElementById('bet-result').value;

    let profitLoss = '';
    if (result === 'Won') {
        profitLoss = `$${((stake * odds) - stake).toFixed(2)}`;
    } else if (result === 'Lost') {
        profitLoss = `-$${stake.toFixed(2)}`;
    } else if (result === 'Voided') {
        profitLoss = '-';
    }

    const newRow = document.createElement('tr');

    [date, event, match, selection, `$${stake.toFixed(2)}`, odds.toFixed(2), profitLoss].forEach(value => {
        const cell = document.createElement('td');
        cell.textContent = value;
        newRow.appendChild(cell);
    });

    const resultCell = document.createElement('td');
    const resultSelect = document.createElement('select');
    ['Won', 'Lost', 'Voided', 'Not Settled'].forEach(optionValue => {
        const option = document.createElement('option');
        option.value = optionValue;
        option.textContent = optionValue;
        if (optionValue === result) option.selected = true;
        resultSelect.appendChild(option);
    });

    resultSelect.addEventListener('change', function() {
        const row = this.closest('tr');
        const stake = parseFloat(row.cells[4].textContent.slice(1));
        const odds = parseFloat(row.cells[5].textContent);
        const profitLossCell = row.cells[6];

        if (this.value === 'Won') {
            profitLossCell.textContent = `$${((stake * odds) - stake).toFixed(2)}`;
        } else if (this.value === 'Lost') {
            profitLossCell.textContent = `-$${stake.toFixed(2)}`;
        } else if (this.value === 'Voided') {
            profitLossCell.textContent = '-';
        } else if (this.value === 'Not Settled') {
            profitLossCell.textContent = '';
        }
    });

    resultCell.appendChild(resultSelect);
    newRow.appendChild(resultCell);

    tableBody.insertBefore(newRow, tableBody.firstChild);
    closePopup();
}
