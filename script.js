let xpMax = 25;

function updateUI() {
    const bars = [
        { id: 'hp', max: 44 },
        { id: 'en', max: 34 },
        { id: 'mag', max: 152 },
        { id: 'xp', max: xpMax }
    ];
    
    bars.forEach(bar => {
        const input = document.getElementById(`${bar.id}-current`);
        const fill = document.getElementById(`${bar.id}-fill`);
        if (input && fill) {
            const val = parseInt(input.value) || 0;
            fill.style.width = Math.min(100, (val / bar.max) * 100) + '%';
        }
    });
    document.getElementById('xp-max-label').textContent = xpMax;
}

function quickMath(stat, val) {
    const input = document.getElementById(`${stat}-current`);
    if (input) {
        input.value = Math.max(0, (parseInt(input.value) || 0) + val);
        updateUI();
    }
}

function resetStat(stat) {
    const input = document.getElementById(`${stat}-current`);
    if (input) { input.value = 0; updateUI(); }
}

function rollMultiple(sides) {
    const count = parseInt(document.getElementById('dice-count').value) || 1;
    let total = 0, rolls = [];
    for (let i = 0; i < count; i++) {
        let r = Math.floor(Math.random() * sides) + 1;
        rolls.push(r); total += r;
    }
    document.getElementById('dice-result').innerHTML = `🎲 D${sides}: <strong>${total}</strong> <small>(${rolls.join('+')})</small>`;
}

function useAbilityAuto(name, enCost, hpCost, magCost) {
    const curEn = parseInt(document.getElementById('en-current').value);
    const curHp = parseInt(document.getElementById('hp-current').value);
    const curMag = parseInt(document.getElementById('mag-current').value);
    
    if (enCost > 0 && curEn < enCost) return alert("Energia insuficiente!");
    if (hpCost > 0 && curHp < hpCost) return alert("Vida insuficiente!");
    if (magCost > 0 && curMag < magCost) return alert("Magia insuficiente!");
    
    quickMath('en', -enCost);
    quickMath('hp', -hpCost);
    quickMath('mag', -magCost);
    document.getElementById('dice-result').innerHTML = `✨ Usou: <strong>${name}</strong>`;
}

function levelUp() {
    const curXp = parseInt(document.getElementById('xp-current').value) || 0;
    if (curXp < xpMax) return alert("XP insuficiente!");
    let lvl = document.getElementById('level-val');
    lvl.textContent = parseInt(lvl.textContent) + 1;
    xpMax += 5;
    document.getElementById('xp-current').value = 0;
    updateUI();
}

function setupAutoSave() {
    const areas = ['inv-area', 'notes-area'];
    areas.forEach(id => {
        const el = document.getElementById(id);
        el.value = localStorage.getItem(id) || "";
        el.addEventListener('input', () => localStorage.setItem(id, el.value));
    });
}

window.onload = () => { updateUI(); setupAutoSave(); };