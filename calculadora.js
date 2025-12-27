function adicionar(valor) {
    document.getElementById('visor').value+= valor;
}

function limpar() {
    document.getElementById('visor').value = '';
}

function apagar() {
    var visor = document.getElementById('visor');
    visor.value = visor.value.slice(0, -1);
}

function adicionarPorcentagem() {
    let visor = document.getElementById('visor');

    // bloqueia % duplicado
    if (visor.value.includes('%')) return;

    // só adiciona se já houver número
    if (visor.value !== '') {
        visor.value += '%';
    }
}

function calcular() {
    let visor = document.getElementById('visor');
    let valor = visor.value;

    try {
        // CASO 1 — 50%
        if (valor.endsWith('%')) {
            let numero = parseFloat(valor.replace('%', ''));
            visor.value = numero / 100;
            return;
        }

        // CASO 2 — 50%30  (porcentagem de)
        if (valor.includes('%')) {
            let partes = valor.split('%');

            if (
                partes.length === 2 &&
                !isNaN(partes[0]) &&
                !isNaN(partes[1])
            ) {
                let p = parseFloat(partes[0]);
                let total = parseFloat(partes[1]);
                visor.value = (p / 100) * total;
                return;
            }
        }

        // CASO 3 — cálculo normal
        visor.value = eval(valor);

    } catch {
        visor.value = 'Erro';
    }
}

document.addEventListener('keydown', function (event) {
    const tecla = event.key;

    if (tecla >= '0' && tecla <= '9') {
        adicionar(tecla);
        return;
    }

    if (['+', '-', '*', '/'].includes(tecla)) {
        adicionar(tecla);
        return;
    }

    if (tecla === 'Add') adicionar('+');
    if (tecla === 'Subtract') adicionar('-');
    if (tecla === 'Multiply') adicionar('*');
    if (tecla === 'Divide') adicionar('/');

    if (tecla === '.') {
        adicionar('.');
        return;
    }

    if (tecla === '%') {
        adicionarPorcentagem();
        return;
    }

    if (tecla === 'Enter') {
        event.preventDefault();
        calcular();
        return;
    }

    if (tecla === 'Escape' || tecla === 'Backspace') {
        apagar();
        return;
    }

    if (tecla === 'Escape') {
        limpar();
        return;
    }
});



