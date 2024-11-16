const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')
const expenseList = document.querySelector('ul')
const expenseQuantity = document.querySelector('aside header p span')

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

        // Atualiza os totais
        updateTotals()
    } catch (error) {
        alert('Não foi possível atualizar a lista de despesas')
        console.log(error);
        
    }
}

function updateTotals() {
    try {
        const items = expenseList.children
        
        // Atualiza a quantidade de itens da lista
        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? 'despesas' : 'despesa'}`
    } catch (error) {
        console.log(error);
        alert('Não foi possível atualizar os totais.')
        
    }
}