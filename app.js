// Budget Controller
var budgetController = (function(){
    
    var Expense = function (id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    
    var Income = function (id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };
    
    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            
            // create a new ID
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else {
                ID = 0;
            }
            // create new item base on 'inc' or 'expens' type
            if (type === 'exp'){
                newItem = new Expense(ID, des, val);
            }else if (type === 'inc'){
                newItem = new Income(ID, des, val);
            }
            
            //  push  in to our data structure 
            data.allItems[type].push(newItem);
            
            // return the new element
            return newItem;
        },
        
        testing: function(){
            console.log(data);
        }
    };
    
})();

//********************************************************
// UI Controller
var UIController = (function() {
    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescrp: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeConteiner: '.income__list',
        expensesConteiner: '.expenses__list'
    };
    
    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescrp).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },
        addListItem: function(obj, type){
            var html, newHtml, element;
            // create HTML string place holder tax
            if (type === 'inc'){
                element = DOMstrings.incomeConteiner;
                
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div</div></div>';
            }else if (type === 'exp'){
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
        
        getDOMstrings: function(){
            return DOMstrings;
        }
    };
})();

//********************************************************
// Global APP controller
var controller = (function(budgetCtrl, UICtrl){
    
    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();
        
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem)
        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13 || e.which === 13){
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function(){
        var input, newItem;
        
        // 1. get input data 
        input = UICtrl.getInput();
     
        // 2. add the item to the budget controller 
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        
        // 3. add the item to the UI
        UICtrl.addListItem(newItem, input.type);
        // 4. calculate the budget

        // 5. Display the Budget on the UI
    }
    
    return {
        init: function(){
            setupEventListeners();
        }
    }
    
})(budgetController, UIController);

controller.init();





































