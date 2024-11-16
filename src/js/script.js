const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')
const expenseList = document.querySelector('ul')
const expenseQuantity = document.querySelector('aside header p span')
const expensesTotal = document.querySelector('aside header h2')

amount.oninput = () => {
    // Formatação do input para aceitar apenas números
    let value = amount.value.replace(/\D/g, '')

    // Trasnforma o valor em centavos
    value = Number(value) / 100

    // Atualiza o valor do input chamando a respectiva callback
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    // Formata o valor no padrão BRL 
    value = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(value)

    // Retorna o valor formatado
    return value
}

// Captura o evento de submit do formulário para obter os valores
form.onsubmit = (event) => {
    event.preventDefault()

    // Cria um objeto com os detalhes na nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
    // Chama a função que irá adicionar o item na lista
    expenseAdd(newExpense)
}

// Adiciona um novo item na lista
function expenseAdd(newExpense) {
    try {
        // Cria o elemento de li para adicionar na lista
        const expenseItem = document.createElement('li')
        expenseItem.classList.add('expense')

        // Cria o ícone da categoria (IMG)
        const expenseIcon = document.createElement('img')
        expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute('alt', newExpense.category_name)

        // Cria a info da despesa
        const expenseInfo = document.createElement('div')
        expenseInfo.classList.add('exepense-info')

        // Cria o nome da despesa
        const expenseName = document.createElement('strong')
        expenseName.textContent = newExpense.expense

        // Cria a categoria da despesa
        const expenseCategory = document.createElement('span')
        expenseCategory.textContent = newExpense.category_name

        // Adiciona nome e categora na Div das informações da despesa
        expenseInfo.append(expenseName, expenseCategory)

        // Cria o valor da despesa
        const expenseAmount = document.createElement('span')
        expenseAmount.classList.add('expense-amount')
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace('R$', '')}`

        // Cria o ícone de remover
        const removeIcon = document.createElement('img')
        removeIcon.classList.add('remove-icon')
        removeIcon.setAttribute('src', 'img/remove.svg')
        removeIcon.setAttribute('alt', 'remover')

        // Adiciona as informaçoes no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        // Adiciona o item na lista
        expenseList.append(expenseItem)

        // Limpa o formulário
        formClear()

        // Atualiza os totais
        updateTotals()
    } catch (error) {
        alert('Não foi possível atualizar a lista de despesas')
        console.log(error);
        
    }
}

// Atualiza os totais
function updateTotals() {
    try {
        const items = expenseList.children
        
        // Atualiza a quantidade de itens da lista
        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? 'despesas' : 'despesa'}`

        let total = 0

        // Percorre cada item LI da lista UL
        for (let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector('.expense-amount')

            // Remover caracteres não numéricos e substitui a vírgula pelo ponto
            let value = itemAmount.textContent.replace(/[^\d,]/g, '').replace(',', '.')

            // Converte o valor para float
            value = parseFloat(value)

            // Verifica se é um número válido
            if (isNaN(value)) {
                return alert('Não foi possível calcular o total. O valor não parece ser um número.')
            }

            // Incrementar o valor total
            total += Number(value)

        }

        // Cria o small para adicionar o R$ formatado
        const symbolBRL = document.createElement('small')
        symbolBRL.textContent = 'R$'

        // Formata o valor e remove o R$ que será exibido pela small com um estilo customizado
        total = formatCurrencyBRL(total).toUpperCase().replace('R$', '')

        // Limpa o conteúdo do elemento
        expensesTotal.innerHTML = ''

        // Adicona o símbolo da moeda formatado
        expensesTotal.append(symbolBRL, total)
    } catch (error) {
        console.log(error);
        alert('Não foi possível atualizar os totais.')
        
    }
}

// Evento que captura o clique nos itens da lista

expenseList.addEventListener('click', function (event) {
    // Verifica se o elemento clicado é o ícone de remover
    if (event.target.classList.contains('remove-icon')) {
        // Obtém a li pai do elemento clicado
        const item = event.target.closest('.expense')
        // Remove o item da lista
        item.remove()
    }
    // Atualiza os totais
    updateTotals()
})

function formClear() {
    // Limpa os inputs
    expense.value = ''
    category.value = ''
    amount.value = ''

    // Bota o focu no input
    expense.focus()
}
