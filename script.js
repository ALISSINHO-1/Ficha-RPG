// Estado global do nível e XP máximo
let currentLevel = 3;
let xpMax = 15;

function updateUI() {
    const bars = [
        { id: 'hp', max: 42 },
        { id: 'en', max: 24 },
        { id: 'xp', max: xpMax }
    ];
    bars.forEach(bar => {
        const val = parseInt(document.getElementById(`${bar.id}-current`).value) || 0;
        const fill = document.getElementById(`${bar.id}-fill`);
        if (fill) fill.style.width = Math.min(100, (val / bar.max) * 100) + '%';
    });
    // Atualiza o label de XP máximo
    const xpLabel = document.getElementById('xp-max-label');
    if (xpLabel) xpLabel.textContent = xpMax;
}

function levelUp() {
    const currentXp = parseInt(document.getElementById('xp-current').value) || 0;
    if (currentXp < xpMax) {
        document.getElementById('dice-result').innerHTML =
            `<span style="color:var(--red)">⚠️ XP INSUFICIENTE! Você precisa de <strong>${xpMax} XP</strong> para subir de nível.</span>`;
        return;
    }

    currentLevel++;
    xpMax += 5;

    document.getElementById('level-val').textContent = currentLevel;
    document.getElementById('xp-current').value = 0;
    updateUI();

    document.getElementById('dice-result').innerHTML =
        `⬆️ <strong style="color:var(--yellow)">NÍVEL ${currentLevel} ALCANÇADO!</strong><br>
        <small>XP zerado. Próximo nível requer <strong>${xpMax} XP</strong>.</small>`;

    // Animação flash no badge de nível
    const badge = document.querySelector('.level-badge');
    badge.classList.add('level-up-flash');
    setTimeout(() => badge.classList.remove('level-up-flash'), 1000);
}

function quickMath(stat, val) {
    const input = document.getElementById(`${stat}-current`);
    if (!input) return;
    input.value = Math.max(0, (parseInt(input.value) || 0) + val);
    updateUI();
}

/**
 * Função de Automação: Gasta EN e HP automaticamente
 * @param {string} name - Nome da habilidade
 * @param {number} enCost - Custo (positivo gasta, negativo recupera)
 * @param {number} hpCost - Dano tomado
 */
function useAbilityAuto(name, enCost, hpCost) {
    const currentEn = parseInt(document.getElementById('en-current').value);
    
    // Se for um gasto (custo > 0), verifica se tem energia
    if (enCost > 0 && currentEn < enCost) {
        document.getElementById('dice-result').innerHTML = `<span style="color:var(--red)">⚠️ SEM ENERGIA PARA ${name.toUpperCase()}!</span>`;
        return;
    }

    quickMath('en', -enCost);
    if (hpCost > 0) quickMath('hp', -hpCost);

    document.getElementById('dice-result').innerHTML = `🔹 <strong>${name.toUpperCase()}</strong> ATIVADA!<br><small>Status atualizados automaticamente.</small>`;
}

function rollAttributes() {
    const count = parseInt(document.getElementById('dice-count').value);
    let rolls = Array.from({length: count}, () => Math.floor(Math.random() * 20) + 1);
    const highest = Math.max(...rolls);
    document.getElementById('dice-result').innerHTML = `Dados: [${rolls.join(', ')}]<br>Resultado: <strong>${highest}</strong>`;
}

function rollD6() {
    const d = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice-result').innerHTML = `Dano: (${d}) + 3 = <strong>${d+3} Impacto</strong>`;
}

function setDiceRoller(val, name) {
    document.getElementById('dice-count').value = val;
    document.getElementById('dice-result').innerText = `Pronto para rolar ${name}...`;
}

window.onload = updateUI;