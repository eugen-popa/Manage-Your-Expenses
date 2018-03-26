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
    
    var calculateTotal = function(type){
        var sum = 0;
        
        data.allItems[type].forEach(function(cur){
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
        
        calculateBudget: function(){
            // calculate total incom and expanses
            calculateTotal('exp');
            calculateTotal('inc');
            // calculate the budget: income - expenses 
            data.budget = data.totals.inc - data.totals.exp;
            // calculate the procentage of the income that we spend
            if (data.totals.inc > 0 ){
                data.procentage = Math.round((data.totals.exp / data.totals.inc)*100);
            }else{
                data.procentage = -1;
            }
        },
        getBudget: function(){
          return{
              budget: data.budget,
              tatalInc: data.totals.inc,
              tatalExp: data.totals.exp,
              procentage: data.procentage
          };  
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
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
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
        
        clearFields: function() {
            var fields, fieldsArr;
          
            fields = document.querySelectorAll(DOMstrings.inputDescrp+ ', '+ DOMstrings.inputValue);
            
            fieldsArr = Array.prototype.slice.call(fields); 
            
            fieldsArr.forEach(function(current, index, array){
                current.value= '';
            });
            
            fieldsArr[0].focus();
            
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

    var updateBudget = function(){
               
        // 1. calculate the budget
            budgetCtrl.calculateBudget();
        // 2. return the budget
            var budget = budgetCtrl.getBudget();
        // 3. Display the Budget on the UI
        
        console.log(budget);
    }
    
    var ctrlAddItem = function(){
        var input, newItem;
        
        // 1. get input data 
        input = UICtrl.getInput();
        
        if(input.description !== '' && !isNaN(input.value) && input.value > 0){
         
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
        init: function(){
            setupEventListeners();
        }
    }
    
})(budgetController, UIController);

controller.init();





































