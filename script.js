function updateUI() {
    const bars = [
        { id: 'hp', max: 44 },
        { id: 'en', max: 34 },
        { id: 'mag', max: 152 }
    ];
    bars.forEach(bar => {
        const input = document.getElementById(`${bar.id}-current`);
        const fill = document.getElementById(`${bar.id}-fill`);
        if (input && fill) {
            const val = parseInt(input.value) || 0;
            fill.style.width = Math.min(100, (val / bar.max) * 100) + '%';
        }
    });
}

function quickMath(stat, val) {
    const input = document.getElementById(`${stat}-current`);
    if (input) {
        input.value = Math.max(0, (parseInt(input.value) || 0) + val);
        updateUI();
    }
}

function useAbilityAuto(name, enCost, hpCost, magCost) {
    const currentEn = parseInt(document.getElementById('en-current').value);
    const currentMag = parseInt(document.getElementById('mag-current').value);
    
    if (enCost > 0 && currentEn < enCost) return alert("Energia Insuficiente!");
    if (magCost > 0 && currentMag < magCost) return alert("Magia Insuficiente!");

    quickMath('en', -enCost);
    quickMath('hp', -hpCost);
    quickMath('mag', -magCost);

    document.getElementById('dice-result').innerHTML = `🔥 <strong>${name.toUpperCase()}</strong> ATIVADA!`;
}

function rollAttributes() {
    const count = parseInt(document.getElementById('dice-count').value);
    let rolls = Array.from({length: count}, () => Math.floor(Math.random() * 20) + 1);
    document.getElementById('dice-result').innerHTML = `Dados: [${rolls.join(', ')}] <br> Maior: <strong>${Math.max(...rolls)}</strong>`;
}

function rollD6() {
    const d = Math.floor(Math.random() * 8) + 1;
    document.getElementById('dice-result').innerHTML = `Dano: ${d} + 5 = <strong>${d+5}</strong>`;
}

function setDiceRoller(val, name) {
    document.getElementById('dice-count').value = val;
    document.getElementById('dice-result').innerText = `Pronto para rolar ${name}...`;
}

window.onload = updateUI;