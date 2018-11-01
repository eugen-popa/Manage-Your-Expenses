// Budget Controller
const budgetController = ((() => {

    const Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const calculateTotal = type => {
        let sum = 0;

        data.allItems[type].forEach(cur => {
            sum = sum + cur.value;

        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        procentage: -1
    };

    return {
        addItem(type, des, val) {
            let newItem;
            let ID;

            // create a new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            // create new item base on 'inc' or 'expens' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //  push  in to our data structure 
            data.allItems[type].push(newItem);

            // return the new element
            return newItem;
        },

        calculateBudget() {
            // calculate total incom and expanses
            calculateTotal('exp');
            calculateTotal('inc');
            // calculate the budget: income - expenses 
            data.budget = data.totals.inc - data.totals.exp;
            // calculate the procentage of the income that we spend
            if (data.totals.inc > 0) {
                data.procentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.procentage = -1;
            }
        },
        getBudget() {
            return {
                budget: data.budget,
                tatalInc: data.totals.inc,
                tatalExp: data.totals.exp,
                procentage: data.procentage
            };
        },

        testing() {
            console.log(data);
        }
    };

}))();

//********************************************************
// UI Controller
const UIController = ((() => {

    const DOMstrings = {
        inputType: '.add__type',
        inputDescrp: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeConteiner: '.income__list',
        expensesConteiner: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expansevLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'
    };

    return {
        getInput() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescrp).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },
        addListItem(obj, type) {
            let html;
            let newHtml;
            let element;
            // create HTML string place holder tax
            if (type === 'inc') {
                element = DOMstrings.incomeConteiner;

                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div</div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesConteiner;

                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
        },

        clearFields() {
            let fields;
            let fieldsArr;

            fields = document.querySelectorAll(`${DOMstrings.inputDescrp}, ${DOMstrings.inputValue}`);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach((current, index, array) => {
                current.value = '';
            });

            fieldsArr[0].focus();
        },

        displayBudget(obj) {

            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expansevLabel).textContent = obj.totalExp;
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.procentage;

        },

        getDOMstrings() {
            return DOMstrings;
        }
    };
}))();

//********************************************************
// Global APP controller
const controller = (((budgetCtrl, UICtrl) => {

    const setupEventListeners = () => {
        const DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem)
        document.addEventListener('keypress', e => {
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });
    };

    const updateBudget = () => {

        // 1. calculate the budget
        budgetCtrl.calculateBudget();
        // 2. return the budget
        const budget = budgetCtrl.getBudget();
        // 3. Display the Budget on the UI
        UICtrl.displayBudget(budget);

    };

    var ctrlAddItem = () => {
        let input;
        let newItem;

        // 1. get input data 
        input = UICtrl.getInput();

        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {

            // 2. add the item to the budget controller 
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. cleer the field
            UICtrl.clearFields();
        }

        // calculeate and up date the budget
        updateBudget();
    }

    return {
        init() {
            setupEventListeners();
        }
    }

}))(budgetController, UIController);

controller.init();
