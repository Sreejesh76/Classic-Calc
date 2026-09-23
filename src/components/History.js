/**
 * History Component - Renders calculation history list and item restoration.
 */

export function renderHistory(historyItems = [], onSelect, onClear) {
  const panel = document.createElement('aside');
  panel.className = 'history-panel';
  panel.setAttribute('aria-label', 'Calculation history');

  const header = document.createElement('div');
  header.className = 'history-header';

  const title = document.createElement('h3');
  title.className = 'history-title';
  title.textContent = 'History';

  const clearBtn = document.createElement('button');
  clearBtn.className = 'clear-history-btn';
  clearBtn.setAttribute('aria-label', 'Clear calculation history');
  clearBtn.textContent = 'Clear';
  clearBtn.addEventListener('click', () => {
    if (onClear) onClear();
  });

  header.appendChild(title);
  header.appendChild(clearBtn);

  const listContainer = document.createElement('div');
  listContainer.className = 'history-list-container';

  if (!historyItems || historyItems.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.className = 'history-empty';
    emptyMsg.textContent = 'No calculations yet';
    listContainer.appendChild(emptyMsg);
  } else {
    historyItems.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'history-item';
      itemDiv.setAttribute('tabindex', '0');
      itemDiv.setAttribute('role', 'button');
      itemDiv.setAttribute('aria-label', `Reuse result ${item.result} from ${item.expression}`);

      itemDiv.innerHTML = `
        <div class="history-item-expr">${item.expression}</div>
        <div class="history-item-result">= ${item.result}</div>
      `;

      const selectHandler = () => {
        if (onSelect) onSelect(item);
      };

      itemDiv.addEventListener('click', selectHandler);
      itemDiv.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectHandler();
        }
      });

      listContainer.appendChild(itemDiv);
    });
  }

  panel.appendChild(header);
  panel.appendChild(listContainer);

  return panel;
}

export function updateHistory(historyElem, historyItems, onSelect, onClear) {
  if (!historyElem) return;
  const listContainer = historyElem.querySelector('.history-list-container');
  if (!listContainer) return;

  listContainer.innerHTML = '';

  if (!historyItems || historyItems.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.className = 'history-empty';
    emptyMsg.textContent = 'No calculations yet';
    listContainer.appendChild(emptyMsg);
  } else {
    historyItems.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'history-item';
      itemDiv.setAttribute('tabindex', '0');
      itemDiv.setAttribute('role', 'button');
      itemDiv.setAttribute('aria-label', `Reuse result ${item.result} from ${item.expression}`);

      itemDiv.innerHTML = `
        <div class="history-item-expr">${item.expression}</div>
        <div class="history-item-result">= ${item.result}</div>
      `;

      const selectHandler = () => {
        if (onSelect) onSelect(item);
      };

      itemDiv.addEventListener('click', selectHandler);
      itemDiv.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectHandler();
        }
      });

      listContainer.appendChild(itemDiv);
    });
  }
}
